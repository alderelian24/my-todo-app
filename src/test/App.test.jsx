import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';

describe('App Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders header, input, and empty state initially', () => {
    render(<App />);
    expect(screen.getByText('TaskFlow')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('¿Qué necesitas hacer hoy?')).toBeInTheDocument();
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
  });

  it('can add a new task and see it in the list', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    const form = screen.getByRole('button'); // Add button inside form

    fireEvent.change(input, { target: { value: 'Comprar comida de gato' } });
    fireEvent.click(form);

    expect(screen.getByText('Comprar comida de gato')).toBeInTheDocument();
    expect(screen.queryByText('No hay tareas')).not.toBeInTheDocument();
    
    // Stats check
    expect(screen.getByText('1 tarea')).toBeInTheDocument();
    expect(screen.getByText('1 pendiente')).toBeInTheDocument();
  });

  it('can toggle a task status', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    const form = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Lavar platos' } });
    fireEvent.click(form);

    const taskText = screen.getByText('Lavar platos');
    expect(taskText).not.toHaveClass('line-through');

    // Click checkbox. The checkbox uses TodoItem toggle-id or button. Let's find it.
    const checkbox = screen.getByRole('button', { name: /Marcar como completada/i });
    fireEvent.click(checkbox);

    expect(taskText).toHaveClass('line-through');
    expect(screen.getByText('1 completada')).toBeInTheDocument();
  });

  it('can filter tasks by status', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    const form = screen.getByRole('button');

    // Add first task (active)
    fireEvent.change(input, { target: { value: 'Tarea Activa' } });
    fireEvent.click(form);

    // Add second task
    fireEvent.change(input, { target: { value: 'Tarea Completada' } });
    fireEvent.click(form);

    // Complete the second task (which is the first element in the list since we prepend)
    const checkboxes = screen.getAllByRole('button', { name: /Marcar como completada/i });
    fireEvent.click(checkboxes[0]); // Complete "Tarea Completada"

    expect(screen.getByText('Tarea Activa')).toBeInTheDocument();
    expect(screen.getByText('Tarea Completada')).toBeInTheDocument();

    // Click "Activas" filter
    fireEvent.click(screen.getByRole('button', { name: 'Activas' }));
    expect(screen.getByText('Tarea Activa')).toBeInTheDocument();
    expect(screen.queryByText('Tarea Completada')).not.toBeInTheDocument();

    // Click "Completadas" filter
    fireEvent.click(screen.getByRole('button', { name: 'Completadas' }));
    expect(screen.queryByText('Tarea Activa')).not.toBeInTheDocument();
    expect(screen.getByText('Tarea Completada')).toBeInTheDocument();
  });

  it('can clear completed tasks', () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    const form = screen.getByRole('button');

    fireEvent.change(input, { target: { value: 'Limpiame' } });
    fireEvent.click(form);

    const checkbox = screen.getByRole('button', { name: /Marcar como completada/i });
    fireEvent.click(checkbox);

    expect(screen.getByText('Limpiame')).toBeInTheDocument();
    
    const clearBtn = screen.getByRole('button', { name: 'Limpiar completadas' });
    fireEvent.click(clearBtn);

    expect(screen.queryByText('Limpiame')).not.toBeInTheDocument();
    expect(screen.getByText('No hay tareas')).toBeInTheDocument();
  });
});
