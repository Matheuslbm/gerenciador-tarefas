import { TaskManager } from "./taskManager.js";

const taskManager = new TaskManager();
const listaTarefas = document.querySelector('#lista-tarefas');
const inputNovaTarefa = document.querySelector('#nova-tarefa');
const botaoAdicionarTarefa = document.querySelector('#adicionar-tarefa');

let filtroAtivo = 'todas';

function renderTasks() {
    listaTarefas.innerHTML = '';
    const tasks = taskManager.getTasks();

    tasks
    .filter(task => {
        if (filtroAtivo === 'concluidas') return task.completed;
        if (filtroAtivo === 'naoConcluidas') return !task.completed;
        return true; // se filtro todas
    })
    .forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.title;

        const btnToggle = document.createElement('button');
        btnToggle.textContent = task.completed ? 'OK!' : 'Concluir'
        btnToggle.addEventListener('click', () => {
            taskManager.toggleTaskCompleted(index);
            renderTasks();
        });

        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Excluir';
        btnDelete.addEventListener('click', () => {
            taskManager.removeTask(index);
            renderTasks();
        });

        const btnEdit = document.createElement('button');
        btnEdit.textContent = 'Editar';
        btnEdit.addEventListener('click', () => {
            const newTitle = prompt('Digite o novo título da tarefa:', task.title)
            if(newTitle) {
                taskManager.editTask(index, newTitle);
            }
            renderTasks();
        })

        li.appendChild(btnToggle);
        li.appendChild(btnDelete);
        li.appendChild(btnEdit);
        listaTarefas.appendChild(li);
    })
}

document.getElementById('filtro-todas').addEventListener('click', () => {
    filtroAtivo = 'todas';
    renderTasks();
})

document.getElementById('filtro-concluidas').addEventListener('click', () => {
    filtroAtivo = 'concluidas';
    renderTasks();
})

document.getElementById('filtro-nao-concluidas').addEventListener('click', () => {
    filtroAtivo = 'naoConcluidas';
    renderTasks();
})


botaoAdicionarTarefa.addEventListener('click', () => {
    const taskTitle = inputNovaTarefa.value.trim();
    if (taskTitle) {
        taskManager.addTask(taskTitle);
        inputNovaTarefa.value = '';
        renderTasks();
    }
});

renderTasks()