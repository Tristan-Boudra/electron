const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#flavor');
const emailInput = document.querySelector('#price');
const addButton = document.querySelector('#btn_add');
const modifyButton = document.querySelector('#btn_modify');
const deleteButton = document.getElementById('#btn_delete');
const list = document.querySelector('#myList');
const sectionList = document.querySelector('#list');

const addItemToList = (name, surname, email) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${name}, Flavor: ${surname}, Price: ${email}`;

    const modifyButton = document.createElement('button');
    modifyButton.textContent = 'Modify';
    modifyButton.id = 'btn_modify';
    // modifyButton.addEventListener('click', () => {
    //     modifyItem(listItem);
    // });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = 'btn_delete';
    deleteButton.addEventListener('click', () => {
        deleteRecette();
    });

    listItem.appendChild(modifyButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);
};

const modifyItem = (listItem) => {
    const values = listItem.textContent.split(', ');

    nameInput.value = values[0].split(': ')[1];
    surnameInput.value = values[1].split(': ')[1];
    emailInput.value = values[2].split(': ')[1];

    selectedListItem = listItem;
};

// const deleteItem = (listItem) => {
//     listItem.remove();
// };

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empeche le rechargement de la page

    const name = nameInput.value;
    const surname = surnameInput.value;
    const email = emailInput.value;

    if (selectedListItem) {
        selectedListItem.textContent = `Name: ${name}, Surname: ${surname}, Email: ${email}`;

        nameInput.value = '';
        surnameInput.value = '';
        emailInput.value = '';

        selectedListItem = null;
    } else {
        addItemToList(name, surname, email);

        nameInput.value = '';
        surnameInput.value = '';
        emailInput.value = '';
    }
});


// Connection a l'API
async function api() {
    const res = await fetch("http://127.0.0.1:3000/recette");
    const data = await res.json();
}

api();



// ---------- CRUD recette ----------

// ajouter une recette
async function addRecette() {
    const name = document.getElementById("name").value;
    const flavor = document.getElementById("flavor").value;
    const price = document.getElementById("price").value;
    const recette = { name, flavor, price };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recette),
    };
    const res = await fetch("http://127.0.0.1:3000/recette", options);
    const data = await res.json();
    console.log(data);
}

addRecette();


// Récupérer les recettes
async function getRecette() {
    const res = await fetch("http://127.0.0.1:3000/recette");
    const data = await res.json();
    const list = document.getElementById("myList");
    data.forEach((recette) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Name: ${recette.name}, Flavor: ${recette.flavor}, Price: ${recette.price}`;
        list.appendChild(listItem);
        
        const modifyButton = document.createElement('button');
        modifyButton.textContent = 'Modify';
        modifyButton.id = 'btn_modify';
        modifyButton.addEventListener('click', () => {
            modifyRecette(listItem);
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.id = 'btn_delete';
        deleteButton.addEventListener('click', () => {
            // deleteItem(listItem);
            deleteRecette();
        });
        
        listItem.appendChild(modifyButton);
        listItem.appendChild(deleteButton);
    });
}

getRecette();

// Modifier une recette
async function modifyRecette() {
    const name = document.getElementById("name").value;
    const flavor = document.getElementById("flavor").value;
    const price = document.getElementById("price").value;
    const recette = { name, flavor, price };
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recette),
    };
    const res = await fetch("http://127.0.0.1:3000/recette", options);
    const data = await res.json();
    console.log(data);
}

modifyRecette();

// Supprimer une recette quand on appuie sur le boutton delete
async function deleteRecette() {
    const name = document.getElementById("name").value;
    const flavor = document.getElementById("flavor").value;
    const price = document.getElementById("price").value;
    const recette = { name, flavor, price };
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recette),
    };
    const res = await fetch("http://127.0.0.1:3000/recette/${id}", options);
    const data = await res.json();
    console.log(data);
}