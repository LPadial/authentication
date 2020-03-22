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
    
    $('#inputPassword').keyup(function(event) {
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
		let password = $("#inputPassword").val();
		
    	if(email !== "" && password !== "") {
            $.ajax("https://www.app.losuratech.com/authentication/user/login",{
                type: 'POST',
                data: {email: email, password: password, gethash: true}
            })
            .done(function(data) {
                alert(data);
                //TODO - Almacenar token devuelto
                location.href = "/public/profile.html";
            })
            .fail(function(e){
                alert("Error");
            })
            .always(function(c){
                alert("complete");
            });
        }

        return false;
    });
	
});