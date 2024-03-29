const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

let userId = 1;
baseurl = "http://localhost/todo_db/get_all.php?user_id=1";

const showAll = async () => {
  try {
    const response = await axios.get(baseurl);
    console.log(response.data);
    const tasks = response.data;
    console.log(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const addTodo = async (event) => {
  event.preventDefault();

  const todoText = todoInput.value;
  if (!todoText) return;

  try {
    const response = await axios.post(//mesh aam tozabat axios
      "http://localhost/todo_db/add_todo.php?title=titlewqe&id=1",
      {
        "user_id": userId, // to be fixed when fix login
        "title": todoText,
        "is_completed":0
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newTodo = response.data;

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodoElement = document.createElement("li");
    newTodoElement.innerText = newTodo.title;
    newTodoElement.classList.add("todo-item");
    todoDiv.appendChild(newTodoElement);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
  } catch (error) {
    console.error(error);
    console.log(error.response.data);
  }
};

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
function deleteCheck(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    const taskId = userId;

    axios
      .delete(`todo_db/delete_task/${taskId}`)
      .then(() => {
        todo.classList.add("slide");

        todo.addEventListener("transitionend", function () {
          todo.remove();
        });
      })
      .catch((error) => console.error(error));
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

const getLocalTodos = async () => {
  try {
    const response = await axios.get(`todo_db/get_all?user_id=${userId}`);

    response.data.forEach((todo) => {});
  } catch (error) {
    console.error(error);
  }
};

function removeLocalTodos(todo) {
  const taskId = taskId;

  axios
    .delete(`todo_db/delete_task/${taskId}`)
    .then(() => {
      let todos = JSON.parse(localStorage.getItem("todos"));
      const todoIndex = todo.children[0].innerText;
      todos.splice(todos.indexOf(todoIndex), 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    })
    .catch((error) => console.error(error));
}
