import React from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface TodoListProps {
  todos: Array<{
    text: string;
    completed: boolean;
  }>;
  handleToggle: (index: number) => void;
  handleDelete: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleToggle,
  handleDelete,
}) => {
  const completedTodos = todos.filter((todo) => todo.completed); 

  // const handleDeleteCompleted = () => {
  //   const notCompletedTodos = todos.filter((todo) => !todo.completed); // 
  //   notCompletedTodos.forEach((_, index) => handleDelete(index)); //
  // };

  return (
    <div>
      <Tabs defaultValue="account" className="w-80 h-96 bg-white">
        <TabsList className='w-80' >
          <TabsTrigger value="account">Todos</TabsTrigger>
          <TabsTrigger value="password">Todos completed</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ul className='mt-4'>
            {todos.map((todo, index) => (
              <li key={index} className='mb-6 ml-4 ' >
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(index)}
                  />
                  <span
                    className={`${todo.completed ? 'line-through' : ''}`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="password">
          <ul className='mt-4'>
            {completedTodos.map((todo, index) => (
              <li key={index} className='mb-6 ml-4 ' >
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(index)}
                  />
                  <span
                    className={`${todo.completed ? 'line-through' : ''}`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          {/* <button onClick={handleDeleteCompleted}>Supprimer tous l</button> */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
