import { useDeleteTask } from "@/hooks/deleteTask";
import { useUpdateTaskStatus } from "@/hooks/updateTaskStatus";
import React, { useState } from "react";

interface TaskProp {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt?: string;
}

export default function TaskBlock({
  id,
  title,
  description,
  status,
}: TaskProp) {
  const [taskStatus, settaskStatus] = useState<string>(status);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // TODO: Handle patch and delete method

  // call the delete hool
  const { deleteTask } = useDeleteTask();

  // call the updatestatus hook
  const { updateTaskStatus } = useUpdateTaskStatus();

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id: id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    settaskStatus(newStatus);
    setIsEditing(false);

    try {
      await updateTaskStatus({ id: id, status: newStatus });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <li className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-black p-6 rounded-2xl border border-white/30 hover:bg-white/10 transition-colors duration-300 gap-4">
      <div className="flex-1 min-w-0">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white break-words">
          {title}
        </h3>
        <p className="text-white/90 break-words mt-1">{description}</p>

        {/* Task Status Update */}
        {isEditing ? (
          <select
            value={taskStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            onBlur={() => setIsEditing(false)} // closes dropdown if clicked outside
            className="text-white text-sm border border-yellow-300 rounded-2xl px-6 py-1"
          >
            <option value="OPEN">OPEN</option>
            <option value="IN_PROGRESS">IN_PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        ) : (
          <p
            className={`text-sm text-white/60 mt-2 italic w-fit px-6 py-1 border rounded-2xl cursor-pointer ${
              taskStatus === "OPEN"
                ? "bg-gray-800/40 border-gray-500"
                : taskStatus === "IN_PROGRESS"
                ? "bg-blue-800/20 border-blue-500"
                : "bg-green-700/20 border-green-500"
            }`}
            onClick={() => setIsEditing(true)}
            title="Click to change status"
          >
            {taskStatus}
          </p>
        )}
      </div>

      <button
        className="bg-red-500 hover:bg-red-600 transition px-3 py-2 rounded-2xl cursor-pointer"
        title="Delete Task"
        onClick={handleDeleteTask}
      >
        <img src="./assets/trash.svg" alt="delete" width="24" height="24" />
      </button>
    </li>
  );
}
