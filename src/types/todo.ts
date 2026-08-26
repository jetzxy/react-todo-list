export type FilterStatus = "all" | "active" | "completed";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createAt: number;
}