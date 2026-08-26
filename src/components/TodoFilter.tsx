import { type FilterStatus } from "../types/todo";

interface TodoFilterProps {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function TodoFilter({
  currentFilter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: TodoFilterProps) {
  const filters: { key: FilterStatus; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-wrap item-center justify-between gap-3 pt-4 mt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
      {/* Active Items Counter */}
      <span>
        <strong className="font-semibold text-slate-700">{activeCount}</strong>{" "}
        item{activeCount !== 1 ? "s" : ""} left
      </span>

      {/* Filter Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
        {filters.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(key)}
            className={`px-3 py-1 font-medium rounded-md capitalize transition-all ${
              currentFilter === key
                ? "bg-white text-slate-800 shadow-xs"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Clear Completed Button (Only visible if completed tasks exist) */}
      {completedCount > 0 ? (
        <button
          type="button"
          onClick={onClearCompleted}
          className="hover:underline text-slate-400 hover:text-rose-600 transition-colors"
        >
          Clear completed ({completedCount})
        </button>
      ) : (
        <span className="invisible text-xs">Clear completed</span>
      )}
    </div>
  );
}
