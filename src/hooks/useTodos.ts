import { useState, useEffect} from "react";
import { type Todo, type FilterStatus } from "../types/todo";


const STORAGE_KEY = "todo_app_tasks_v1";

export function useTodos() {
    
    //Lazy State Initialization (useState)
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return [];
        try {
            return JSON.parse(saved) as Todo[];
        } catch (error) {
            console.error('Failed to parse todos from localStorage', error);
            return [];
        }
    });

    const [filter, setFilter] = useState<FilterStatus>("all");

    // Automatically save the current lists of tasks to localStorage whenever todos changes.
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }, [todos])

    // addTodo(title:string) - Business Logic/CRUD Functions
    const addTodo = (title: string) => {
        const trimmedTitle = title.trim();
        if(!trimmedTitle) return; // Guard clause: ignore empty/whitespace input

        const newTodo: Todo = {
            id: crypto.randomUUID(), // Generate a unique string like "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"
            title: trimmedTitle,
            completed: false,
            createAt: Date.now(),
        };

        setTodos((prev) => [newTodo, ...prev]); // Prepend new task to top of list
    }

    // toggleTodo(id: string) - Flips completed between true and false for the task matching id
    const toggleTodo = (id: string) => {
        setTodos((prev) => 
            prev.map((todo) => 
                todo.id === id ? {...todo, completed: !todo.completed} : todo
            )
        );
    }

    // deleteTodo(id: string) - Removes a task from the array
    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    // editTodo(id:string, newTitle: string) - Updates the task title text
    const editTodo = (id: string, newTitle: string) => {
        const trimmed = newTitle.trim();
        if(!trimmed) {
            deleteTodo(id) // If user edited text to empty string, treat it as delete!
            return;
        }

        setTodos((prev) =>
            prev.map((todo) => 
                todo.id === id ? {...todo, title: trimmed} : todo
            )
        );
    }

    // clearCompleted() - Bulk deletes all completed tasks in one click. Filter out any item where completed is true.
    const clearCompleted = () => {
        setTodos((prev) => prev.filter((todo) => !todo.completed));
    }

    // toggleAll - Marks all tasks as either completed or active simultaneously
    const toggleAll = (completed: boolean) => {
        setTodos((prev) => prev.map((todo) => ({...todo, completed})));
    }

    // Dynamically compute which tasks to show based on selected filter tab (all, active, completed)
    const filteredTodos = todos.filter((todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true; //all
    });

    // Statistics
    const activeCount = todos.filter((t) => !t.completed).length; // Number of pending tasks (for the "3 item left" counter)
    const completedCount = todos.length - activeCount; // Number of finish tasks

    return {
        todos: filteredTodos,
        allTodos: todos,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        clearCompleted,
        toggleAll,
        activeCount,
        completedCount,
    };
}