// Document Imports
const body = document.getElementById('body');
const alert = document.getElementById('alert');
const form = document.getElementById('add-form');

let index = 1;
let list = [];

let edit = false;
let editPos = 0;

const main = {
    add(content) {
        let text = content;
        if (edit) {
            list[editPos] = { activity: text, position: editPos, classname: 'to-do' };
            edit = false;
            pos = 0;
            this.list();
            this.triggerAlert("Task edited successfully!", "alert-success");
        } else {
            list[list.length] = { activity: text, position: index, classname: 'to-do' };
            index++;
            this.list();
            this.triggerAlert("Task added successfully!", "alert-info");
        }
    },
    list() {
        body.innerHTML = '';
        for (let i = 0; i < list.length; i++) {
            this.createlist(list[i].activity, list[i].position, list[i].classname, i);
        }
    },
    createlist(activity, index, classname, iNumber) {
        body.innerHTML += `
            <article class="${classname}" position="${iNumber}">
                <div class="select">
                    <span class="circle" onclick="main.completeTask(${iNumber})"></span>
                </div>
                <div class="content">
                    <p class="text">
                        ${activity}
                    </p>
                </div>
                <div class="actions">
                    <button class="btn btn-delete" onclick="main.deleteTask(${iNumber})">Delete</button>
                    <button class="btn btn-edit" onclick="main.editTask(${iNumber}, '${activity}')">Edit</button>
                </div>
            </article>
        `;
    },
    completeTask(pos) {
        document.getElementsByClassName('to-do')[pos].classList.toggle('completed');
        // this.list();
    },
    deleteTask(pos) {
        let newPos = pos;
        list.splice(newPos, 1);
        this.list();
        this.triggerAlert("Task deleted successfully!", "alert-warning");
    },
    editTask(pos, text) {
        editPos = pos;
        edit = true;
        form.add.value = text;
    },
    triggerAlert(msg, classname) {
        alert.classList = `alert ${classname}`;
        const alertMsg = document.getElementById('alert-msg');
        alertMsg.innerHTML = msg;
        alert.style.opacity = 1;
        setTimeout(() => {
            alert.style.opacity = 0;
        }, 3000);
    }
}

// Recieving the input event
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = form.add.value;
    form.reset();
    main.add(text);
});

main.list();