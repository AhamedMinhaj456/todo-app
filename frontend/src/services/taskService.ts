import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:8050/api/tasks";


export const createTask = async (title: string, description: string) => {
  const response = await axios.post(
    API_URL,
    { title, description },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};


export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};


export const completeTask = async (id: string) => {
  const response = await axios.put(`${API_URL}/${id}/complete`);
  return response.data;
};