//(Hidden future dates) Get the current date
const currentDate = new Date().toISOString().split('T')[0];
dateofbirth.setAttribute('max', currentDate);

$(document).ready(function () {

const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const age = document.getElementById("age");
const contact = document.getElementById("contactnumber");
const dateofbirth = document.getElementById("dateofbirth");
const address = document.getElementById("address");
const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");


function isEmailValid(emailInput) {
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(emailInput);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  checkInput();

  if (isFormValid()) {
    submitForm();
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll('.form-container');
  let result = true;
  inputContainers.forEach((formControl) => {
    if (formControl.classList.contains('error')) {
      result = false;
    }
  });
  return result;
}

function checkInput() {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const ageValue = age.value.trim();
    const contactnumberValue = contact.value.trim();
    const dateofbirthValue = dateofbirth.value.trim();
    const addressValue = address.value.trim();
    const password1Value = password1.value.trim();
    const password2Value = password2.value.trim();

    // username validation
    if (usernameValue === '') {
        setError(username, 'Username cannot be blank');
    } else {
        setSuccess(username);
    }

    // email id validation
    if (emailValue === '') {
       setError(email, 'Email cannot be blank');
    } else if (!isEmailValid(emailValue)) {
       setError(email, 'Provide a valid email address');
    } else {
      setSuccess(email);
    }


    // age validation
    if (ageValue === '') {
        setError(age, 'Age cannot be blank');
    } else if (ageValue.length > 2) {
        setError(age, 'Enter 2 digits only');
    } else {
        setSuccess(age);
    }

    // date of birth validation
    if (dateofbirthValue === '') {
        setError(dateofbirth, 'DOB cannot be blank');
    } else {
        setSuccess(dateofbirth);
    }
    
    // contact number validation
    if (contactnumberValue === '') {
        setError(contactnumber, 'Contact number cannot be blank');
    } else if (contactnumberValue.length > 10) {
        setError(contactnumber, 'Maximum limit is 10 digits only');
    } else if (contactnumberValue.length < 10) {
        setError(contactnumber, 'Enter 10 digits only');
    }
    
    if (contactnumberValue.length == 10) {
        if (
            contactnumberValue.charAt(0) == 1 ||
            contactnumberValue.charAt(0) == 2 ||
            contactnumberValue.charAt(0) == 3 ||
            contactnumberValue.charAt(0) == 4 ||
            contactnumberValue.charAt(0) == 5 ||
            contactnumberValue.charAt(0) == 0
        ) {
            setError(contactnumber, 'Number is invalid');
        }
    }

    if (contactnumberValue.length == 10) {
        if (
            contactnumberValue.charAt(0) == 6 ||
            contactnumberValue.charAt(0) == 7 ||
            contactnumberValue.charAt(0) == 8 ||
            contactnumberValue.charAt(0) == 9
        ) {
            setSuccess(contactnumber);
        }
    }

    // address validation
    if (addressValue === '') {
        setError(address, 'Address cannot be blank');
    } else if (address.length > 70) {
        setError(address, 'Maximum limit is 70 characters only');
    } else {
        setSuccess(address);
    }

    // password validation
    if (password1Value === '') {
        setError(password1, 'Password cannot be blank');
    } else if (password1Value.length < 6 || password1Value.length > 20) {
        setError(password1, 'Password must be 6 and 20 characters');
    } else {
        setSuccess(password1);
    }

    // confirm password validation
    if (password2Value === '') {
        setError(password2, 'Confirm password cannot be blank');
    } else if (password1Value !== password2Value) {
        setError(password2, 'Password does not match');
    } else {
        setSuccess(password2);
    }

}

function setError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-container error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function setSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-container success';
}

function submitForm() {
  $.ajax({
    url: "/internship/php/register.php",
    type: "post",
    data: $("#form").serialize(),
    dataType: 'JSON',
    async: false
  }).done(function (response) {
    if (response['status'] == 'success') {
      console.log('hi');
      window.location.replace("../views/login.html");
    }
  }).done(function (response) {
    if (response['status'] == 'error') {
      document.getElementById('message').innerHTML = 'Email id already exists.';
    } 
  });
}
});

