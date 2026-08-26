interface TodoHeaderProps {
  totalCount: number;
  completedCount: number;
}

export function TodoHeader({ totalCount, completedCount }: TodoHeaderProps) {
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
