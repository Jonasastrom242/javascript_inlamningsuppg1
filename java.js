const form = document.querySelector('#registerForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const user = {
    id: [],
    firstName : [],
    lastName : [],
    email : [],
    };

//functions

const validateText = (input) => {
    let checkDigit = /\d+/;
    let check =  /\[A-ZÅÄÖa-zåäö]+/;       //Jag fattar inte hur jag inkluderar ÅÄÖ i checken.

    
    if(input.value.trim() === '') {
     
        setError(input, 'Namn kan inte var tomt');
        return false;
} 
else if(input.value.trim().length < 2) {
    setError(input, 'Namnet måste vara minst 2 bokstäver');
    return false;
}
else if(checkDigit.test(input.value)) {
    setError(input, 'Namnet kan inte innehålla siffror');
    return false;
}
else if(check.test(input.value)) {
    setError(input, 'Namnet kan inte innehålla annat än bokstäver');
    return false;
}
else {
    setSuccess(input);
    return true;
}
}

const validateEmail = email => {
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    

    if(email.value.trim() === '') {
        setError(email, 'Skriv in en epostadress');
        return false;
    } else if(!regEx.test(email.value)) {
        setError(email, 'Epostadressen är inte korrekt');
        return false;
    }
    else if(user.email.includes(email.value)) {
        setError(email, 'Epostadressen finns redan');
        return false;
    }
    else {
        setSuccess(email);
        return true;
    }
}

const validateEmail2 = email => {
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    

    if(email.value.trim() === '') {
        setError(email, 'Skriv in en epostadress');
        return false;
    } else if(!regEx.test(email.value)) {
        setError(email, 'Epostadressen är inte korrekt');
        return false;
    }
    else {
        setSuccess(email);
        return true;
    }
}

const setError = (input, textMessage) => {
    const parent = input.parentElement;
    parent.classList.add('is-invalid');
    parent.classList.remove('is-valid');

    parent.querySelector('.invalid-input').innerText = textMessage;
}

const setSuccess = input => {
    const parent = input.parentElement;
    parent.classList.remove('is-invalid');
    parent.classList.add('is-valid');
}

const validate = input => {
    switch(input.type) {
        case 'text': return validateText(input)
       
        case 'email': return validateEmail(input)

        default:
        break;
       
    }
}
const validateChange = input => {
    switch(input.type) {
        case 'text': return validateText(input)
       
        case 'email': return validateEmail2(input)

        default:
        break;
       
    }
}

const addHTML = input => {
    for(let i = 0; i < user.id.length; i++) {
    document.getElementById("list").innerHTML += `<div class="flex2"><input type="radio" name="radio_users" value="${user.id[i]}" id="${user.id[i]}" class="radio_btn"><label for="${user.id[i]}"></label><li id="${user.id[i]}">${user.firstName[i]} ${user.lastName[i]}</li></div>`;
    document.getElementById("list").innerHTML += `<li class="list_small" id="${user.id[i]}"><A href="mailto:${user.email[i]}">${user.email[i]}</A></li><hr class="line">`;
    }
};

const clearHTML = input => {
    document.getElementById("list").innerHTML = '';
};


//end functions

document.getElementById("register").addEventListener('click', e => {
    e.preventDefault();

errors = [];


for(let i = 0; i < form.length; i++) {
   errors[i] = validate(form[i])
}

if(!errors.includes(false)) {
        user.id.push(Date.now().toString())
        user.firstName.push(firstName.value);
        user.lastName.push(lastName.value);
        user.email.push(email.value);
        document.getElementById("list").innerHTML = '';
        addHTML();
        change.classList.remove('invisible'); 
        radera.classList.remove('display-none');
        listcontainer.classList.add('visible'); 

}

});


document.getElementById("change").addEventListener('click', e => {
    e.preventDefault();
    save.classList.remove('display-none');
    register.classList.add('invisible');
    radera.classList.add('display-none');

    const email = document.getElementById("email");
    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    

    const getId = document.querySelector('input[name="radio_users"]:checked').value;
    const index = user.id.indexOf(getId);
    document.getElementById("firstName").value = user.firstName[index];
    document.getElementById("lastName").value = user.lastName[index];
    document.getElementById("email").value = user.email[index];
    
    for(let i = 0; i < form.length; i++) {
        errors[i] = validateChange(form[i])
     }

});




document.getElementById("save").addEventListener('click', e => {
    e.preventDefault();
    radera.classList.remove('display-none');
    save.classList.add('display-none');
    register.classList.remove('invisible');
      
errors = [];


    for(let i = 0; i < form.length; i++) {
   errors[i] = validateChange(form[i])
    }

    if(!errors.includes(false)) {
        const getId = document.querySelector('input[name="radio_users"]:checked').value;
        const index = user.id.indexOf(getId);
        user.firstName[index] = document.getElementById("firstName").value;
        user.lastName[index] = document.getElementById("lastName").value;
        user.email[index] = document.getElementById("email").value;
        document.getElementById(getId).innerHTML = `<input type="radio" name="radio_users" value="${user.id[index]}" id="${user.id[index]}"><label for="${user.id[index]}"></label><li id="${user.id[index]}">${user.firstName[index]} ${user.lastName[index]}</li>`;
        document.getElementById(getId).innerHTML += `<li class="list_small" id="${user.id[index]}"><A href="mailto:${user.email[index]}">${user.email[index]}</A></li><hr class="line">`;
        clearHTML();
        addHTML();
    }

});

document.getElementById("radera").addEventListener('click', e => {
    e.preventDefault();
    save.classList.add('display-none');

        const getId = document.querySelector('input[name="radio_users"]:checked').value;
        const index = user.id.indexOf(getId);
        user.id.splice(index, 1);
        user.firstName.splice(index, 1);
        user.lastName.splice(index, 1);
        user.email.splice(index, 1);
        clearHTML();
        addHTML();
    if(user.id.length === 0) {
        listcontainer.classList.remove('visible');
        radera.classList.add('display-none');
    }
});