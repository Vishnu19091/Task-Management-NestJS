"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuthToken(intervalMs: number = 3000) {
  // storing the token
  const [token, setToken] = useState<string | null>(null);

  const [isTokenAlive, setisTokenAlive] = useState<boolean | null>(true);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // console.log(storedToken);
    if (storedToken) {
      setToken(storedToken); // no JSON.parse

      // find if it is New user then redirect user to signup page
    } else if (storedToken === null) {
      setToken(null);
      setisTokenAlive(false);
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentToken = localStorage.getItem("token");

      // if token is not present or has null
      if (!currentToken || currentToken === null) {
        setToken(null);
        setisTokenAlive(false);
        router.push("/auth");
      }

      // if token is not alive send to signin page
      if (isTokenAlive === false) {
        setToken(null);
        router.push("/auth");
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, isTokenAlive]);

  return { token, isTokenAlive, setisTokenAlive };
}
