const input = document.querySelector(".input");
const addBtn = document.querySelector(".add-btn");
const listBox = document.querySelector(".list-box");

const loadTodoList = () => {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todoText) => {
    const todo = createTodoElement(todoText);
    listBox.prepend(todo);
  });
};

const createTodoElement = (todoText) => {
  const todo = document.createElement("div");
  todo.classList.add("list");

  const listText = document.createElement("p");
  listText.classList.add("text-hidden");
  listText.innerHTML = todoText;

  const icons = document.createElement("div");
  icons.classList.add("icons");

  const checkIcon = document.createElement("i");
  checkIcon.classList.add("bi", "bi-check-circle-fill");
  const trashIcon = document.createElement("i");
  trashIcon.classList.add("bi", "bi-trash-fill");

  icons.append(checkIcon, trashIcon);
  todo.append(listText, icons);

  listText.addEventListener("click", () => {
    listText.classList.toggle("text-hidden");
  });

  checkIcon.addEventListener("click", () => {
    listText.classList.toggle("checked");
  });

  trashIcon.addEventListener("click", () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const index = todos.indexOf(todoText);
    todos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    todo.remove();
  });

  return todo;
};

const insertList = () => {
  const todoText = input.value.trim();

  if (todoText.length > 0) {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    if (todos.includes(todoText)) {
      alert("Este item já foi adicionado anteriormente.");
      return;
    }

    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));

    const todo = createTodoElement(todoText);
    listBox.prepend(todo);
  }

};

const addNewTodoList = () => {
  if (input.value.length > 0) {
    insertList();
    input.value = "";
  } else {
    alert("Por favor, preencha o campo antes de adicionar um novo item.");
  }
};

const inputKeyEnter = (event) => {
  if (event.key === "Enter") {
    addNewTodoList();
  }
};

input.addEventListener("keydown", inputKeyEnter);
addBtn.addEventListener("click", addNewTodoList);

loadTodoList();

