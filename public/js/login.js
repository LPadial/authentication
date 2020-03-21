"use strict"
$(function() {

    /* Login form */
    
    $('#inputLogin').keyup(function(event) {
    	//Enter key
		if (event.keyCode === 13 && $('#password').val() !== "") {
			event.preventDefault();
			$("#btnLogin").click();
		}
	});
    
    $('#password').keyup(function(event) {
    	//Enter key
		if (event.keyCode === 13 && $('#inputLogin').val() !== "") {
			event.preventDefault();
			$("#btnLogin").click();
		}
	});
    
    var allCorrect = false;
    $("#btnLogin").click(function(event) {
    	event.preventDefault();
    	
    	let email = $("#inputLogin").val();
		let password = $("#password").val();
		
    	if(email !== "" && password !== "") {
            //DO AJAX LOGIN
        }

        return false;
    });
	
});