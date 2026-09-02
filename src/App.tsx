import { TodoForm } from "./components/TodoForm";
import { TodoHeader } from "./components/TodoHeader";
import { TodoList } from "./components/TodoList";
import { TodoFilter } from "./components/TodoFilter";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Header with Stats */}
              <TodoHeader />

              {/* Add New Task Form */}
              <TodoForm />

              {/* Task List */}
              <TodoList />

              {/* Filter Tabs & Actions */}
              <TodoFilter />
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
    </TodoProvider>
  );
}

export default App;
