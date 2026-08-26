import { useState, type SubmitEvent } from "react";

interface TodoFormProps {
  onAddTodo: (title: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  // Local state for what the user is currently typing
  const [title, setTitle] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault(); //Stop default full-page refresh
    if (!title.trim()) return; //Don't allow empty or space-only tasks

    onAddTodo(title.trim());
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit} className="relative mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full py-3.5 pl-4 pr-24 text-slate-800 bg-white border border-slate-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="absolute right-2 top-2 bottom-2 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
      >
        <span>Add</span>
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </form>
  );
}
