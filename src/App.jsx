import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';

// ===== LocalStorage Helpers =====
const STORAGE_KEY = 'taskflow-todos';

function loadTodos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Silently fail if storage is full
  }
}

// ===== Main App Component =====
export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState('all');

  // Persist to localStorage on change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  // ---- Actions ----
  const addTodo = useCallback((text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  // ---- Computed ----
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-start pt-12 sm:pt-20 px-4 pb-12 bg-grid">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-primary-700/5 rounded-full blur-3xl pointer-events-none" />

      {/* App Container */}
      <div className="w-full max-w-lg relative z-10">
        <Header totalTasks={todos.length} completedTasks={completedCount} />

        <div className="glass-card p-6">
          <TodoInput onAddTodo={addTodo} />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
          {todos.length > 0 && (
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
              hasCompleted={completedCount > 0}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-6 text-xs text-surface-600">
          <p>
            Hecho con{' '}
            <span className="text-red-400">♥</span>{' '}
            usando React &amp; Tailwind CSS
          </p>
        </footer>
      </div>
    </main>
  );
}
