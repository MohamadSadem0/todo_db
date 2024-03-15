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
