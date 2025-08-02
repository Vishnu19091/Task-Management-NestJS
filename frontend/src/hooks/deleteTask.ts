import { headers } from "next/headers";
import useAuthToken from "./useAuthToken";
import api from "@/lib/axios";
import { useCallback } from "react";

interface Prop {
  id: string;
}

export function useDeleteTask() {
  const { token } = useAuthToken();

  const deleteTask = useCallback(
    async ({ id }: Prop) => {
      if (!token) throw new Error("No token found");

      try {
        const res = await api.delete(`/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          return `Task ID:${id} deleted Successfully`;
        }
      } catch (error) {
        throw error;
      }
    },
    [token]
  );

  return { deleteTask };
}
