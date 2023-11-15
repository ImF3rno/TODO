window.addEventListener('load', () => {
    loadTasks();
});
function addTodo(){
    const subjectInput=document.querySelector('.subject');
    const subject=subjectInput.value;
    const priority=document.querySelector('.priority').value;
    const dueDate=document.querySelector('.dueDate').value;
    if(!subject.trim()){
        alert('Subject cannot be empty!');
        return;
    }
    const newRow=document.createElement('tr');
    let priorityClass = '';
    switch(priority) {
        case 'low':
            priorityClass='badge bg-success';
            break;
        case 'medium':
            priorityClass='badge bg-info';
            break;
        case 'high':
            priorityClass='badge bg-danger';
            break;
    }
    newRow.innerHTML = `
        <td>
            <span class="subjectIcon" onclick="toggleSubjectIcon(this)"><img src="svg/check-mark-black-outline-svgrepo-com.svg" alt="check-mark">${subject}</span>
        </td>
        <td class="${priorityClass}">${priority}</td>
        <td>${dueDate}</td>
        <td>New</td>
        <td>
            <div class="progress">
                <div id="progress-bar" class="progress-bar bg-success" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </td>
        <td></td>
        <td><img src="svg/remove-round-svgrepo-com.svg" alt="remove" onclick="removeRow(this)"></td>
    `;
    saveTaskToLocalStorage(subject,priority,dueDate);
    document.getElementById('todoTable').getElementsByTagName('tbody')[0].appendChild(newRow);
    document.querySelector('.subject').value='';
    document.querySelector('.priority').value='low';
    document.querySelector('.dueDate').value='';
}
function removeRow(button){
    const row=button.parentNode.parentNode;
    const subject=row.querySelector('.subjectIcon').innerText;
    removeTaskFromLocalStorage(subject);
    row.parentNode.removeChild(row);
}
function toggleSubjectIcon(clickedElement){
    const subjectIcon=clickedElement.querySelector('img');
    if(subjectIcon.src.includes('svg/check-mark-black-outline-svgrepo-com.svg')) {
        subjectIcon.src='svg/check-circle-svgrepo-com.svg';
    }
}
function saveTaskToLocalStorage(subject,priority,dueDate){
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({subject,priority,dueDate});
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function removeTaskFromLocalStorage(subject) {
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    const index=tasks.findIndex(task=>task.subject===subject);
    if (index!==-1){
        tasks.splice(index,1);
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
function loadTasks(){
    const tasks=JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task=>{
        const newRow=document.createElement('tr');
        let priorityClass='';
        switch (task.priority){
            case 'low':
                priorityClass='badge bg-success';
                break;
            case 'medium':
                priorityClass='badge bg-info';
                break;
            case 'high':
                priorityClass='badge bg-danger';
                break;
        }
        newRow.innerHTML = `
            <td>
                <span class="subjectIcon" onclick="toggleSubjectIcon(this)"><img src="svg/check-mark-black-outline-svgrepo-com.svg" alt="check-mark">${task.subject}</span>
            </td>
            <td class="${priorityClass}">${task.priority}</td>
            <td>${task.dueDate}</td>
            <td>New</td>
            <td>
                <div class="progress">
                    <div id="progress-bar" class="progress-bar bg-success" role="progressbar" style="width:0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </td>
            <td></td>
            <td><img src="svg/remove-round-svgrepo-com.svg" alt="remove" onclick="removeRow(this)"></td>
        `;
        document.getElementById('todoTable').getElementsByTagName('tbody')[0].appendChild(newRow);
    });
}