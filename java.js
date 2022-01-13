const form = document.querySelector('#registerForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');

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

for(let i = 0; i < form.length; i++) {
   errors[i] = validate(form[i])
}
console.log(errors)
if(!errors.includes(false)) {
   const user = {
       id: Date.now().toString(),
       firstName : firstName.value,
       lastName : lastName.value,
       email : email.value,
       }
       console.log(user);
       document.getElementById("list").innerHTML += `<li>${firstName.value} ${lastName.value}</li>`;
       document.getElementById("list").innerHTML += `<li class="list_small"><A href="mailto:${email.value}">${email.value}</A></li>`;
} 


});

