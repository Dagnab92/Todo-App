//This code runs when the page is loaded
window.addEventListener('load',() => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    //This code allows for the name(s) entered to be saved as nameInput
    const nameInput = document.querySelector('#name')
    //Allows for the 
    const taskForm = document.querySelector('#TaskForm');

    const username = localStorage.getItem('username') || '';
//Allows the value of nameInput to be saved as username
    nameInput.value = username
//This code allows for the name entered in the form to be saved locally
    nameInput.addEventListener('change', e=>{
        localStorage.setItem('username', e.target.value);
    })
    taskForm.addEventListener('submit', e=>{
        e.preventDefault();
    })
})