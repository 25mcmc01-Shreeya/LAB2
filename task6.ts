// Enum for task status
enum TaskStatus {
    Pending,
    Completed
}

// Task class
class Task {
    text: string;
    dueDate: Date | null;
    status: TaskStatus;

    constructor(text: string, dueDate: Date | null) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = TaskStatus.Pending;
    }

    toggleStatus(): void {
        this.status =
            this.status === TaskStatus.Pending
                ? TaskStatus.Completed
                : TaskStatus.Pending;
    }
}

// Task list and filter
let tasks: Task[] = [];
let currentFilter: "all" | "pending" | "completed" = "all";

// Add task
function addTask(): void {
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const dueInput = document.getElementById("dueDate") as HTMLInputElement;

    if (taskInput.value === "") {
        alert("Please enter a task");
        return;
    }

    const dueDate = dueInput.value ? new Date(dueInput.value) : null;

    tasks.push(new Task(taskInput.value, dueDate));

    taskInput.value = "";
    dueInput.value = "";

    renderTasks();
}

// Toggle task
function toggleTask(index: number): void {
    tasks[index].toggleStatus();
    renderTasks();
}

// Delete task
function deleteTask(index: number): void {
    tasks.splice(index, 1);
    renderTasks();
}

// Set filter
function setFilter(filter: "all" | "pending" | "completed"): void {
    currentFilter = filter;
    renderTasks();
}

// Render tasks
function renderTasks(): void {
    const taskList = document.getElementById("taskList") as HTMLUListElement;
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(t => t.status === TaskStatus.Completed);
    } else if (currentFilter === "pending") {
        filteredTasks = tasks.filter(t => t.status === TaskStatus.Pending);
    }

    // Sort by due date
    filteredTasks.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return a.dueDate.getTime() - b.dueDate.getTime();
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.status === TaskStatus.Completed) {
            li.classList.add("completed");
        }

        const info = document.createElement("div");
        info.className = "task-info";

        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;

        const dateSmall = document.createElement("small");
        if (task.dueDate) {
            dateSmall.textContent = "Due: " + task.dueDate.toDateString();
        }

        info.appendChild(textSpan);
        info.appendChild(dateSmall);

        const buttons = document.createElement("div");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "✔";
        completeBtn.onclick = () => toggleTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "✖";
        deleteBtn.onclick = () => deleteTask(index);

        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(info);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });
}
