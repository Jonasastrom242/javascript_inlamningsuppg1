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

const validateText = (input) => {
    let checkDigit = /\d+/;
    let check =  /\W/;       //Jag fattar inte hur jag inkluderar ÅÄÖ i checken.

    
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

form.addEventListener('submit', e => {
    e.preventDefault();



errors = []
let nummer = 1;

for(let i = 0; i < form.length; i++) {
   errors[i] = validate(form[i])
}
console.log(errors);
if(!errors.includes(false)) {
        user.id.push(Date.now().toString())
        user.firstName.push(firstName.value);
        user.lastName.push(lastName.value);
        user.email.push(email.value);

       console.log(user);
    //    document.getElementById("list").innerHTML += `<input type="radio" id="${nummer.value}"><label for="${nummer.value}"></label><li>${firstName.value} ${lastName.value}</li>`;
    //    document.getElementById("list").innerHTML += `<li class="list_small"><A href="mailto:${email.value}">${email.value}</A></li>`;
  
    for(let i = 0; i < user.id.length; i++) {
        
        document.getElementById("list").innerHTML += `<input type="radio" id="${user.id[i]}"><label for="${user.id[i]}"></label><li>${user.firstName[i]} ${user.lastName[i]}</li>`;
        document.getElementById("list").innerHTML += `<li class="list_small"><A href="mailto:${user.email[i]}">${user.email[i]}</A></li>`;
        
        
    }


}
});

