"use client";

import ShowServerStatus from "@/hooks/serverstatus";
import Link from "next/link";
import TaskList from "./components/Tasks";

export default function Home() {
  // Ping the server
  const Serverstatus = ShowServerStatus();

  // if (Serverstatus === null) {
  //   return (
  //     <div className="w-fit mx-auto my-[25rem] -translate-y-[50%]">
  //       <p className="bg-gray-50/20 px-20 py-5 rounded-2xl">
  //         Checking Server....
  //       </p>
  //     </div>
  //   );
  // }

  // if the server is up allow users to navigate and do operations
  if (Serverstatus) {
    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        Welcome to Task management /home.
        {/* Show tasks or allow the user to navigate */}
        <Link href={"/auth"}>auth</Link>
        <TaskList />
      </div>
    );
  }

  // show server is down
  return (
    <div className="w-fit mx-auto my-[25rem] -translate-y-[50%]">
      <p className="bg-gray-50/20 px-20 py-5 rounded-2xl">Server is down</p>
    </div>
  );
}
