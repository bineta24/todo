import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  newTodo: string;
}

interface AddTodoProps {
  handleAddTodo: (newTodo: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ handleAddTodo }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { newTodo } = data;
    if (newTodo.trim() !== '') {
      handleAddTodo(newTodo);
      reset();
     
    }
  };

  return (
    <div>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Adding todo</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center ">
              <input
                type="text"
                {...register('newTodo')}
                placeholder="Nouvelle tâche"
                className="rounded-full  px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className=" ml-4 rounded-full  px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
              >
                Ajouter
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </div>
  );
};

export default AddTodo;
