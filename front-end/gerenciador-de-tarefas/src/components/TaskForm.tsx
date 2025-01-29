import React, { useState } from 'react';
import { Task } from '../types/Task';
import axios from 'axios';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
  initialTask?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialTask }) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [status, setStatus] = useState(initialTask?.status || 'pending');
  const [loading, setLoading] = useState(false); // Para mostrar que está carregando

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Criação do objeto com o formato que seu backend espera
  const newTask = {
    titulo: title,       // alterando para "titulo"
    descricao: description, // alterando para "descricao"
    status    
  };

  setLoading(true);

  try {
    // Envia os dados para o backend
    await axios.post('http://localhost:8080/tarefas', newTask);
    
    // Limpa os campos do formulário
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descrição da tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as 'pending' | 'completed')}>
        <option value="pending">Pendente</option>
        <option value="completed">Concluído</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Salvar tarefa'}
      </button>
    </form>
  );
};

export default TaskForm;
