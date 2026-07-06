import { useState } from 'react';

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddTodo(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6" id="todo-form">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            id="todo-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="¿Qué necesitas hacer hoy?"
            className="w-full px-5 py-3.5 rounded-xl bg-surface-800/70 border border-surface-700/50 text-surface-100 placeholder-surface-500 outline-none input-glow text-sm font-medium"
            autoComplete="off"
            maxLength={200}
          />
          {text.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-surface-600 animate-fade-in">
              {text.length}/200
            </span>
          )}
        </div>
        <button
          id="add-todo-btn"
          type="submit"
          disabled={!text.trim()}
          className="px-5 py-3.5 rounded-xl font-semibold text-sm text-white btn-glow disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:shadow-none transition-all duration-300"
          style={{
            background: text.trim()
              ? 'linear-gradient(135deg, #4f46e5, #6366f1)'
              : 'rgba(30, 41, 59, 0.5)',
            boxShadow: text.trim()
              ? '0 4px 20px rgba(99, 102, 241, 0.3)'
              : 'none',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </form>
  );
}
