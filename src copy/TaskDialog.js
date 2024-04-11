// TaskDialog.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilSquareO,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

const TaskDialog = ({ show, handleClose, handleSave, taskData, tasks }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [radioValue, setRadioValue] = useState("Medium");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskData) {
      setTaskTitle(taskData.title);
      setDescription(taskData.description);
      setDeadline(new Date(taskData.deadline));
      setRadioValue(taskData.priority);
    } else {
      setTaskTitle("");
      setDescription("");
      setDeadline(new Date());
      setRadioValue("Medium");
      setErrors({});
    }
  }, [taskData, show]);

  const validateForm = () => {
    let newErrors = {};
    // Title validation (only for new tasks, as editing doesn't include title change)
    if (!taskData) {
      if (!taskTitle.trim()) {
        newErrors.taskTitle = "Title is required";
      } else if (
        tasks.some(
          (task) => task.id !== taskData?.id && task.title === taskTitle
        )
      ) {
        newErrors.taskTitle = "Title must be unique";
      }
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    // Deadline validation
    if (!deadline || isNaN(deadline.getTime())) {
      // Checks if deadline is not set or invalid
      newErrors.deadline = "Deadline is required";
    }

    // Priority validation - assuming the default value "Medium" is acceptable, no need to check

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Extract the date part without considering the time
      const deadlineDate = deadline.toISOString().split("T")[0];

      handleSave({
        title: taskTitle,
        description: description,
        deadline: deadlineDate,
        priority: radioValue,
      });
      if (taskData) {
        toast.success("Task updated successfully");
      } else {
        toast.success("New task added successfully");
      }
      handleClose();
    }
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Modal show={show} onHide={handleClose} centered size="sm">
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#0D59B1", color: "white" }}
        >
          <Modal.Title>
            {taskData ? (
              <i class="fa-solid fa-pen-to-square"></i>
            ) : (
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
            )}{" "}
            {taskData ? "Edit Task" : "Add Task"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {!taskData && (
              <Form.Group
                controlId="taskTitle"
                style={{ marginBottom: "25px" }}
              >
                <Form.Control
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  isInvalid={!!errors.taskTitle}
                  placeholder="Title"
                  style={{ width: "100%", height: "60px" }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.taskTitle}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Form.Group
              controlId="description"
              style={{ marginBottom: "15px" }}
            >
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={!!errors.description}
                placeholder="Description"
                style={{ width: "100%", height: "60px" }}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="deadline" style={{ marginBottom: "25px" }}>
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="date"
                value={deadline.toISOString().split("T")[0]} // Show date only
                onChange={(e) => setDeadline(new Date(e.target.value))}
                style={{ width: "100%", height: "60px" }}
              />
            </Form.Group>
            <fieldset>
              <Form.Group>
                <Form.Label>Priority</Form.Label>
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Low"
                    name="priorityOptions"
                    id="priorityLow"
                    value="Low"
                    checked={radioValue === "Low"}
                    onChange={() => setRadioValue("Low")}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Medium"
                    name="priorityOptions"
                    id="priorityMedium"
                    value="Medium"
                    checked={radioValue === "Medium"}
                    onChange={() => setRadioValue("Medium")}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="High"
                    name="priorityOptions"
                    id="priorityHigh"
                    value="High"
                    checked={radioValue === "High"}
                    onChange={() => setRadioValue("High")}
                  />
                </div>
              </Form.Group>
            </fieldset>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="btn-primary"
            style={{ width: "100px" }}
          >
            {taskData ? "Update" : "Add"}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="btn-danger"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskDialog;
