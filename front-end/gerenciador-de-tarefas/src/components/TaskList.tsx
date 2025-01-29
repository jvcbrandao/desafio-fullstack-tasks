import React from 'react';
import { Task } from '../types/Task';
import axios from 'axios';

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
  filter: 'all' | 'pending' | 'completed';
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onEdit, filter }) => {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const handleDelete = async (id: number) => {
    try {
      console.log(id);
      // Envia a requisição de exclusão para o backend
      await axios.delete(`http://localhost:8080/tarefas/${id}`);
      // Chama o onDelete para remover da tela
      onDelete(id);
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
      alert('Erro ao excluir a tarefa.');
    }
  };

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <span>{task.status === 'pending' ? 'Pendente' : 'Concluída'}</span>
          <button onClick={() => onEdit(task)}>Editar</button>
          <button onClick={() => handleDelete(task.id)}>Apagar</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;

