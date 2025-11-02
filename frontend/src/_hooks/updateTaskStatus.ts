import { headers } from "next/headers";
import useAuthToken from "./useAuthToken";
import api from "@/_lib/axios";
import { useCallback } from "react";

interface Prop {
  id: string;
  status: string;
}

/**
 * @returns **Updated Task Status**
 */
export function useUpdateTaskStatus() {
  const { token } = useAuthToken();
  //   console.log(token);

  const updateTaskStatus = useCallback(
    async ({ id, status }: Prop) => {
      if (!token) throw new Error("No token found");

      try {
        const res = await api.patch(
          `/tasks/${id}/status`,
          { id, status },
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

  return { updateTaskStatus };
}
