import React, { useState } from 'react';

const ProjectForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.length < 3 || title.length > 100) return alert('Title must be 3-100 characters');
    onSubmit({ Title: title, Description: description });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input type="text" placeholder="Title (3-100 chars)" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Create</button>
    </form>
  );
};

export default ProjectForm;