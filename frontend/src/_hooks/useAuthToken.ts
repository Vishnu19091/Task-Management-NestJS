"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

/**
 * By Default a timer runs every 3s to fetch the token

 * from the localStorage.

 * If no token found then **redirects to login/signup page**.

 * @param intervalMs -> 3s

 * @returns **Token, isTokenAlive, setisTokenAlive**

 */
export default function useAuthToken(intervalMs: number = 3000) {
  const [token, setToken] = useState<string | null>(null);
  const [isTokenAlive, setIsTokenAlive] = useState<boolean | null>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const router = useRouter();

  // decode JWT and checks expiry!!!!
  const isValidToken = (jwt: string) => {
    try {
      const [, payload] = jwt.split(".");
      const decoded = JSON.parse(atob(payload));
      if (!decoded.exp) return true; // no expiry field

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    } catch (err) {
      console.warn("Invalid JWT:", err);
      return false;
    }
  };

  // <----- Callback function to synchronize the token ----->
  const syncToken = useCallback(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken && isValidToken(storedToken)) {
      setToken(storedToken);
      setIsTokenAlive(true);
    } else {
      setToken(null);
      setIsTokenAlive(false);
    }
  }, []);

  // Side Effect run once on mount to sync the token
  useEffect(() => {
    syncToken();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "token") syncToken();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [syncToken]);

  // <----- interval that periodically checks the token is valid or not ----->
  useEffect(() => {
    const interval = setInterval(() => {
      syncToken();

      // Depends on intervalMs
    }, intervalMs);

    // <----- Cleanup func ----->
    return () => clearInterval(interval);
  }, [intervalMs, syncToken]);

  // redirect only when we are sure token is invalid
  useEffect(() => {
    if (isTokenAlive === false) {
      setIsRedirecting(true);
      const timeout = setTimeout(() => {
        router.push("/auth");
      }, 3000);

      // cleanup function
      return () => clearTimeout(timeout);
    }
  }, [isTokenAlive, router]);

  return { token, isTokenAlive, setIsTokenAlive, isRedirecting };
}
