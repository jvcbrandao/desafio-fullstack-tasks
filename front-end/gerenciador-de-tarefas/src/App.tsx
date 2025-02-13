import React, { useState, useEffect } from 'react'; // Adicionei o useEffect
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

  useEffect(() => {
    listTasks();
  }, []);


  const editTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskSubmit = (task: Task) => {
    if (editingTask) {
      setTasks(prev => prev.map(t => t.id === task.id ? task : t));
    } else {
      setTasks(prev => [...prev, task]);
    }
    setEditingTask(undefined);
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/tarefas/${id}`);
      
    } catch (error) {
      console.error('Erro ao excluir:', error);
    }
    finally{
      setTasks(prev => prev.filter(task => task.id !== id));
    }
  };



  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as 'all' | 'pending' | 'completed');
  };

  const listTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/tarefas');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Gerenciador de tarefas</h1>
      
      <TaskForm 
        onSubmit={handleTaskSubmit} 
        initialTask={editingTask}
      />
      
      <div className="filter-section">
        <label>Filtro: </label>
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">Todas</option>
          <option value="pending">Pendentes</option>
          <option value="completed">Completas</option>
        </select>
      </div>

      <button 
        onClick={listTasks} 
        disabled={loading}
        className="refresh-button"
      >
        {loading ? 'Carregando...' : 'Atualizar Lista'}
      </button>

          <TaskList 
          tasks={tasks} 
          onDelete={deleteTask} 
          onEdit={editTask} 
          filter={filter}
          />
    </div>
  );
};

export default App;