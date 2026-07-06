import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-fade-in" id="empty-state">
        {/* Empty state illustration */}
        <div className="w-20 h-20 rounded-2xl bg-surface-800/50 border border-surface-700/30 flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-surface-500 text-sm font-medium mb-1">No hay tareas</p>
        <p className="text-surface-600 text-xs">Agrega una nueva tarea para comenzar</p>
      </div>
    );
  }

  return (
    <div className="space-y-2" id="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
