const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
let statusApp = "Stop";

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');



renderTask();
renderTime();



form.addEventListener('submit', e => {
    e.preventDefault();
    if (itTask.value !== '') {
        createTask(itTask.value);
        itTask.value = '';
        renderTask();
    }
});

function createTask(value){

    const newTask = {
        id:(Math.random() * 100).toString(36).slice(3),
        title: value,
        completed:false
    };


    tasks.unshift(newTask);
}

function renderTask() {
    const html = tasks.map(task => {
        return `
        <div class="task">
            <div class="completed">${task.completed ? `<span class="done">DONE: </span>` : `<button class="start-button" data-id="${task.id}">Start</button>`}</div>
            <div class= "title">${task.title}</div>
        </div>
        `;
    });    


    const taskContainer = document.querySelector('#tasks');
    taskContainer.innerHTML = html.join('');

    const startButtons = document.querySelectorAll('.task .start-button');

    startButtons.forEach(button => {
        button.addEventListener('click', e => {
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = "In progress...";
            }
        });
    });
}

function startButtonHandler(id) {
    time = 25 * 60;
    current = id;
    const taskId = tasks.findIndex((task) => task.id === id);
    
    document.querySelector('#time #taskname').textContent = tasks[taskId].title;

    timer = setInterval(() => {
        timeHandler(id);
    },1000);
}
    
    function timeHandler(id = null) {
        time--;
        renderTime();

        if (time === 0) {
            renderTask();
            markCompleted(id);
            startBreak();
            clearInterval(timer);
            timer = null;
        }
    }

    function startBreak() {
        time = 5 * 60;
        document.querySelector('#time #taskname').textContent = "Break";
        timerBreak = setInterval(() => {
            timebreakHandler();
        }, 1000);
        

    }

    function timebreakHandler() {
        time--;
        renderTime();

        if (time === 0) {
            clearInterval(timerBreak);
            current = null;
            timerBreak = null;
            document.querySelector('#time #taskname').textContent = "";
            renderTime();
            timer = null;
        }
    }

function markCompleted(id) {
    const taskId = tasks.findIndex((task) => task.id === id);
    tasks[taskId].completed = true;
}

function renderTime() {
    const timeDiv = document.querySelector('#time #value');
    const minutes = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}