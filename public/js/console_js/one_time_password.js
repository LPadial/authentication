$("#register").submit(function() {
        handleEmail();
        handlePassword();
        handleSamePassword();
        handleName();
        handleSurname();
        handleNickname();
        
        let allCorrect = true;
        
        for (let correctInput of correctRegisterForm) {
            allCorrect = allCorrect && correctInput;
        }

        if(allCorrect) {
            let login = ($('#inputEmail').val() !== "" ? $('#inputEmail').val() : $('#inputNickname').val());
            let password = $('#inputPassword').val();

            $.ajax("https://www.app.losuratech.com/authentication/user",{
                type: 'POST',
                data: {
                    email: $('#inputEmail').val(), 
                    password: $('#inputPassword').val(), 
                    name: $('#inputName').val(), 
                    surname: $('#inputSurname').val(), 
                    nickname: $('#inputNickname').val()
                }
            })
            .done(function() {
                doLogin(login, password);

                login = "";
                password = "";
                $('#inputPassword').val("");
                $('#inputPasswordRepeat').val("");
            })
            .fail(onRegisterFail);
        }
        
        return false;
    });