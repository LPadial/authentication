"use strict"
$(function() {

    //
	// $('#element').donetyping(callback[, timeout=1000])
	// Fires callback when a user has finished typing. This is determined by the time elapsed
	// since the last keystroke and timeout parameter or the blur event--whichever comes first.
	//   @callback: function to be called when even triggers
	//   @timeout:  (default=1000) timeout, in ms, to to wait before triggering event if not
	//	              caused by blur.
	// Requires jQuery 1.7+
	//
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1.5e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
    
    /* Person form */
    var correctRegisterForm = [];

    function handleEmail() {
        correctRegisterForm[0] = parser.parse('#inputEmail', parser.parseEmail);
    }
    $('#inputEmail').donetyping(handleEmail);
    $('#inputEmail').change(handleEmail);
    if($('#inputEmail').val()) {
        handleEmail();
    }
    
    function handlePassword() {
        correctRegisterForm[1] = parser.parse('#inputPassword', parser.parsePassword);
    }
    $('#inputPassword').donetyping(handlePassword);
    $('#inputPassword').change(handlePassword);
    if($('#inputPassword').val()) {
        handlePassword();
    }
    
    function handleSamePassword() {
        correctRegisterForm[2] = parser.parse('#inputPasswordRepeat', parser.parseSamePassword, '#inputPassword');
    }
    $('#inputPasswordRepeat').donetyping(handleSamePassword);
    $('#inputPasswordRepeat').change(handleSamePassword);
    if($('#inputPasswordRepeat').val()) {
        handleSamePassword();
    }

    function handleName() {
        correctRegisterForm[3] = parser.parse('#inputName', parser.parseName);
    }
    $('#inputName').donetyping(handleName);
    $('#inputName').change(handleName);
    if($('#inputName').val()) {
        handleName();
    }

    function handleSurname() {
        correctRegisterForm[4] = parser.parse('#inputSurname', parser.parseName);
    }
    $('#inputSurname').donetyping(handleSurname);
    $('#inputSurname').change(handleSurname);
    if($('#inputSurname').val()) {
        handleSurname();
    }
    
    function handleNickname() {
        correctRegisterForm[5] = parser.parse('#inputNickname', parser.parseName);
    }
    $('#inputNickname').donetyping(handleNickname);
    $('#inputNickname').change(handleNickname);
    if($('#inputNickname').val()) {
        handleNickname();
    }

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

            $.ajax("http://localhost:80/authentication/user",{
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

    function onRegisterFail(error) {
        parser.displayMessageError("#inputLogin", error);
    }

});