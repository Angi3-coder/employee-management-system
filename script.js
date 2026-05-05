// // fetch(resource(url))
// fetch('http://localhost:8000/users')
//     .then(response => response.json()) // converts into bjavascrfipt data
//     .then(data=>{
//         const userList = document.getElementById('userList');

//         data.forEach(user=>{
//             const li = document.createElement('li');
//             li.textContent = user.name;
//             userList.appendChild(li);
//         });
//     })
//     .catch(error => console.error(error));



// fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(response=>response.json())
//     .then(data=> {
//         const postItems = document.getElementById('postItems');

//         data.forEach(post => {
//             const div = document.createElement('div');
//             div.innerHTML = `
//             <h3> ${post.title}</h3>
//             <p> ${post.body}</p>
//             `;
//             postItems.appendChild(div);
//         });
//     })
//     .catch(error=>console.error(error));



// asynchronous code

// async function getData() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/albums');
//     const data = await response.json();

//     const albumList = document.getElementById('albumList');

//     data.forEach(album =>{
//         const li = document.createElement('li');
//         li.textContent = album.title;
//         albumList.appendChild(li);

//     });

// };

// getData();

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


async function getData() {
    const response = await fetch(BASE_URL);
    const data = await response.json();

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
        // editBtn.setAttribute('onclick', openEditForm(employee.id));
        editBtn.onclick = () => openEditForm(employee.id);
        editBtn.textContent = 'Edit';
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger';
        deleteBtn.textContent = 'Delete';
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
}

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
    getData();

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
}