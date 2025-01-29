import React, { useState } from 'react';
import { Task } from '../types/Task';

const EditTaskForm = ({ task, onSave }: { task: Task; onSave: (task: Task) => void }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<'pending' | 'completed'>(task.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...task, title, description, status });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descrição"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}>
        <option value="pending">Pendente</option>
        <option value="completed">Concluída</option>
      </select>
      <button type="submit">Salvar</button>
    </form>
  );
};

export default EditTaskForm;
