"use client";

import { ReactNode } from "react";
import ShowServerStatus from "@/hooks/serverstatus";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  const Serverstatus = ShowServerStatus();

  if (Serverstatus === null) {
    return (
      <div className="w-fit mx-auto my-[25rem] -translate-y-[50%]">
        <p className="bg-gray-50/20 px-20 py-5 rounded-2xl">
          Checking Server...
        </p>
      </div>
    );
  }

  if (!Serverstatus) {
    return (
      <div className="w-fit mx-auto my-[25rem] -translate-y-[50%]">
        <p className="bg-gray-50/20 px-20 py-5 rounded-2xl">Server is down</p>
      </div>
    );
  }

  return <>{children}</>;
}
