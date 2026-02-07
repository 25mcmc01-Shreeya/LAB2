// Enum for task status
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Pending"] = 0] = "Pending";
    TaskStatus[TaskStatus["Completed"] = 1] = "Completed";
})(TaskStatus || (TaskStatus = {}));
// Task class
var Task = /** @class */ (function () {
    function Task(text, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }
    Task.prototype.toggleStatus = function () {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    };
    return Task;
}());
// Task list and filter
var tasks = [];
var currentFilter = "all";
// Add task
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var dueInput = document.getElementById("dueDate");
    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }
    var dueDate = dueInput.value ? new Date(dueInput.value) : null;
    tasks.push(new Task(taskInput.value, dueDate));
    taskInput.value = "";
    dueInput.value = "";
    renderTasks();
}
// Toggle task
function toggleTask(index) {
    tasks[index].toggleStatus();
    renderTasks();
}
// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
// Set filter
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}
// Render tasks
function renderTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    var filteredTasks = tasks;
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function (t) { return t.status === TaskStatus.Completed; });
    }
    else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(function (t) { return t.status === TaskStatus.Pending; });
    }
    // Sort by due date
    filteredTasks.sort(function (a, b) {
        if (!a.dueDate)
            return 1;
        if (!b.dueDate)
            return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
    });
    filteredTasks.forEach(function (task, index) {
        var li = document.createElement("li");
        if (task.status === TaskStatus.Completed) {
            li.classList.add("completed");
        }
        var info = document.createElement("div");
        info.className = "task-info";
        var textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        var dateSmall = document.createElement("small");
        if (task.dueDate) {
            dateSmall.textContent = "Due: " + task.dueDate.toDateString();
        }
        info.appendChild(textSpan);
        info.appendChild(dateSmall);
        var buttons = document.createElement("div");
        var completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.onclick = function () { return toggleTask(index); };
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.onclick = function () { return deleteTask(index); };
        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);
        li.appendChild(info);
        li.appendChild(buttons);
        taskList.appendChild(li);
    });
}
