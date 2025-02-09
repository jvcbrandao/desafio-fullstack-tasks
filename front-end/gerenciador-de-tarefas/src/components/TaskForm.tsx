import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import axios from 'axios';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState<'pending' | 'completed'>(initialTask?.status || 'pending');
  const [loading, setLoading] = useState(false);

  // Atualiza os campos quando recebe uma tarefa para edição
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
      titulo: title,
      descricao: description,
      status,
    };

    setLoading(true);

    try {
      if (initialTask) {
        // Atualiza tarefa existente
        await axios.put(`http://localhost:8080/tarefas/${initialTask.id}`, taskData);
      } else {
        // Cria nova tarefa
        await axios.post('http://localhost:8080/tarefas', taskData);
      }

      // Reseta o formulário após sucesso
      setTitle('');
      setDescription('');
      setStatus('pending');

    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
      alert('Erro ao salvar a tarefa. Tente novamente!');
    } finally {
      setLoading(false);
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
        {loading ?
          <span>Salvando...</span>
       :
          <span>Salvar</span>
        }
      </button>
    </form>
  );
};

export default TaskForm;