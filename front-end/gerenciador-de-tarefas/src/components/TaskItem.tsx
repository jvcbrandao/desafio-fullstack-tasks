
import React from 'react';
import { Task } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onEdit }) => {
  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created At: {task.createdAt}</p>
      <button onClick={() => onEdit(task)}>Editar</button>
      <button onClick={() => onDelete(task.id)}>Apagar</button>
    </li>
  );
};

export default TaskItem;








//Defino a interface a ser usada com base no que meu componente necessita

// Renderizo na tela a task