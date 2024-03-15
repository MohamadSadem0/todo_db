import axios from "axios";

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getRemoteTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

const addTodo = async (event) => {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  if (!todoText) return;

  try {
    const response = await axios.post("backend/add_todo.php", {
      todo: todoText,
    });
    const newTodo = response.data;

    appendTodoToList(newTodo);
    todoInput.value = "";
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    await axios.post("backend/delete_todo.php", { id: todoId });
    document.getElementById(`todo-${todoId}`).remove();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

const toggleTodoCompletion = async (todoId, isCompleted) => {
  try {
    await axios.post("backend/update_todo.php", {
      id: todoId,
      completed: isCompleted,
    });
    const todoItem = document.getElementById(`todo-${todoId}`);
    todoItem.classList.toggle("completed");
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

const appendTodoToList = (todo) => {
  const todoDiv = document.createElement("div");
  todoDiv.id = `todo-${todo.id}`;
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = todo.text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  completedButton.addEventListener("click", () =>
    toggleTodoCompletion(todo.id, !todo.completed)
  );
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  trashButton.addEventListener("click", () => deleteTodo(todo.id));
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
};

const getRemoteTodos = async () => {
  try {
    const response = await axios.get("backend/get_todos.php");
    const todos = response.data;
    todos.forEach((todo) => appendTodoToList(todo));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const filterTodo = () => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (filterOption.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
      case "incomplete":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
    }
  });
};
