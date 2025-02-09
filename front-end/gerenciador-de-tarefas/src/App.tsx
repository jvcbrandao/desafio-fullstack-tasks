import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { Task } from './types/Task';

const App: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(undefined); // Limpa o estado de edição após a atualização
  };
  
  
  

  const deleteTask = async (id: number) => {
    try {
      const resposta = await axios.delete(`http://localhost:8080/tarefas/${id}`);
      
      // Verifica status de sucesso (normalmente 200 OK ou 204 No Content)
      if (resposta.status === 200 || resposta.status === 204) {
        alert("Tarefa excluída com sucesso!"); // Substitua "OI" por mensagem relevante
        
      } else {
        alert(`Erro inesperado: ${resposta.status}`);
      }
      
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
    finally{
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };
  
  
  const editTask = (task: Task) => {
    setEditingTask(task);
  };


  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'all' | 'pending' | 'completed');
  };

  const listTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/tarefas');

      const tasksData: Task[] = response.data.map((task: any) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status as 'pending' | 'completed', // Garantindo o tipo correto
        createdAt: task.createdAt
      }));
      setTasks(tasksData); // Atualiza as tarefas no estado
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="App">
      <h1>Gerenciador de tarefas</h1>
      
      <TaskForm onSubmit={editingTask ? updateTask : addTask} initialTask={editingTask ?? undefined} />
      
      <div>
        <label>Filtro de tarefas</label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">Todas</option>
          <option value="pending">Pendentes</option>
          <option value="completed">Completas</option>
        </select>
      </div>

      <button onClick={listTasks} disabled={loading}>
        {loading ? 'Carregando...' : 'Listar Tarefas'}
      </button>

      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} filter={filter} />
    </div>
  );
};




export default App;
