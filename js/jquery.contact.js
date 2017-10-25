var form_submitted = false;

$('#submit').click(function(){
	// validate the form data
	form_submitted = true;
	var data = validate();

	if(data != null){
		send_email(data);
	}// end if there is an error

	return false;
});

$('#cform').keyup(function(){
	validate();
});

function validate(){
	if(!form_submitted){
		return;
	}// end if form hasnt been submitted yet

	// validate our form before sending an email
	var data = {
		"Name"      : $('#name').val(),
		"Reply-To"  : $('#email').val(),
		"Message"   : $('#message').val(),
	};

	var error = false;
	if(data["Name"].trim() == '') {
		error = true;
		$('#name_err').html("Name is a required field.").show();
		$('#name').addClass('invalid error-input');
	}else {
		$('#name_err').hide();
		$('#name').removeClass('invalid error-input');	
	}// end if no name in form

	if(data["Message"].trim() == '') {
		error = true;
		$('#message_err').html("Message is a required field.").show();
		$('#message').addClass('invalid error-input');
	}else {
		$('#message_err').hide();
		$('#message').removeClass('invalid error-input');
	}// end if no message in form
		
	if(data["Reply-To"].trim() == '') {
		error = true;
		$('#email_err').html("Email address is a required field.").show();
		$('#email').addClass('invalid error-input');
	}else if(!validateEmail(data["Reply-To"])) {
		error = true;
		$('#email_err').html("Email address is invalid.").show();
		$('#email').addClass('invalid error-input');
	}else {
		$('#email_err').hide();
		$('#email').removeClass('invalid error-input');
	}// end if no email or email invalid
	
	return error ? null : data;
}// end function for validating form

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}// end function validateEmail

function send_email(data){
	$.ajax({
		url: "https://formspree.io/joe.kuczek@gmail.com", 
		method: "POST",
		data: data,
		dataType: "json",
		success: function(data){
			$('#success_message').html("<strong>Success!</strong> Message has been sent, I'll be in touch with you shortly.");
			$('#success_message').slideDown('slow');
			$('#cform img.contact-loader').fadeOut('slow',function(){ $(this).remove() });
			$('#submit').removeAttr('disabled');
			$('#cform').slideUp('slow');
		}// end success function
	});
}// end function for sending the email