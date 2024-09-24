import { useEffect, useState } from "react";
import Task from "./model";
import Input from "./atoms/input";
import Dropdown from "./atoms/dropdown";
import FetchApi from "./atoms/fatch-Date";
import CloneTaskButton from "./Clone-button";

const Board = () => {
  const [taskName, setTaskName] = useState("");
  const [isTaskCreating, setIsTaskCreating] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [modelType, setModelType] = useState("view");

  useEffect(() => {
    const storedValue = localStorage.getItem("tasks");
    if (storedValue) {
      setAllTasks(JSON.parse(storedValue));
    }
  }, []);
  const viewTask = (task) => {
    setSelectedTask(task);
    setModelType("view");
  };

  const editTask = (task) => {
    setSelectedTask(task);
    setModelType("edit");
  };

  const closeModal = () => {
    setSelectedTask(undefined);
    setModelType("view");
  };

  const addTasks = () => {
    setIsTaskCreating((pre) => !pre);
  };
  const saveTask = () => {
    if (!taskName) return;
    const newTask = {
      id: new Date().getTime(),
      createdAt: new Date(),
      taskName,
      status: "Pending",
    };
    const newTaskList = [...allTasks, newTask];
    setAllTasks(newTaskList);
    setTaskName("");
    setIsTaskCreating((pre) => !pre);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };

  const updateTask = (newTask) => {
    if (!newTask?.taskName) return;
    const updateIndex = allTasks.findIndex((task) => task.id === newTask.id);
    console.log(updateIndex);
    const newTaskList = [...allTasks];
    newTaskList[updateIndex] = newTask;
    setAllTasks(newTaskList);
    setTaskName("");
    setIsTaskCreating((pre) => !pre);
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };

  const deleteTask = (id) => {
    if (!id) return;
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (!confirmed) return;
    const newTaskList = [...allTasks.filter((task) => task.id !== id)];
    setAllTasks(newTaskList);
    closeModal();
    localStorage.setItem("tasks", JSON.stringify(newTaskList));
  };

  const cloneTask = (id) => {
    const taskToClone = allTasks.find((task) => task.id === id);
    if (taskToClone) {
      const clonedTask = {
        ...taskToClone,
        id: new Date().getTime(), // new unique ID
        taskName: `${taskToClone.taskName} (Clone)`,
        createdAt: new Date(),
      };
      const newTaskList = [...allTasks, clonedTask];
      setAllTasks(newTaskList);
      localStorage.setItem("tasks", JSON.stringify(newTaskList));
    }
  };

  return (
    <div className="container">
      <h2>Tasks ({allTasks.length})</h2>
      <FetchApi />
      <button className="createTask" onClick={() => addTasks()}>
        Create Task
      </button>
      <CloneTaskButton allTasks={allTasks} cloneTask={cloneTask} />
      {isTaskCreating && (
        <div className="create-task">
          <Input
            placeholder="Please enter task name"
            required
            value={taskName}
            onChange={setTaskName}
          />
          <button type="button" onClick={() => saveTask()}>
            Save
          </button>
        </div>
      )}
      <ul>
        {allTasks.map((task, i) => (
          <li key={i}>
            <Task
              id={task.id}
              taskName={task.taskName}
              status={task.status}
              createdAt={task.createdAt}
              onClick={() => viewTask(task)}
              onEdit={() => editTask(task)}
              onDelete={() => deleteTask(task.id)}
            />
          </li>
        ))}
      </ul>
      {/* Modal implementation */}
      {selectedTask && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 id="task">{selectedTask?.taskName}</h2>{" "}
            {/* Display clicked task id */}
            <Input
              label="Task Name"
              placeholder="Please enter task name"
              required
              value={selectedTask?.taskName || ""}
              onChange={(v) =>
                setSelectedTask((prev) => ({ ...prev, taskName: v }))
              }
              readOnly={modelType === "view"}
            />
            <div className="Dropdown">
              <Dropdown
                className="DropDown-Items"
                label="Status"
                placeholder="Please select status"
                options={[
                  { label: "Pending", value: "Pending" },
                  { label: "Complete", value: "Complete" },
                  { label: "In Progress", value: "In Progress" },
                ]}
                required
                value={selectedTask?.status || ""}
                onChange={(v) =>
                  setSelectedTask((prev) => ({ ...prev, status: v }))
                }
                disabled={modelType === "view"}
              />
            </div>
            <div>
              {modelType === "edit" && (
                <button
                  onClick={() => updateTask(selectedTask)}
                  className="close-btn"
                >
                  Save
                </button>
              )}
              <button
                onClick={() => deleteTask(selectedTask.id)}
                className="close-btn"
              >
                Delete Task
              </button>
              <button onClick={closeModal} className="close-btn">
                Close Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Board;
