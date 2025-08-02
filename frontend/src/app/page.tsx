"use client";
import ShowServerStatus from "@/hooks/serverstatus";
import Home from "./home/page";

export default function Root() {
  // if the server is up allow users to navigate and do operations
  return (
    <div className="items-center min-h-screen p-8">
      <Home />
    </div>
  );
}
