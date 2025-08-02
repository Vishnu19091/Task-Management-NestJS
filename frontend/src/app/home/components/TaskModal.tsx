{
  /* 
    Modal window for creating the task

    modal window should contain two input
    fields: 
        title,
        description
    
    ! 1. Title of the task
    ! 2. Description of the task
    */
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateTask } from "@/hooks/createTask";
import axios from "axios";
import React, { useState } from "react";

export function PopoverModal() {
  const [title, settitle] = useState<string>("");
  const [description, setdescription] = useState<string>("");
  const [error, seterror] = useState<string>("");

  //   console.log(title, description);

  const { createTask } = useCreateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // passing the state var as a prop to the backend
    try {
      await createTask({ title: title, description: description });

      // clear the form input fields
      setdescription("");
      settitle("");

      // clear the error message
      seterror("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;
        const message = err.response.data?.message;
        const res = message.join(" ");

        seterror(res);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="rounded-2xl bg-blue-600 p-4 text-xl cursor-pointer w-fit justify-self-end"
        >
          New +
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Create your Tasks</h4>
          </div>
          <form className="grid gap-2 rounded-2xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 items-center gap-4">
              <label>Title</label>
              <input
                placeholder="Title"
                className="col-span-2 h-8 border-b-2 focus:border-white outline-0"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <label>Description</label>

              <input
                placeholder="Description"
                className="col-span-2 h-8 border-b-2 focus:border-white outline-0"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 items-center justify-center">
              <button className="bg-white/10 p-2 rounded-2xl cursor-pointer border hover:border-white">
                Create Task
              </button>

              {/* Show error message */}
              <p className="text-red-600">{error}</p>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
