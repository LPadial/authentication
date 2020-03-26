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
        $.ajax("http://localhost:80/authentication/user/login",{
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
    console.log(data.user);

    localStorage.setItem('token', data.token);
    //TODO - Almacenar token devuelto
    

    //Cargar profile con ajax
    //location.href = "/public/profile.html";
    let role = data.user[5];
    if(role === "user") {
        $("#container-page").load('http://localhost:80/public/profile_info.html div#container-page', function() {
            //Poner el perfil dinamicamente    
            $("#profileName").text(data.user[4]);
            $("#email").text(data.user[1]);
            $("#name").text(data.user[2]);
            $("#surname").text(data.user[3]);
            $("#nickname").text(data.user[4]);
        });
    }
    else if(role === "admin") {
        $("#container-page").load('http://localhost:80/public/admin.html div#container-page', function() {
            /*
            $.ajax("http://localhost:80/authentication/users",{
                type: 'GET',
                data: {email: login, nickname:login, password: password, gethash: true}
            })
            .done(function(data) {
                


                onLoginSucced(data);
            })
            .fail(function(error) { console.log(error); } );
            */
        });

        
    }
    //$("#container-page").html(data);

    
    
}

function onLoginFail(error) {
    parser.displayMessageError("#inputLogin", error.message);
}