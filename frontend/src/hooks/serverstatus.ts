import { useState, useEffect } from "react";
import api from "../lib/axios";

/**
 * This function shows the status of the server
 * @param intervalMs
 * @returns Server Status
 */
export default function ShowServerStatus(intervalMs: number = 10000) {
  const [Serverstatus, setServerstatus] = useState<boolean | null>(null);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const res = await api.get("");
        // console.log(res.data);
        // Check if the data contains the value "ponged!"
        if (res.data?.ping === "ponged!") {
          setServerstatus(true);
        } else {
          setServerstatus(false);
        }
        // Else catch error and set state var to false
      } catch (error) {
        // console.error(error);
        setServerstatus(false);
      }
    };

    // Call the func
    checkServer();

    // Periodically checks the server is alive or not for every 10 seconds
    const interval = setInterval(checkServer, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return Serverstatus;
}
