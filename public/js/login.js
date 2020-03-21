"use strict"

var parser;

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
    	
    	let login = $("#inputLogin").val();
		let password = $("#inputPassword").val();
		
    	if(login !== "" && password !== "") {
			//DO AJAX LOGIN
			$.ajax({
				type: "POST",
				url: "http://localhost/authentication/user/login",
				timeout: 0,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				data: {
					"email": login,
					"nickname": login,
					"password": password,
					"gethash": true
				},
				error: function(response) {
					let responseObj = JSON.parse(response.responseText);
					parser.displayMessageError("#inputLogin", responseObj.message);
				},
				success: function (response) {
					console.log(response.token + " success");
				}
			});
		}

        return false;
    });
	
});