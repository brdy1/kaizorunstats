<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Brady's Portfolio - Contact</title>
  <meta name="description" content="View Brady's contact information.">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/style.css">
  
  
  <script>
  
  function validateForm() {

	var name = document.getElementById('name').value;
     
    if (name == '') {
            alert("You must enter your name!");
            return false;
    }
    
    var email = document.getElementById('email').value;
     
    if (email == '') {
            alert("You must enter your email address!");
            return false;
    }
     
     
    var atpos = email.indexOf("@");
    var dotpos = email.lastIndexOf(".");
 
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
        alert("Not a valid e-mail address");
        return false;
    }

	
	var comments = document.getElementById('comments').value;
	
	if (comments == '') {
		alert("Please enter a message for Brady!");
		return false
	}
	  
  }
  
  </script>


  
  
</head>

<body>

<div class="wrap">

<header class="banner">

<img class="logo" src="images/logo.png" alt="BP Logo" width="100" height="100">

<h1>Brady's Portfolio</h1>
<h2>Contact Form</h2>

<?php include('includes/menu.php');?>

</header>

<main class="main">

<h2>Contact</h2>

<p>Enter your information and comments below, and then click submit.</p>

<form class="contact-form" method="post" action="send_form_email.php" onsubmit="return validateForm()">
 
<fieldset>
 
	<legend>Your Information</legend>
   
		<label for="name">Your Name:</label>
		<input type="text" id="name" name="name" value="">
	
	<br><br>
	
		<label for="email">Your Email:</label>
		<input type="text" id="email" name="email" value="">
  	
	</fieldset>
	<fieldset>
	
	<legend>Inquiry Type:</legend>
	 
		<label><input type="radio" name="inquiry" value="podcast">Podcast</label>
	 
		<label><input type="radio" name="inquiry" value="editing">Editing/Publishing</label>
		
		<label><input type="radio" name="inquiry" value="design">Website Design</label>
		
		<label><input type="radio" name="inquiry" value="other">Other</label>
		
	
</fieldset>
 
<fieldset>
 
  <legend>Message</legend>
  
		<textarea name="comments" id="comments"></textarea>
 
</fieldset>
 
<input type="submit" value="Submit">

</form>



</main>

<aside class="sidebar">

<h3>Quick Links</h3>

<h4>Thesis</h4>
<ul>
	<li><a href="thesis.php">Introduction</a></li>
	<li><a href="alchemica.php">"Rosa Alchemica"</a></li>
	<li><a href="tables.php">"The Tables of the Law"</a></li>
	<li><a href="magi.php">"The Adoration of the Magi"</a></li>
	<li><a href="bib.php">Bibliography</a></li>
</ul>

<?php include('includes/podcast.php');?>

</aside>

<br class="clear">

<footer class="footer">
 
 
	<?php include('includes/codefoot.php');?>
 
</footer>

</div>
</body>
</html>