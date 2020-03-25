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
        
    	let login = $("#inputLogin").val();
		let password = $("#inputPassword").val();
		
    	doLogin(login, password);

        return false;
    });
    
});

function doLogin(login, password) {
    if(login !== "" && password !== "") {
        $.ajax("https://www.app.losuratech.com/authentication/user/login",{
            type: 'POST',
            data: {email: login, nickname:login, password: password, gethash: true}
        })
        .done(function(data) {
            //Remove parameters if we succed
            login = "";
            password = "";
            $("#inputLogin").val("");
            $("#inputPassword").val("");

            onLoginSucced(data);
        })
        .fail(onLoginFail);
    }
}


//Login AJAX Functions

function onLoginSucced(data) {
    
    console.log(data.token);
    console.log(data.users);

    //Cargar profile con ajax
    //Poner el perfil dinamicamente
}

function onLoginFail(error) {
    parser.displayMessageError("#inputLogin", error);
}