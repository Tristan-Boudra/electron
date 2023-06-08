function addItem(){
    var name = document.getElementById('name');
    var surname = document.getElementById('surname');
    var email = document.getElementById('email');
 
    console.log(name.value); 

    var newName = name.value;
    var newSurname = surname.value;
    var newEmail = email.value;

    var nameList = document.getElementById('nameList');
    nameList = newName;
}

addItem();