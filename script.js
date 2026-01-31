// var data
//Ajax Call for sign up form
//Once the form is submitted
$("#signupform").submit(function(event){
    //hide Message
    $("#signupmessage").hide()
    //show the spinner
    $("#spinner").css("display","block")
    //prevent deafault PHP processing
    event.preventDefault();
    //collect inputs from user
    var datatopost=$(this).serializeArray()
    console.log(datatopost)
    //send data to php file using AJAX
    $.ajax({
        url:"/CARPOOL/lib/signup.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            if(data)
            {
                $("#signupmessage").html(data)
                //hide spinner
                $("#spinner").css("display","none")
                //show message
                $("#signupmessage").slideDown()
            }
        },
        error:function()
        {
            $("#signupmessage").html("<div class='alert alert-danger'>There was error calling AJAX. Please try again!.</div>")
            //hide spinner
            $("#spinner").css("display","none")
            //show message
            $("#signupmessage").slideDown()
        }
    })
})


// Ajax Call for the login form
$("#loginform").submit(function(event){ 
    // Hide message
    $("#loginmessage").hide();

    // Show spinner
    $("#spinner").css("display", "block");

    // Prevent default form submit
    event.preventDefault();

    // Collect user inputs
    var datatopost = $(this).serializeArray();

    // Send to login.php using AJAX
    $.ajax({
        url: "lib/login.php",
        type: "POST",
        data: datatopost,

        success: function(data){
            data = data.trim();   // ⭐ IMPORTANT FIX

            if(data === "success"){
                window.location.href = "loggedin.php";  // Redirect after login
            } else {
                $('#loginmessage').html(data);
                $("#spinner").css("display", "none");
                $("#loginmessage").slideDown();
            }
        },

        error: function(){
            $("#loginmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            $("#spinner").css("display", "none");
            $("#loginmessage").slideDown();
        }
    });
});


//Ajax Call for the forgot password form
//Once the form is submitted
$("#forgotpasswordform").submit(function(event){ 
    //hide message
    $("#forgotpasswordmessage").hide();
    //show spinner
    $("#spinner").css("display", "block");
    //prevent default php processing
    event.preventDefault();
    //collect user inputs
    var datatopost = $(this).serializeArray();
//    console.log(datatopost);
    //send them to signup.php using AJAX
    $.ajax({
        url: "lib/forgotpassword.php",
        type: "POST",
        data: datatopost,
        success: function(data){
            $('#forgotpasswordmessage').html(data);
            //hide spinner
            $("#spinner").css("display", "none");
            //show message
            $("#forgotpasswordmessage").slideDown();
        },
        error: function(){
            $("#forgotpasswordmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");
            //hide spinner
            $("#spinner").css("display", "none");
            //show message
            $("#forgotpasswordmessage").slideDown();
        }
    
    });

});



//Ajax Call for storeresetpassword
//Once the form is submitted
$("#passwordreset").submit(function(event){ 
    //prevent default php processing
    event.preventDefault();
    //collect user inputs
    var datatopost = $(this).serializeArray();
    console.log(datatopost);
    //send them to storeresetpassword.php using AJAX
    $.ajax({
        url: "../lib/storeresetpassword.php",
        type: "POST",
        data: datatopost,
        success: function(data){

            $('#resultmessage').html(data);
        },
        error: function(){
            $("#resultmessage").html("<div class='alert alert-danger'>There was an error with the Ajax Call. Please try again later.</div>");

        }

    });

});   


// =========================
$(document).ready(function(){

    console.log("Search system ready");

    $("#searchform").submit(function(e){
        e.preventDefault(); // stop page reload
        console.log("Search clicked");

        $("#results").html("Searching...");
        $("#spinner").show();

        $.ajax({
            url: "lib/search.php",
            type: "POST",
            data: $(this).serialize(),
            success: function(data){
                console.log("Server responded");
                $("#spinner").hide();
                $("#results").html(data).fadeIn();
            },
            error: function(){
                console.log("AJAX error");
                $("#spinner").hide();
                $("#results").html("<div class='alert alert-danger'>Search failed</div>");
            }
        });
    });

});

