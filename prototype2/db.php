<?php
$server='localhost';	
$username='root';
$password='rootroot';
$con=mysqli_connect($server,$username,$password);	
if(!$con)					
	die("can not connect to the server $server");
$q=mysqli_query($con,'CREATE DATABASE IF NOT EXISTS Letters');	
if(!$q)
	die("failed to create the database");	
mysqli_select_db($con,'Letters');
$sql="
CREATE TABLE IF NOT EXISTS interactions (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
type VARCHAR(100) NOT NULL,
target VARCHAR(100) NULL,
time varchar(100)
)
";
$q=mysqli_query($con,$sql);
if(!$q)
	echo mysqli_error($con);	

?>