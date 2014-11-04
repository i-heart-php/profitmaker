<?php 
	$user=json_decode(file_get_contents('php://input'));  //get user from 
	if($user->mail=='test@test.com' && $user->pass=='abc') 
		session_start();
		$_SESSION['uid']=uniqid('ang_');
		print $_SESSION['uid'];
?>