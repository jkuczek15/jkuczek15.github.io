$('#submit').click(function(){
	// list of error messages
	var error_messages = {
		email_require: 'Email is a required field.',
		message_require: 'Message is a required field.',
		name_require: 'Name is a required field.',
		email_invalid: 'Reply-to email is invalid'
	};

	// grab the data
	var data = {
		"Name"      : $('#name').val(),
		"Reply-To"  : $('#email').val(),
		"Message"   : $('#comments').val(),
	};

	// validate the form
	var error = validate(data);

	if(error != null){
		$('#message').attr('class', 'alert alert-danger');
		$('#message').show();
		$('#message').html(error_messages[error]);
	}else{
		send_email(data);
	}// end if there is an error

	return false;
});

function validate(form_data){
	// validate the contact form
	if(form_data["Name"] == '')
		return 'name_require';
	if(form_data["Reply-To"] == '')
		return 'email_require';
	if(form_data["Message"] == '')
		return 'message_require';
	if(!validateEmail(form_data["Reply-To"]))
		return 'email_invalid';
	return null;
}// end function for validating form

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}// end function validateEmail

function send_email(form_data){
	$.ajax({
		url: "https://formspree.io/joe.kuczek@gmail.com", 
		method: "POST",
		data: form_data,
		dataType: "json",
		success: function(data){
			$('#message').attr('class', 'alert alert-success');
			$('#message').html("<strong>Success!</strong> Message has been sent, I'll be in touch with you shortly.");
			$('#message').slideDown('slow');
			$('#cform img.contact-loader').fadeOut('slow',function(){ $(this).remove() });
			$('#submit').removeAttr('disabled');
			$('#cform').slideUp('slow');
		}// end success function
	});
}// end function for sending the email