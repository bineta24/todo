
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormValues {
  newTodo: string;
  endDate: string;
}

interface AddTodoProps {
  handleAddTodo: (newTodo: string, endDate: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ handleAddTodo }) => {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { newTodo, endDate } = data;
    if (newTodo.trim() !== '') {
      handleAddTodo(newTodo, endDate);
      reset();
    }
  };

  return (
    <div>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle className="text-center mb-2">Ajouter une tache</DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className=" items-center">
              <input
                type="text"
                {...register('newTodo')}
                placeholder="Nouvelle tâche"
                className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
              />

              <input
                type="date"
                {...register('endDate')}
                className="ml-2 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
              />
              <button
                type="submit"
                className="ml-4 rounded-full px-4 py-2 bg-jaune text-white hover:bg-secondary focus:outline-none"
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
