import React, { useState } from 'react';

const TaskForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return alert('Title required');
    onSubmit({ Title: title, DueDate: dueDate || null });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input type="date" placeholder="Due Date (optional)" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;