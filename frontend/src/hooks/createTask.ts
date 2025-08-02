import { headers } from "next/headers";
import useAuthToken from "./useAuthToken";
import api from "@/lib/axios";
import { useCallback } from "react";

interface TaskProp {
  title: string;
  description: string;
}

export function useCreateTask() {
  const { token } = useAuthToken();
  //   console.log(token);

  const createTask = useCallback(
    async ({ title, description }: TaskProp) => {
      if (!token) throw new Error("No token found");

      try {
        const res = await api.post(
          "/tasks",
          { title, description },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [token]
  );

  return { createTask };
}
