'use client'

import React, { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';
import { FaPlus } from 'react-icons/fa';

interface Todo {
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { text: 'Apprendre react', completed: false },
    { text: 'Apprendre Next ', completed: true },
    { text: 'Faire un résumé react', completed: false },
    { text: 'Aprendre Typesript', completed: false },
    { text: 'Faire un projet nesxt', completed: true },
    { text: 'Lire la documentation next', completed: false },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false); // État pour contrôler l'ouverture/fermeture du dialogue

  const handleAddTodo = (newTodo: string) => {
    const newTodoItem: Todo = {
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setDialogOpen(false); // Fermer le dialogue après l'ajout
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



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-primary to-secondary w-full "  >
      <div className="flex flex-col items-center   ">
        <TodoList
          todos={todos}
          handleToggle={handleToggleTodo}
          handleDelete={handleDeleteTodo}
        />
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
            <DialogTrigger className=" bg-jaune rounded-full  w-16 h-16 flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <FaPlus className="text-white bg-jaune " />
            </DialogTrigger>
            <AddTodo handleAddTodo={handleAddTodo} />
          </Dialog>
        </div>
      </div>
    
    </div>
  );
};

export default Home;

