import { useState } from 'react';

export default function TodoItem({ todo, onToggle, onDelete }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = () => {
    setIsRemoving(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  return (
    <div
      id={`todo-item-${todo.id}`}
      className={`todo-item animate-slide-in ${isRemoving ? 'animate-removing' : ''} group`}
    >
      {/* Custom Checkbox */}
      <button
        id={`toggle-${todo.id}`}
        onClick={() => onToggle(todo.id)}
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        aria-label={todo.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
      >
        {todo.completed && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white animate-check"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Task Text */}
      <span
        className={`flex-1 text-sm transition-all duration-300 ${
          todo.completed
            ? 'line-through text-surface-500'
            : 'text-surface-200'
        }`}
      >
        {todo.text}
      </span>

      {/* Timestamp */}
      <span className="text-[10px] text-surface-600 hidden sm:block">
        {new Date(todo.createdAt).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>

      {/* Delete Button */}
      <button
        id={`delete-${todo.id}`}
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-500/20 text-surface-500 hover:text-red-400 transition-all duration-300"
        aria-label="Eliminar tarea"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
