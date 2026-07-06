import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoFilter from '../components/TodoFilter';

describe('TodoFilter Component', () => {
  it('renders all filter buttons', () => {
    render(
      <TodoFilter
        currentFilter="all"
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
        hasCompleted={false}
      />
    );

    expect(screen.getByRole('button', { name: 'Todas' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Activas' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Completadas' })).toBeInTheDocument();
  });

  it('highlights the active filter button', () => {
    render(
      <TodoFilter
        currentFilter="active"
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
        hasCompleted={false}
      />
    );

    const activeBtn = screen.getByRole('button', { name: 'Activas' });
    expect(activeBtn).toHaveClass('active');
    
    const inactiveBtn = screen.getByRole('button', { name: 'Todas' });
    expect(inactiveBtn).not.toHaveClass('active');
  });

  it('calls onFilterChange when a filter button is clicked', () => {
    const handleFilterChange = vi.fn();
    render(
      <TodoFilter
        currentFilter="all"
        onFilterChange={handleFilterChange}
        onClearCompleted={vi.fn()}
        hasCompleted={false}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Completadas' }));
    expect(handleFilterChange).toHaveBeenCalledWith('completed');
  });

  it('shows clear completed button only if hasCompleted is true', () => {
    const { rerender } = render(
      <TodoFilter
        currentFilter="all"
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
        hasCompleted={false}
      />
    );

    expect(screen.queryByRole('button', { name: 'Limpiar completadas' })).not.toBeInTheDocument();

    rerender(
      <TodoFilter
        currentFilter="all"
        onFilterChange={vi.fn()}
        onClearCompleted={vi.fn()}
        hasCompleted={true}
      />
    );

    expect(screen.getByRole('button', { name: 'Limpiar completadas' })).toBeInTheDocument();
  });

  it('calls onClearCompleted when clear button is clicked', () => {
    const handleClearCompleted = vi.fn();
    render(
      <TodoFilter
        currentFilter="all"
        onFilterChange={vi.fn()}
        onClearCompleted={handleClearCompleted}
        hasCompleted={true}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Limpiar completadas' }));
    expect(handleClearCompleted).toHaveBeenCalled();
  });
});
