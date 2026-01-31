<?php
    $con=mysqli_connect('localhost','root','','cars',3307);
    if(mysqli_connect_error())
    {
        die('ERROR:Unable to Connect:' .mysqli_connect_error());
        echo "<script>alert('Hi!')</script>";
        echo "<script>alert('Hi!')</script>";
    }
?>
