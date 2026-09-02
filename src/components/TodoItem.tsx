import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { type Todo } from "../types/todo";
import { useTodoContext } from "../contexts/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();
  // Local state to manage edit mode and temporary title text
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // DOM reference to focus the input field automatically when editing starts
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatically focus and  select input text when isEditing become true
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  // Save changes and exit edit mode
  const handleSave = () => {
    editTodo(todo.id, editTitle);
    setIsEditing(false);
  };

  // Keyboard shortcut handlers (Enter to save, Escape to cancel)
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditTitle(todo.title); // Revert back to original title
      setIsEditing(false);
    }
  };

  return (
    <li className="group flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl shadow-xs hover:border-slate-200 transition-all">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Custom Checkbox Button */}
        <button
          type="button"
          onClick={() => toggleTodo(todo.id)}
          className={`flex items-center justify-center w-5 h-5 rounded-md border transition-all ${todo.completed ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 hover:border-slave-400 text-transparent"}`}
          aria-label={
            todo.completed ? "Mark as incomplete" : "Mark as complete"
          }
        >
          <svg
            className="w-3.5 h-3.5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>

        {/* Dynamic Display: Edit Input vs Static text */}
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="flex-1 px-2 py-1 text-slate-800 bg-slate-50 border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 text-sm font-medium truncate cursor-pointer transition-colors ${
              todo.completed ? "line-through text-slate-400" : "text-slate-700"
            }`}
          >
            {todo.title}
          </span>
        )}
      </div>

      {/* Action Button (Edit & Delete) */}
      <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="p-1.5 text-slate-400 hover:text-slave-600 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Edit task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 210.3H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        )}
        <button
          type="button"
          onClick={() => deleteTodo(todo.id)}
          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
          aria-label="Delete task"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
}
