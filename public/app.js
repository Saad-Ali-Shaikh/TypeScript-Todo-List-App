var Task = (function () {
    function Task() {
        this.TaskStatus = false;
    }
    return Task;
}());
var tasks = new Array();
window.onload = function () {
    var btnSave = document.getElementById('btnSaveTask');
    btnSave.onclick = function () { saveTask(btnSave); };
    var btnClear = document.getElementById('btnClearTask');
    btnClear.onclick = function () { clearForm(); };
};
function saveTask(btnSave) {
    var tasksub = document.getElementById("txtTaskSubject");
    var TaskDesc = document.getElementById("txtTaskDescription");
    var task = new Task();
    if (parseInt(btnSave.title) > 0) {
        task.TaskId = parseInt(btnSave.title);
        deleteTask(task.TaskId);
    }
    else {
        task.TaskId = tasks != null && tasks.length > 0 && typeof (tasks) !== 'undefined' ? tasks.length + 1 : 1;
    }
    task.tasksubject = tasksub.value;
    task.TaskDescription = TaskDesc.value;
    console.log(task.tasksubject);
    console.log(task.TaskDescription);
    if (task.tasksubject != '' || task.TaskDescription != '') {
        tasks.push(task);
        clearForm();
        showtasks();
    }
    else {
        alert('Please provide some information!');
    }
}
function deleteTask(TaskId) {
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].TaskId == TaskId) {
            tasks.splice(i, 1);
            showtasks();
        }
    }
}
function editTask(TaskId) {
    if (confirm('Do you want to edit this todo item?')) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].TaskId == TaskId) {
                loadTask(tasks[i]);
            }
        }
    }
}
function completeTask(TaskId) {
    if (confirm('Do you want to complete this todo item?')) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].TaskId == TaskId) {
                tasks[i].TaskStatus = true;
                showtasks();
            }
        }
    }
}
function loadTask(Task) {
    var tasksub = document.getElementById("txtTaskSubject");
    var TaskDesc = document.getElementById("txtTaskDescription");
    tasksub.value = Task.tasksubject;
    TaskDesc.value = Task.TaskDescription;
    var btnSave = document.getElementById('btnSaveTask');
    btnSave.title = Task.TaskId.toString();
}
function showtasks() {
    cleartasks();
    if (tasks != null && tasks.length > 0) {
        tasks.sort();
        for (var i = 0; i < tasks.length; i++) {
            printTask(tasks[i]);
        }
    }
}
function cleartasks() {
    var savedtasks = document.getElementById("SavedTasks");
    var old_tbody = savedtasks.tBodies[0]; //.innerHTML = "";
    var new_tbody = document.createElement('tbody');
    savedtasks.replaceChild(new_tbody, old_tbody);
}
function clearForm() {
    var tasksub = document.getElementById("txtTaskSubject");
    var TaskDesc = document.getElementById("txtTaskDescription");
    tasksub.value = "";
    TaskDesc.value = "";
    var btnSave = document.getElementById('btnSaveTask');
    btnSave.title = "0";
}
function printTask(Task) {
    var savedtasks = document.getElementById("SavedTasks");
    var tasksubCol = document.createElement("td");
    var TaskDescCol = document.createElement("td");
    var TaskCommandCol = document.createElement("td");
    var TaskEditButton = document.createElement("button");
    var TaskDeleteButton = document.createElement("button");
    var TaskCompleteButton = document.createElement("button");
    TaskEditButton.id = Task.TaskId.toString();
    TaskDeleteButton.id = Task.TaskId.toString();
    TaskCompleteButton.id = Task.TaskId.toString();
    TaskEditButton.innerText = "Edit";
    TaskDeleteButton.innerText = "Delete";
    TaskCompleteButton.innerText = "Complete";
    TaskEditButton.onclick = function () { editTask(Task.TaskId); };
    TaskDeleteButton.onclick = function () {
        if (confirm('Do you want to delete this todo item?')) {
            deleteTask(Task.TaskId);
        }
    };
    TaskCompleteButton.onclick = function () { completeTask(Task.TaskId); };
    TaskCommandCol.width = "200px";
    TaskCommandCol.appendChild(TaskEditButton);
    TaskCommandCol.appendChild(TaskDeleteButton);
    TaskCommandCol.appendChild(TaskCompleteButton);
    var TaskIdSpan = document.createElement("span");
    TaskIdSpan.hidden = true;
    TaskIdSpan.innerHTML = "" + Task.TaskId;
    tasksubCol.width = "300px";
    tasksubCol.appendChild(TaskIdSpan);
    var tasksubSpan = document.createElement("span");
    tasksubSpan.innerHTML = Task.tasksubject;
    tasksubCol.appendChild(tasksubSpan);
    var TaskDescSpan = document.createElement("span");
    TaskDescSpan.innerHTML = Task.TaskDescription;
    TaskDescCol.width = "300px";
    TaskDescCol.appendChild(TaskDescSpan);
    var TaskRow = document.createElement("tr");
    TaskRow.insertCell(0).appendChild(tasksubCol);
    TaskRow.insertCell(1).appendChild(TaskDescCol);
    TaskRow.insertCell(2).appendChild(TaskCommandCol);
    if (Task.TaskStatus === true) {
        TaskRow.className = "completed";
    }
    savedtasks.tBodies[0].appendChild(TaskRow);
}
