// TaskTable.js
import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function formatDate(dateString) {
  const date = new Date(dateString);
  const formattedDate = `${date.getMonth() + 1}/${
    date.getDate() + 1
  }/${date.getFullYear()}`;
  return formattedDate;
}

function TaskTable({ tasks, onEdit, onDelete, onCompleteChange }) {
  const handleDelete = (taskId, taskTitle) => {
    onDelete(taskId);
    toast.success(`Task "${taskTitle}" deleted successfully`);
  };

  return (
    <div className="container mt-5">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th className="text-center">Title</th>
            <th className="text-center">Description</th>
            <th className="text-center">Deadline</th>
            <th className="text-center">Priority</th>
            <th className="text-center">Is Complete</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="align-middle">
              <td className="text-center">{task.title}</td>
              <td className="text-center">{task.description}</td>
              <td className="text-center">{formatDate(task.deadline)}</td>
              <td className="text-center">{task.priority}</td>
              <td className="text-center align-middle">
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={() => onCompleteChange(task.id, !task.isComplete)}
                />
              </td>
              <td className="text-center align-middle">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0",
                  }}
                >
                  {!task.isComplete && (
                    <Button
                      variant="primary"
                      onClick={() => onEdit(task)}
                      style={{ width: "50%" }}
                    >
                      <i class="fa-solid fa-pen-to-square"></i>Update
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(task.id, task.title)}
                    style={{ width: "50%" }}
                  >
                    <i class="fa fa-times-circle" aria-hidden="true"></i> Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
