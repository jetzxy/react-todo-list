import { useTodoContext } from "../contexts/TodoContext";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos } = useTodoContext();
  // 1. Empty State: If there are no tasks, show a clean message box
  if (todos.length === 0) {
    return (
      <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-xl">
        <svg
          className="w-12 h-12 mx-auto text-slate-300 mb-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-slate-500 font-medium">No tasks found</p>
      </div>
    );
  }

  // 2. Active List: Map through tasks and render a TodoItem for each one
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
