
const showTasksList=()=> {
  tasksList.innerHTML = "";
//change the 
  const list = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(list);
  console.log(localStorage.getItem("tasks"));
  if (list.length === 0) {
    clearAllTasksBtn.disabled = true;

    const element = String.raw`
			<div class="ui icon warning message">
				<i class="inbox icon"></i>
				<div class="content">
					<div class="header">You have nothing task today!</div>
					<div>Enter your tasks today above.</div>
				</div>
			</div>
		`;

    tasksList.style.border = "none";
    return tasksList.insertAdjacentHTML("beforeend", element);
  }

  clearAllTasksBtn.disabled = false;
  tasksList.style.border = "1px solid rgba(34,36,38,.15)";
  list.reverse().forEach((task) => {
    const element = String.raw`
				<li class="ui segment grid equal width">
					<div class="ui checkbox column">
						<input type="checkbox" ${task.completed ? "checked" : ""}>
						<label>${task.text}</label>
					</div>
					<div class="column">
						<i data-id="${task.id}" class="edit outline icon"></i>
						<i data-id="${task.id}" class="trash alternate outline remove icon"></i>
					</div>
				</li>
			`;

    tasksList.insertAdjacentHTML("beforeend", element);
  });


showClearAllTasksModal = () => {
  if (list.length > 0) {
    return $("#clear-all-tasks-modal.modal").modal("show");
  }

  new Noty({
    type: "error",
    text: '<i class="close icon"></i> There is no task to remove.',
    layout: "bottomRight",
    timeout: 2000,
    progressBar: true,
    closeWith: ["click"],
    theme: "metroui",
  }).show();
};

const showRemoveModal = (id) => {
  document
    .querySelector("#remove-button")
    .addEventListener("click", () => removeTask(+id));

  $("#remove-modal.modal").modal("show");
};

const showEditModal =(id)=> {
  const taskIndex = list.findIndex((t) => t.id == id);
  const { text } = list[taskIndex];

  document.querySelector("#edit-modal .content #task-id").value = id;
  document.querySelector("#edit-modal .content #task-text").value = text.trim();
  document
    .querySelector("#update-button")
    .addEventListener("click", () => editTask(+id));

  $("#edit-modal.modal").modal("show");
}
