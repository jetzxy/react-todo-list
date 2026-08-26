import { TodoForm } from "./components/TodoForm";
import { TodoHeader } from "./components/TodoHeader";
import { useTodos } from "./hooks/useTodos";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";

function App() {
  // Call our custom hook from step
  const {
    todos,
    allTodos,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    filter,
    setFilter,
    clearCompleted,
    activeCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Header with Stats */}
            <TodoHeader
              totalCount={allTodos.length}
              completedCount={completedCount}
            />

            {/* Add New Task Form */}
            <TodoForm onAddTodo={addTodo} />

            {/* Task List */}
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />

            {/* Filter Tabs & Actions */}
            <TodoFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={clearCompleted}
            />
          </div>
        </div>

        {/* Footer Credits */}
        <footer className="mt-8 text-center text-sm text-slate-400">
          <p>
            Double-click to edit a task • Built with React + TypeScript +
            Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
