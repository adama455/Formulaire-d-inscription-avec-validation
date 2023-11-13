function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
  
    // Changer l'icône en forme d'œil en fonction de la visibilité du mot de passe
    togglePassword.innerHTML = type === 'password' ?
      '<i class="fa-solid fa-eye"></i>' :
      '<i class="fa-solid fa-eye-slash"></i>';
  }

function toggleConfirmPasswordVisibility() {
    const confirmPasswordField = document.getElementById('password2');
    const toggleConfirmPassword = document.querySelector('.toggle-confirm-password');

    const type = confirmPasswordField.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordField.setAttribute('type', type);

    // Changer l'icône en forme d'œil en fonction de la visibilité du mot de passe
    toggleConfirmPassword.innerHTML = type === 'password' ?
        '<i class="fa-solid fa-eye"></i>' :
        '<i class="fa-solid fa-eye-slash"></i>';
}
//--------------------------------------------------------------------------------------------------------
// Partie Validation formulaire

const form = document.getElementById('form');
const nomComplet = document.getElementById('nom-complet');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Functions--
function showError(input, message) {//Afficher les messages d'erreur
    const formControl = input.parentElement;
    formControl.className = 'champ error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}
//
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'champ success'; 
}
//
function checkEmail(input) {//Tester si l'email est valide :  javascript : valid email
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (re.test(input.value.trim().toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input,`Adresse email non valide!`);
    }
}

//
function checkRequired(inputArray) {// Tester si les champs ne sont pas vides
    inputArray.forEach(input => {
        if (input.value.trim() === '') {
            showError(input,`${getFieldName(input)} est requis`);
        }else{
            showSuccess(input);
        }
    });
}
//
function getFieldName(input) {//Retour le nom de chaque input en se basant sur son id
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//
function checkLength(input, min, max) {//Tester la longueur de la valeur  d'un input
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} doit contenir au moins ${min} caractères !`)
    }else if(input.value.length > max){
        showError(input, `${getFieldName(input)} doit contenir au moins ${max} caractères !`);
    }else{
        showSuccess(input);
    }
}
//

function validPassword(input) {//Tester si le Mot de passe est superieur à 10 caractères et contient au minimum 1 caractère spécial  :  javascript : valid password
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (input.value.length >= 10 && specialCharacterRegex.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input,`Mot de passe incorrect !`);
    }
}
//

function checkPasswordMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Les mots de passe ne correspondent pas!');
    }
}

//Even listeners--------------------------------------------------------
form.addEventListener('submit',function(e){
    e.preventDefault();//Bloquer la soumission du formulaire
    
    checkRequired([nomComplet, email, password, password2]);
    //
    checkLength(nomComplet, 3, 15);
    validPassword(password);
    checkEmail(email);
    checkPasswordMatch(password,password2);
});

  
  
