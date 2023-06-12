async function api() {
    const res = await fetch("http://127.0.0.1:3000/recette");
    const data = await res.json();
}

api();

const form = document.querySelector('.form');
const nameInput = document.querySelector('#name');
const surnameInput = document.querySelector('#flavor');
const emailInput = document.querySelector('#price');
const addButton = document.querySelector('#btn_add');
const modifyButton = document.querySelector('#btn_modify');
const deleteButton = document.querySelector('#btn_delete');
const list = document.querySelector('#myList');
const sectionList = document.querySelector('#list');

let selectedListItem = null;

const addItemToList = (name, surname, email) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Name: ${name}, Flavor: ${surname}, Price: ${email}`;

    const modifyButton = document.createElement('button');
    modifyButton.textContent = 'Modify';
    modifyButton.addEventListener('click', () => {
        modifyItem(listItem);
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteItem(listItem);
    });

    listItem.appendChild(modifyButton);
    listItem.appendChild(deleteButton);

    list.appendChild(listItem);

    if (list.children.length == 0) {
        sectionList.style.display = 'none';
    }
};

const modifyItem = (listItem) => {
    const values = listItem.textContent.split(', ');

    nameInput.value = values[0].split(': ')[1];
    surnameInput.value = values[1].split(': ')[1];
    emailInput.value = values[2].split(': ')[1];

    selectedListItem = listItem;
};

const deleteItem = (listItem) => {
    listItem.remove();
};

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

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

deleteButton.addEventListener('click', () => {
    if (selectedListItem) {
        deleteItem(selectedListItem);
        selectedListItem = null;
    }
});