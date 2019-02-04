$(function(){
	$('#ctcUs').submit(function(event){
		event.preventDefault();

		var dataValue 	= $(this).serialize();
		var $inputs 	= $(this).find("input, select, button, textarea")
		var base_url 	= window.location.origin;

		$inputs.prop("disabled", true);

		request = $.ajax({
	        url: base_url+"/process/sendmail.php",
	        type: "post",
	        data: dataValue
	    });

	    request.done(function (response, textStatus, jqXHR){
	        // Log a message to the console
	        let msg = 'Thank you! your message has been sent successfully.'
	        $('#ctcUs').find('.messageSucces').html(msg);
	        $('#ctcUs').find('input').val('');
	        console.log("Hooray, it worked!");
	    });

	    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
	        console.error(
	            "The following error occurred: "+
	            textStatus, errorThrown
	        );
	    });

	    // Callback handler that will be called regardless
	    // if the request failed or succeeded
	    request.always(function () {
	        // Reenable the inputs
	        $inputs.prop("disabled", false);
	    });
	})
})