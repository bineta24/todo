'use client'
import React, { useState } from 'react';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { FaPlus } from 'react-icons/fa';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

interface Todo {
  text: string;
  completed: boolean;
  startDate: string;
  endDate: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: 'Apprendre react', completed: false, startDate: '2023-07-19', endDate: '2023-07-20' },
    { text: 'Apprendre Next ', completed: true, startDate: '2023-07-21', endDate: '2023-07-22' },
    { text: 'Faire un projet react', completed: false, startDate: '2023-07-23', endDate: '2023-07-24' },
    { text: 'Faire un projet react', completed: false, startDate: '2023-07-23', endDate: '2023-07-24' },
    { text: 'Faire un résumé react', completed: false, startDate: '2023-07-23', endDate: '2023-07-24' },
    { text: 'Faire un résumé react', completed: false, startDate: '2023-07-23', endDate: '2023-07-24' },
 
  ]);
  const [dialogOpen, setDialogOpen] = useState(false); 




  const handleAddTodo = (newTodo: string, endDate: string) => {
    const newTodoItem: Todo = {
      text: newTodo,
      completed: false,
      startDate: new Date().toISOString().slice(0, 10),
      endDate: endDate,
    };
    setTodos([...todos, newTodoItem]);
    setDialogOpen(false); 
  };

  const handleToggleTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const handleEditEndDate = (index: number, newEndDate: string) => {
    const updatedTodos = [...todos];
    updatedTodos[index].endDate = newEndDate;
    setTodos(updatedTodos);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-primary to-secondary w-full ">
      <div className="flex flex-col items-center">
        <TodoList
          todos={todos}
          handleToggle={handleToggleTodo}
          handleDelete={handleDeleteTodo}
          handleEditEndDate={handleEditEndDate}
        />
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger className="bg-jaune rounded-full w-16 h-16 flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FaPlus className="text-white bg-jaune" />
            </DialogTrigger>
            <AddTodo handleAddTodo={handleAddTodo} />
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Home;
