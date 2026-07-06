const FILTERS = [
  { key: 'all', label: 'Todas' },
  { key: 'active', label: 'Activas' },
  { key: 'completed', label: 'Completadas' },
];

export default function TodoFilter({ currentFilter, onFilterChange, onClearCompleted, hasCompleted }) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-surface-700/30" id="todo-filters">
      {/* Filter Buttons */}
      <div className="flex gap-1">
        {FILTERS.map((filter) => (
          <button
            id={`filter-${filter.key}`}
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`filter-btn ${currentFilter === filter.key ? 'active' : ''}`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Clear Completed */}
      {hasCompleted && (
        <button
          id="clear-completed-btn"
          onClick={onClearCompleted}
          className="text-xs text-surface-500 hover:text-red-400 transition-colors duration-300 cursor-pointer animate-fade-in"
        >
          Limpiar completadas
        </button>
      )}
    </div>
  );
}
