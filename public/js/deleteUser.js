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

    //Parse email
    function handleEmail() {
        return parser.parse('#inputEmail', parser.parseEmail);
    }
    $('#inputEmail').donetyping(handleEmail);
    $('#inputEmail').change(handleEmail);
    if($('#inputEmail').val()) {
        handleEmail();
    }

    //Delete user form
    $("#deleteUserForm").submit(function() {

        if(handleEmail().ok) {
            let user_id = $("#deleteUserForm").prop("user_id");
            let user_email = $("#deleteUserForm").prop("user_email");

            if($('#inputEmail').val() !== user_email) {
                displayMessageError('#inputEmail', "El email introducido debe coincidir con el del usuario a dar de baja");
            }
            else {
                user_email = "";
                $("#deleteUserForm").prop("user_email", "");

                $.ajax("https://www.app.losuratech.com/authentication/user/"+user_id,{
                    type: 'DELETE',
                    data: {id: user_id}
                })
                .done(function(data) {
                    $("#tr_u_"+user_id).remove();

                    user_id = "";
                    $("#deleteUserForm").prop("user_id", "");
                })
                .fail(onDeleteFail);
            }
        }
        
        return false;
    });

    function onDeleteFail(error) {
        parser.displayMessageError("#inputEmail", error.message);
    }
    

});

function loadUserTable(users) {
    $("#tbody_users").empty();

    for(const [i, u] of users.entries()) {
        let tr_u = $("#tr_user_clone").clone();

        $(tr_u).attr('id', "tr_u_"+u._id);
        $(tr_u).find(".td_row").text(i);
        $(tr_u).find(".td_email").text(u.email);
        $(tr_u).find(".td_name").text(u.name);
        $(tr_u).find(".td_surname").text(u.surname);
        $(tr_u).find(".td_nickname").text(u.nickname);

        let btnDelete = $(tr_u).find(".td_actions > .btn_delete");
        $(btnDelete).prop("user_id", u._id);
        $(btnDelete).prop("user_email", u.email);

        $(btnDelete).click(function(e) {
            e.preventDefault();

            let id = $(this).prop("user_id");
            let email = $(this).prop("user_email");

            $("#deleteUserForm").prop("user_id", id);
            $("#deleteUserForm").prop("user_email", email);
            
            

            return false;
        });

        $(tr_u).removeClass("d-none");

        $("#tbody_users").append(tr_u);
    }
}