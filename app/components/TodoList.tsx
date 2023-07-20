import React, { useState } from 'react';
import { FaTrash, FaList, FaCheckCircle, FaEdit } from 'react-icons/fa';
import { format, isAfter } from 'date-fns'; 
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from 'react-hook-form'; 
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Todo {
  text: string;
  completed: boolean;
  startDate: string;
  endDate: string;
}

interface TodoListProps {
  todos: Todo[];
  handleToggle: (index: number) => void;
  handleDelete: (index: number) => void;
  handleEditEndDate: (index: number, newEndDate: string) => void; 
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleToggle,
  handleDelete,
  handleEditEndDate,
}) => {
  const completedTodos = todos.filter((todo) => todo.completed);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleEditEndDateDialog = (index: number) => {
    setEditingIndex(index);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditingIndex(-1);
    setEditDialogOpen(false);
  };

  const { handleSubmit, register } = useForm();

  const onSaveEndDate = (data: { endDate: string }) => {
    if (editingIndex !== -1) {
      handleEditEndDate(editingIndex, data.endDate);
      handleCloseEditDialog();
    }
  };


  const isTodoEndDatePassed = (endDate: string) => {
    
   
    return isAfter(new Date(), new Date(endDate));
      };
    

  return (
    <div>
      <Tabs defaultValue="account" className=" bg-white rounded-lg w-96 h-[500px] ">
        <TabsList className="w-96 h-20">
          <TabsTrigger value="account" className="w-40 h-20 bg-red">
            <FaList className="w-12 h-5" />
          </TabsTrigger>
          <TabsTrigger value="password" className="w-40 h-20">
            <FaCheckCircle className="text-red w-12 h-5" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="w-96 h-[400px] overflow-y-scroll"  >
          <ul className="mt-4 ">
            {todos.map((todo, index) => (
              // <li key={index} className={`mb-6 ml-4 ${isAfter(new Date(), new Date(todo.endDate)) ? 'text-red-700 line-through' : ''}`}>
              <li key={index} className={`mb-6 ml-4 ${isTodoEndDatePassed(todo.endDate) ? 'text-red-700 line-through' : ''}`}>
                <div>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(index)}
                    // disabled={isAfter(new Date(), new Date(todo.endDate))} 
                    disabled={isTodoEndDatePassed(todo.endDate)}
                 
                    className={`rounded-xl shadow mr-4 ${todo.completed ? 'text-red-500 ' : 'text-blue-500'}`}
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-300 ' : ''}`}>
                    {todo.text}
                  </span>
                  <div>
                    <span className="text-sm text-gray-500 ml-10">{todo.endDate}</span>
                    <button
                      onClick={() => handleEditEndDateDialog(index)}
                      className="text-blue-500 ml-2 focus:outline-none"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="password">
          <ul className="mt-4">
            {completedTodos.map((todo, index) => (
              <li key={index} className="mb-6 ml-4">
                <div>
                  <input
                    className="h-6 w-6 rounded-xl shadow mr-4"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggle(index)}
                  />
                  <span className={`${todo.completed ? 'line-through text-gray-300 ' : ''}`}>
                    {todo.text}
                  </span>
                  <div>
                    <span className="text-sm text-gray-500"> {todo.endDate}</span>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 ml-2 focus:outline-none"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
      
      <Dialog open={editDialogOpen} onOpenChange={handleCloseEditDialog}>
        <DialogContent className="w-96">
          <DialogHeader>
            <DialogTitle>Modifier le délai</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSaveEndDate)} className="flex items-center">
                <input
                  type="date"
                  {...register('endDate', { required: true })}
                  defaultValue={todos[editingIndex]?.endDate || ''}
                  className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="ml-4 rounded-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
                >
                  Save
                </button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoList;
