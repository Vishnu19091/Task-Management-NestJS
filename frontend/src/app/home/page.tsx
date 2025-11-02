"use client";

import ShowServerStatus from "@/_hooks/serverstatus";
import TaskList from "./_components/Tasks";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16">
      <h2 className="text-4xl font-bold">Welcome to Task management</h2>
      {/* <Link href={"/auth"}>auth</Link> */}
      <TaskList />
    </div>
  );
}
