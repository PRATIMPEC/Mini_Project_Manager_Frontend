import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProject, createTask, updateTask, deleteTask } from '../services/api';
import TaskForm from './TaskForm';
import Toast from './Toast';
import LoadingSpinner from './LoadingSpinner';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    setLoading(true);
    try {
      const data = await getProject(id);
      setProject(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data) => {
    try {
      const newTask = await createTask(id, data);
      setProject({ ...project, Tasks: [...project.Tasks, newTask] });
      setShowTaskForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleComplete = async (taskId, isCompleted) => {
    try {
      await updateTask(taskId, { IsCompleted: !isCompleted });
      fetchProject();  // Refresh
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTask = async (taskId, data) => {
    try {
      await updateTask(taskId, data);
      fetchProject();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchProject();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="project-details-container">
      <h1>{project.Title}</h1>
      <p>{project.Description}</p>
      <h2>Tasks</h2>
      <button onClick={() => setShowTaskForm(!showTaskForm)}>{showTaskForm ? 'Cancel' : 'Add Task'}</button>
      {showTaskForm && <TaskForm onSubmit={handleCreateTask} />}
      <ul className="task-list">
        {project.Tasks.map(task => (
          <li key={task.Id} className={task.IsCompleted ? 'completed' : ''}>
            <span>{task.Title} {task.DueDate && `(Due: ${new Date(task.DueDate).toLocaleDateString()})`}</span>
            <button onClick={() => handleToggleComplete(task.Id, task.IsCompleted)}>
              {task.IsCompleted ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => handleUpdateTask(task.Id, { Title: prompt('New Title', task.Title), DueDate: prompt('New Due Date (YYYY-MM-DD)', task.DueDate) })}>Edit</button>
            <button onClick={() => handleDeleteTask(task.Id)}>Delete</button>
          </li>
        ))}
      </ul>
      {error && <Toast message={error} type="error" />}
    </div>
  );
};

export default ProjectDetails;