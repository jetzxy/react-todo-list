import { TodoForm } from "./components/TodoForm";
import { TodoHeader } from "./components/TodoHeader";
import { TodoItem } from "./components/TodoItem";
import { useTodos } from "./hooks/useTodos";

function App() {
  // Call our custom hook from step
  const { todos, allTodos, completedCount, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
        {/* Render TodoHeader and pass down the counts */}
        <TodoHeader
          totalCount={allTodos.length}
          completedCount={completedCount}
        />

        {/* Connect addTodo function */}
        <TodoForm onAddTodo={addTodo} />

        {/* Todo items list */}
        {todos.length > 0 && (
          <ul className="space-y-2.5">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

