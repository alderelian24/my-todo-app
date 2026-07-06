import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoInput from '../components/TodoInput';

describe('TodoInput Component', () => {
  it('renders input and button correctly', () => {
    render(<TodoInput onAddTodo={vi.fn()} />);
    expect(screen.getByPlaceholderText('¿Qué necesitas hacer hoy?')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onAddTodo and clears input on form submit', () => {
    const handleAddTodo = vi.fn();
    render(<TodoInput onAddTodo={handleAddTodo} />);

    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    const button = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Comprar leche' } });
    expect(input.value).toBe('Comprar leche');

    fireEvent.click(button);

    expect(handleAddTodo).toHaveBeenCalledWith('Comprar leche');
    expect(input.value).toBe('');
  });

  it('button is disabled when input is empty or only whitespace', () => {
    render(<TodoInput onAddTodo={vi.fn()} />);
    const button = screen.getByRole('button');
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');

    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: '   ' } });
    expect(button).toBeDisabled();

    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    expect(button).not.toBeDisabled();
  });
});
