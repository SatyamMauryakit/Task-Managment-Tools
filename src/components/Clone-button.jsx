import React, { useState } from "react";
import "./atoms/Clone-button.css";
const CloneTaskButton = ({ allTasks, cloneTask }) => {
  const [isCloneDropdownOpen, setIsCloneDropdownOpen] = useState(false);
  const [cloneTaskId, setCloneTaskId] = useState(null);
  const handleCloneDropdownChange = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    if (selectedId) {
      setCloneTaskId(selectedId);
      cloneTask(selectedId);
      setIsCloneDropdownOpen(false);
    }
  };

  return (
    <div className="cloneTask">
      <button
        className="button"
        onClick={() => setIsCloneDropdownOpen(!isCloneDropdownOpen)}
      >
        Clone Task
      </button>

      {isCloneDropdownOpen && (
        <select className="Select-Task" onChange={handleCloneDropdownChange}>
          <option value="">Select a task to clone</option>
          {allTasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.taskName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CloneTaskButton;
