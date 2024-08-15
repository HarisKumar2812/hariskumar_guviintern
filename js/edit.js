//(Hidden future dates) Get the current date
const currentDate = new Date().toISOString().split('T')[0];
date1.setAttribute('max', currentDate);

$(document).ready(function() {
    const form = document.getElementById("profileForm");

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
      const username = document.getElementById("name1");
      const age = document.getElementById("age1");
      const contact = document.getElementById("contact1");
      const dateofbirth = document.getElementById("date1");
      const address = document.getElementById("address1");

      const usernameValue = username.value.trim();
      const ageValue = age.value.trim();
      const contactnumberValue = contact.value.trim();
      const dateofbirthValue = dateofbirth.value.trim();
      const addressValue = address.value.trim();

      // Username validation
      if (usernameValue === '') {
        setError(username, 'Username cannot be blank');
      } else {
        setSuccess(username);
      }

      // Age validation
      if (ageValue === '') {
        setError(age, 'Age cannot be blank');
      } else if (ageValue.length > 2) {
        setError(age, 'Enter 2 digits only');
      } else {
        setSuccess(age);
      }

     // Date of birth validation
      if (dateofbirthValue === '') {
          setError(dateofbirth, 'DOB cannot be blank');
      } else {
         setSuccess(dateofbirth);
      }
   
      // Contact number validation
      if (contactnumberValue === '') {
        setError(contact, 'Contact number cannot be blank');
      } else if (contactnumberValue.length > 10) {
        setError(contact, 'Maximum limit is 10 digits only');
      } else if (contactnumberValue.length < 10) {
        setError(contact, 'Enter 10 digits only');
      }

      if (contactnumberValue.length === 10) {
        if (
          contactnumberValue.charAt(0) == 1 ||
          contactnumberValue.charAt(0) == 2 ||
          contactnumberValue.charAt(0) == 3 ||
          contactnumberValue.charAt(0) == 4 ||
          contactnumberValue.charAt(0) == 5 ||
          contactnumberValue.charAt(0) == 0
        ) {
          setError(contact, 'Number is invalid');
        }
      }

      if (contactnumberValue.length === 10) {
        if (
          contactnumberValue.charAt(0) == 6 ||
          contactnumberValue.charAt(0) == 7 ||
          contactnumberValue.charAt(0) == 8 ||
          contactnumberValue.charAt(0) == 9
        ) {
          setSuccess(contact);
        }
      }

      // Address validation
      if (addressValue === '') {
        setError(address, 'Address cannot be blank');
      } else if (addressValue.length > 70) {
        setError(address, 'Maximum limit is 70 characters only');
      } else {
        setSuccess(address);
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
      var name = $('#name1').val();
      var age = $('#age1').val();
      var dob = $('#date1').val();
      var contact = $('#contact1').val();
      var address = $('#address1').val();

      $.ajax({
        url: '/internship/php/profile_edit.php',
        type: 'POST',
        data: { name: name, age: age, dob: dob, contact: contact, address: address },
        dataType: 'json',
        success: function(response) {
          console.log(response);
          $('#message').text(response.message);
         window.location.href = "/internship/views/profile.html";
        },
        error: function(xhr, status, error) {
          console.log(xhr.responseText);
        }
      });
    }
    });
    function goBack() {
        window.history.back();
      }
      