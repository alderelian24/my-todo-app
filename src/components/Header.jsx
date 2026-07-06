export default function Header({ totalTasks, completedTasks }) {
  const pendingTasks = totalTasks - completedTasks;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <header className="text-center mb-8">
      {/* App Title */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg shadow-primary-500/25">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          <span className="text-gradient">TaskFlow</span>
        </h1>
      </div>

      <p className="text-surface-400 text-sm font-light mb-6">
        Organiza tu día, una tarea a la vez
      </p>

      {/* Stats Bar */}
      {totalTasks > 0 && (
        <div className="animate-fade-in">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-surface-800 rounded-full overflow-hidden mb-3">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${progress}%`,
                background: progress === 100
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : 'linear-gradient(90deg, #4f46e5, #818cf8)',
              }}
            />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-surface-400">
              <span className="w-2 h-2 rounded-full bg-surface-500" />
              {totalTasks} {totalTasks === 1 ? 'tarea' : 'tareas'}
            </span>
            <span className="flex items-center gap-1.5 text-primary-400">
              <span className="w-2 h-2 rounded-full bg-primary-500" />
              {pendingTasks} {pendingTasks === 1 ? 'pendiente' : 'pendientes'}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              {completedTasks} {completedTasks === 1 ? 'completada' : 'completadas'}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
