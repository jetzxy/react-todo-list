import { useTodoContext } from "../contexts/TodoContext";

export function TodoHeader() {
  const { allTodos, completedCount } = useTodoContext();
  const totalCount = allTodos.length;
  return (
    <header className="mb-6 text-center">
      <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
        Task Manager
      </h1>
      <p className="mt-2 text-sm font-medium text-slate-500">
        {totalCount === 0
          ? "No tasks yet. Enjoy your day!"
          : `${completedCount} of ${totalCount} task${totalCount > 1 ? "s" : ""} competed`}
      </p>
    </header>
  );
}
