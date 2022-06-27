//This code runs when the page is loaded
window.addEventListener('load',() => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //This code allows for the name(s) entered to be saved as nameInput
    const nameInput = document.querySelector('#name')
    //Allows for the value collected from the id taskForm to be saved as taskForm
    const taskForm = document.querySelector('#taskForm');
//This is an action that gets the username from local storage and saves it as username
// or empty sting
    const username = localStorage.getItem('username') || '';
//Allows the value of nameInput to be saved as username
    nameInput.value = username
//This code allows for the name entered in the form to be saved locally
    nameInput.addEventListener('change', e=>{
        localStorage.setItem('username', e.target.value);
    })
    //Prevents page from refreshing
    taskForm.addEventListener('submit', e=>{
        e.preventDefault();
        //Created an Array called newTasks
        const newTask = {
            content: e.target.elements.content.value,
            done: false,
            createdAt: new Date().getTime()
        }
        //Updates the array
        tasks.push(newTask);
//saves the data in a JSON string
        localStorage.setItem('tasks', JSON.stringify(tasks));
        e.target.reset()
        taskDisplay()
    })
    taskDisplay()
})
//  Function that creates new lines of HTML when a new Task is added, adding the Elements, Classes and names of buttons
function taskDisplay(){
    const taskList = document.querySelector('#taskList')
    taskList.innerHTML = '';

    tasks.forEach(newTask => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('taskItem');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const taskContent = document.createElement('div');
        const actions = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        input.type = 'checkbox';
        input.checked = newTask.done;
        taskContent.classList.add('taskContent');
        deleteBtn.classList.add('delete');
        editBtn.classList.add('edit');
        actions.classList.add('actions');

        taskContent.innerHTML = `<input type="text" value="${newTask.content}" readonly>`;
        editBtn.innerHTML = 'Edit';
        deleteBtn.innerHTML = 'Delete';
//Apending of elements
        label.appendChild(input);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        taskItem.appendChild(label);
        taskItem.appendChild(taskContent);
        taskItem.appendChild(actions);
        taskList.appendChild(taskItem);

// Start of code for changing the status of the task when checked and unchecked
        if (newTask.done){
            taskItem.classList.add('done');
        }
        
        input.addEventListener('click', e =>{
            newTask.done=e.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));

            if(newTask.done){
                taskItem.classList.add('done');
            }
            else{
                taskItem.classList.remove('done');
            }
            taskDisplay();
        })
// ** //
        deleteBtn.addEventListener('click', e=>{
            tasks = tasks.filter(f=> f != newTask);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskDisplay();
        })
        editBtn.addEventListener('click', e => {
            const input = taskContent.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e)=> {
                input.setAttribute('readonly', true);
                newTask.content = e.target.value;
                localStorage.setItem('tasks', JSON.stringify(tasks))
                taskDisplay();
            })
        })
    })


}