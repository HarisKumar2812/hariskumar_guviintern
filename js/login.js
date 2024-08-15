$(document).ready(function () {

  const form = document.getElementById('form-login');
  const email = document.getElementById("email");
  const password1 = document.getElementById("password1");
  
      
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
        const emailValue = email.value.trim();
        const password1Value = password1.value.trim();
    
        // email id validation
        if (emailValue === '') {
           setError(email, 'Email cannot be blank');
        }  else {
          setSuccess(email);
        }
    
    
            // password validation
        if (password1Value === '') {
            setError(password1, 'Password cannot be blank');
        }  else {
            setSuccess(password1);
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
        url: "/internship/php/login.php",
        type: "post",
        data: $("#form-login").serialize(),
        dataType: 'JSON',
        async: false
    
      }).done(function (response) {
        if (response['status'] == 'success') {
          console.log('hi');
          window.location.replace("../views/profile.html");
        }
      }).done(function (response) {
        if (response['status'] == 'error') {
          document.getElementById('message').innerHTML = 'Invoild Email id or Password.';
  
        } 
      });
    }
    });
    