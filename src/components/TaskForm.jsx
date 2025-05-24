import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

export default function TaskForm({ show, handleClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [validated, setValidated] = useState(false);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('todo');
    setValidated(false);
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    onCreate({ title: title.trim(), description: description.trim(), status });
    resetForm();
    handleClose();
  };

  useEffect(() => {
    if (!show) resetForm();
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-dark text-light">
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Task title is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            🚀 Create Task
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
