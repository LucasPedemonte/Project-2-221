import React, { useState } from "react";
import TaskTable from "./TaskTable";
import TaskDialog from "./TaskDialog";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const handleShowAddDialog = () => {
    setCurrentTask(null);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  const handleCheckBox = (taskId, isComplete) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isComplete };
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  };

  const handleSaveTask = (task) => {
    if (currentTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === currentTask.id ? { ...t, ...task } : t
      );
      setTasks(updatedTasks);
    } else {
      const newTask = { ...task, id: Date.now() };
      setTasks((prevTasks) => [...prevTasks, newTask]);
    }
    setShowDialog(false);
  };

  return (
    <div className="container-fluid px-0">
      <div className="bg-primary py-3 px-3 d-flex justify-content-between align-items-center">
        <h2
          className="text-white mb-0 text-center"
          style={{ marginLeft: "200px", flex: "1" }}
        >
          <i class="fa fa-bars" aria-hidden="true"></i>Frameworks
        </h2>
        <div>
          <button
            type="button"
            className="btn btn"
            onClick={handleShowAddDialog}
            style={{
              width: "110px",
              backgroundColor: "#238ce5",
              color: "white",
            }}
          >
            <i className="fas fa-plus-circle"></i> Add
          </button>
        </div>
      </div>
      <TaskTable
        tasks={tasks}
        onEdit={(task) => {
          setCurrentTask(task);
          setShowDialog(true);
        }}
        onDelete={handleDeleteTask}
        onCompleteChange={handleCheckBox}
      />
      <TaskDialog
        show={showDialog}
        handleClose={handleCloseDialog}
        handleSave={handleSaveTask}
        taskData={currentTask}
        tasks={tasks}
      />
    </div>
  );
}

export default App;
