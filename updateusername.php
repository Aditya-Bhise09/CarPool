<?php
    //start the session
    // session_start();
    // require 'connect.php';

    // //get the user id
    // $id=$_SESSION['user_id'];
    // //get username through AJAX
    // $username=$_POST['username'];

    // //run the query
    // $sql="UPDATE users SET username='$username' WHERE user_id='$id'";
    // $result=mysqli_query($con,$sql);
    // if(!$result)
    // {
    //     echo '<div class="alert alert-danger">There was error upadating username!</div>';
    // }



session_start();
require 'connect.php';

if(!isset($_SESSION['user_id'])){
    exit("User not logged in.");
}

if(!isset($_POST['username'])){
    exit("No username received.");
}

$id = $_SESSION['user_id'];
$username = mysqli_real_escape_string($con, $_POST['username']);

$sql = "UPDATE users SET username='$username' WHERE user_id='$id'";
$result = mysqli_query($con, $sql);

if($result){
    echo '<div class="alert alert-success">Username updated successfully!</div>';
} else {
    echo '<div class="alert alert-danger">Database error: '.mysqli_error($con).'</div>';
}


?>