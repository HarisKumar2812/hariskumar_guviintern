$(document).ready(function() {
$.ajax({
  url: "/internship/php/profile.php",
  method: "POST",
  dataType: "json",
  success: function(response) {
  $('#name').text(response.value1);
  $('#age').text(response.value2);
  $('#date').text(response.value3);
  $('#contact').text(response.value4);
  $('#address').text(response.value5);

// edit page code
  $(document).ready(function() {
// retrieved the value from stored it in a variable 
    var input1 =(response.value1);
    var input2 =(response.value2);
    var input3 =(response.value3);
    var input4 =(response.value4);
    var input5 =(response.value5);            
// Set the value of the input box
    $('#name1').val(input1);
    $('#age1').val(input2);
    $('#date1').val(input3);
    $('#contact1').val(input4);
    $('#address1').val(input5);

    });    
  }    
});    
});
$(document).ready(function() {
    $('#myButton').click(function() {
        var condition = true; 

        if (condition) {
            window.location.href = "/internship/views/profile_edit.html";
        }
    });
    function logout() {
          window.location.href = "login.html";
      }
    
      document.getElementById("logoutButton").addEventListener("click", logout);
    
    
});


  