<?php
require 'db.php';

if(isset($_POST['object'])){
	$object = json_decode($_POST['object'], true);

	for($i=0 ; $i < count($object) ; $i++){
		for($j=0 ; $j < count($object[$i]) ; $j++){
				$type=$object[$i][$j]["type"];
				$target=$object[$i][$j]["target"];
				$time=$object[$i][$j]["time"];
			$sql="insert into interactions (type,target,time) values ('$type','$target','$time')";
			$q=mysqli_query($con,$sql);
			if(!$q) echo "Data Entery failed";
			
		}	
	}
}

if(isset($_GET['object'])){
	$sql="select * from interactions";
	$q=mysqli_query($con,$sql);
	if($q){
		$rows=array();
		if(mysqli_num_rows($q)>0){
			while($row=mysqli_fetch_assoc($q)){
				array_push($rows,$row);
			}
			echo json_encode($rows);
		}
		//echo "success";
	}else{
		echo "NO data to retrive";
	}
			
}	

?>