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
    let priorityClass='';
    switch (priority){
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
    newRow.innerHTML=`
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

    let tasks={
        subjectName: document.querySelector('.subject').value,
        priorityName: document.querySelector('.priority').value,
        dueDateName: document.querySelector('.dueDate').value
    };

    localStorage.setItem('All-Data', JSON.stringify(tasks))
    console.log(JSON.parse(localStorage.getItem('All-Data')));

    document.getElementById('todoTable').getElementsByTagName('tbody')[0].appendChild(newRow);
    document.querySelector('.subject').value='';
    document.querySelector('.priority').value='low';
    document.querySelector('.dueDate').value='';
}

// document.querySelector('form').addEventListener('click',(e)=>{
//     e.preventDefault();
//     tasks.push({
//         subjectName:document.querySelector('.subject').value,
//         priorityName: document.querySelector('.priority').value,
//         dueDateName: document.querySelector('.dueDate').value
//     });
//     localStorage.setItem('tasks',JSON.stringify(tasks))
// })
// console.log(JSON.parse(localStorage.getItem('tasks')));

function removeRow(button){
    const row=button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function toggleSubjectIcon(clickedElement){
    const subjectIcon=clickedElement.querySelector('img');
    if(subjectIcon.src.includes('svg/check-mark-black-outline-svgrepo-com.svg')){
        subjectIcon.src='svg/check-circle-svgrepo-com.svg';
    }
}


/** 
 * 
 * ROADMAP:
 * 1. Prideti task'a:
 * - Task'as sukuriamas localStorage
 * 2. Atvaizduojamas task'us:
 * - Task'ai ivedami TODO liste is localStorage
 * 3. Salinti task'a:
 * - Task'ai salinami is localStorage
 * 4. Task' update (prioritetas, progresas):
 * - Atnaujinami duomenys esantys localStorage
 * 
 */
