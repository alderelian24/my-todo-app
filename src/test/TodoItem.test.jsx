import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from '../components/TodoItem';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 'test-id',
    text: 'Aprender Vitest',
    completed: false,
    createdAt: new Date().toISOString(),
  };

  it('renders todo item text and time correctly', () => {
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Aprender Vitest')).toBeInTheDocument();
  });

  it('applies line-through style if completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    
    const textSpan = screen.getByText('Aprender Vitest');
    expect(textSpan).toHaveClass('line-through');
  });

  it('calls onToggle when checkbox is clicked', () => {
    const handleToggle = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={handleToggle} onDelete={vi.fn()} />);
    
    const checkbox = screen.getByRole('button', { name: /Marcar como completada/i });
    fireEvent.click(checkbox);
    
    expect(handleToggle).toHaveBeenCalledWith('test-id');
  });

  it('calls onDelete after timeout when delete button is clicked', () => {
    vi.useFakeTimers();
    const handleDelete = vi.fn();
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={handleDelete} />);
    
    const deleteButton = screen.getByRole('button', { name: /Eliminar tarea/i });
    fireEvent.click(deleteButton);
    
    // Deletion is delayed by 300ms due to the removal animation
    act(() => {
      vi.advanceTimersByTime(300);
    });
    
    expect(handleDelete).toHaveBeenCalledWith('test-id');
    vi.useRealTimers();
  });
});
