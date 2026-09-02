import { createContext, useContext, type ReactNode } from "react";
import { useTodos } from "../hooks/useTodos";
import type { FilterStatus, Todo } from "../types/todo";

interface TodoContextValue {
  todos: Todo[];
  allTodos: Todo[];
  filter: FilterStatus;
  setFilter: (filter: FilterStatus) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, newTitle: string) => void;
  clearCompleted: () => void;
  toggleAll: (completed: boolean) => void;
  activeCount: number;
  completedCount: number;
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const todoValue = useTodos();

  return <TodoContext value={todoValue}>{children}</TodoContext>;
}
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useContext must be used within TodoProvider");
  }
  return context;
}
