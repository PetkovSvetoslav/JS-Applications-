async function solve(){

const url = `http://localhost:3030/jsonstore/collections/students`;
const table = document.querySelector('#results tbody');
const res = await fetch(url);
const data = await res.json();

Object.values(data).forEach(s => {
const firstName = s.firstName;
const lastName = s.lastName;
const facultyNumber = s.facultyNumber;
const grade = Number(s.grade);

const tr = document.createElement('tr');
tr.setAttribute('id',s._id);
const firstNameCell = tr.insertCell(0);
firstNameCell.innerText = firstName;

const lastNameCell = tr.insertCell(1);
lastNameCell.innerText = lastName;

const facultyNumberCell = tr.insertCell(2);
facultyNumberCell.innerText = facultyNumber;

const gradeCell = tr.insertCell(3);
gradeCell.innerText = grade;

const delBtn = document.createElement('button');
delBtn.innerText = 'delete';
delBtn.style.width = '100%';
delBtn.addEventListener('click', delteStudent);

const delBtnCell = tr.insertCell(4);
delBtnCell.appendChild(delBtn);

table.appendChild(tr);
});

 async function delteStudent(ev){

    const id = ev.target.parentNode.parentNode.id;
    ev.target.parentNode.remove;
    const deleteResponse = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
  
 }


const submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', onClickSubmit);

async function onClickSubmit(ev){
    ev.preventDefault();
const firstNameInput = document.getElementsByName('firstName')[0];
const lastNameInput = document.getElementsByName('lastName')[0];
const facultyNameInput = document.getElementsByName('facultyNumber')[0];
const gradeInput = document.getElementsByName('grade')[0];

// const inputsArray = document.querySelectorAll('.inputs input');
// Array.from(inputsArray.map(input => {input.setAttribute('required', '')}));

if(isNaN(gradeInput.value)) {
    return alert('Wrong input data!');
}
if(facultyNameInput.value !== '' && gradeInput !== '' && lastNameInput !== '' && firstNameInput !== ''){
const respose = await fetch(url,{
method: 'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify({
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    facultyNumber: Number(facultyNameInput.value),
grade: Number(gradeInput.value),
})
});

const tr = document.createElement('tr');
const firstNameCell = tr.insertCell(0);
firstNameCell.innerText = firstNameInput.value;

const lastNameCell = tr.insertCell(1);
lastNameCell.innerText = lastNameInput.value;

const facultyNumberCell = tr.insertCell(2);
facultyNumberCell.innerText = facultyNameInput.value;

const gradeCell = tr.insertCell(3);
gradeCell.innerText = gradeInput.value;

table.appendChild(tr);
}
firstNameInput.value = '';
lastNameInput.value = '';
facultyNameInput.value = '';
gradeInput.value = '';


}



}
solve()