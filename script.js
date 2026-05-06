
// fetch('http://localhost:3000/employees')
//     .then(response => response.json())
//     .then(data => {

//         const tableBody = document.getElementById('empTable');

//         data.forEach(employee => {
//             const row = document.createElement('tr');

//             const idcell = document.createElement('td');
//             idcell.textContent = employee.id;

//             const namecell = document.createElement('td');
//             namecell.textContent = employee.name;

//             const deptcell = document.createElement('td');
//             deptcell.textContent = employee.dept;

//             const salarycell = document.createElement('td');
//             salarycell.textContent = employee.salary;

//             const activecell = document.createElement('td');
//             activecell.textContent = employee.active;

//             row.appendChild(idcell);
//             row.appendChild(namecell);
//             row.appendChild(deptcell);
//             row.appendChild(salarycell);
//             row.appendChild(activecell);

//             tableBody.appendChild(row);

//         });

//     })
// .catch(error => console.error(error));

//API base url - jason-server is running in port 3000
const BASE_URL = 'http://localhost:3000/employees';
let employees = [];


async function getData() {
    const response = await fetch(BASE_URL);
    employees = await response.json();

    renderTable(employees);
}

function renderTable(data){
    const tableBody = document.getElementById('empTable');

    data.forEach(employee => {
        const row = document.createElement('tr');

        const idcell = document.createElement('td');
        idcell.textContent = employee.id;

        const namecell = document.createElement('td');
        namecell.textContent = employee.name;

        const deptcell = document.createElement('td');
        deptcell.textContent = employee.dept;

        const salarycell = document.createElement('td');
        salarycell.textContent = employee.salary;

        const activecell = document.createElement('td');
        activecell.textContent = employee.active;

        const activityrow = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.className = 'btn btn-success';
        editBtn.type= 'button';
        // editBtn.setAttribute('onclick', openEditForm(employee.id));
        editBtn.onclick = () => openEditForm(employee.id);
        editBtn.textContent = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.type= 'button';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick= ()=>handleDelete(employee.id);
        activityrow.appendChild(editBtn);
        activityrow.appendChild(deleteBtn);


        row.appendChild(idcell);
        row.appendChild(namecell);
        row.appendChild(deptcell);
        row.appendChild(salarycell);
        row.appendChild(activecell);
        row.appendChild(activityrow);

        tableBody.appendChild(row);
    });
};

getData();


/* 
CRUD FUNCTIONALITIES
C - CREATE -  create a new resource - form  -POST
R - READ - access a resource                -GET
U - UPDATE - edit a resource - form         -PATCH/PUT
D - DELETE - remove a resource              -DELETE

/*
POST (CREATE)- adding a new employee
*/
const showForm = document.getElementById('showForm');
showForm.addEventListener('click', function(){
    const addCard =document.getElementById('addCard');
    addCard.classList.toggle('d-none');
    if (addCard.classList.contains('d-none')){
        showForm.textContent = ' + New Employee';
    }else{
        showForm.textContent = 'close';
    }
});

const form = document.getElementById('addForm');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event){
    //prevent page reload
    event.preventDefault();

    const newEmployee = {
        name: document.getElementById('nameInput').value,
        dept: document.getElementById('deptInput').value,
        salary: Number(document.getElementById('salaryInput').value),
        // active: document.getElementById('active').value
        active: true // new employee default to active
    };
    
    fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // tells server the body is JSON. Without it, the server may not parse
        },
        body: JSON.stringify(newEmployee) // converts the JS object to JSON string so it can travel over the internet
    });

    // form.reset();
    event.target.reset();

}

/*
UPDATE 
    1. add edit button
    2. button to either open up an edit form or prefill the current form
    3. handle Update 

*/

function openEditForm(id){
    fetch(`${BASE_URL}/${id}`)
        .then(res=>res.json())
        .then(data => {
            //populate the edit form
            console.log(data);
            document.getElementById('editId').value = data.id;
            document.getElementById('editName').value= data.name;
            document.getElementById('editDept').value= data.dept;
            document.getElementById('editSalary').value= data.salary;
            document.getElementById('editActive').value= data.active;
            
            // show edit form
            document.getElementById('editCard').classList.remove('d-none');

            // scroll to edit form
            document.getElementById('editCard').scrollIntoView({behavior: 'smooth'});


        })
}

const editForm = document.getElementById('editForm');

editForm.addEventListener('submit', handleEdit);

function handleEdit(e){
    e.preventDefault();

    const id = document.getElementById('editId').value

    const updatedData = {
        name: document.getElementById('editName').value,
        dept: document.getElementById('editDept').value,
        salary: Number(document.getElementById('editSalary').value),
        active: document.getElementById('editActive').value === 'true' 
        // JSON.parse(), Boolean()
    }

    fetch(`${BASE_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    });
    console.log(response.ok);
    //hide edit form
    document.getElementById('editCard').classList.add('d-none');
}

// CANCEL EDIT
document.getElementById('cancelEdit').addEventListener('click', function(){
    editForm.reset();
    document.getElementById('editCard').classList.add('d-none');
});


/*
DELETE - Remove a resource

*/

function handleDelete(id){
    //always confirm before deleting
    const confirmed = confirm('Are you sure you want to delete this employee?');

    if (!confirmed) return;

    fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
        //No headers or body needed for a DELETE request
    });

}

// SEARCH 

document.getElementById('searchInput').addEventListener('input', function(e){
    const value = e.target.value.toLowerCase();
    
    const filteredData = employees.filter(emp => 
        emp.name.toLowerCase().includes(value) || emp.dept.toLowerCase().includes(value)
    );
    console.log(filteredData);
})