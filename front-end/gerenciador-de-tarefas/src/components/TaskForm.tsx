import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import axios from 'axios';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => { // Adicionei a prop onSubmit
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<'pending' | 'completed'>(initialTask?.status || 'pending');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setStatus(initialTask.status);
    }
  }, [initialTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const taskData = {
      title,
      description, 
      status,
    };

    setLoading(true);

    try {
      let response;
      if (initialTask) {
        response = await axios.put(`http://localhost:8080/tarefas/${initialTask.id}`, taskData);
      } else {
        response = await axios.post('http://localhost:8080/tarefas', taskData);
      }

      onSubmit(response.data);

      if (!initialTask) {
        setTitle('');
        setDescription('');
        setStatus('pending');
      }

    } catch (error) {
      console.error('Erro detalhado:', error);
      alert('Erro ao salvar! Verifique o console.');
    } finally {
      setLoading(false);
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Digite o título da tarefa"
        />
      </div>

      <div className="form-group">
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Adicione detalhes da tarefa"
        />
      </div>

      <div className="form-group">
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}
        >
          <option value="pending">Pendente</option>
          <option value="completed">Concluído</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="save-button"
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  );
};

export default TaskForm;