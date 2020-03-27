"use strict"

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

//Delete user form
function deleteUser() {
    
    let emailOk = parser.parse('#inputEmail', parser.parseEmail);
    console.log(emailOk);

    if(emailOk) {
        let user_id = $("#deleteUserForm").attr("data-user-id");
        let user_email = $("#deleteUserForm").attr("data-user-email");

        if($('#inputEmail').val() !== user_email) {
            parser.displayMessageError('#inputEmail', "El email introducido debe coincidir con el del usuario a dar de baja");
        }
        else {
            user_email = "";
            $("#deleteUserForm").attr("data-user-email", "");
            $('#inputEmail').val("");

            $.ajax("https://www.app.losuratech.com/authentication/user/"+user_id,{
                type: 'DELETE',
                headers: { Authorization: localStorage.getItem("token") },
                data: {id: user_id}
            })
            .done(function(data) {
                $("#tr_u_"+user_id).remove();

                user_id = "";
                $("#deleteUserForm").attr("data-user-id", "");
            })
            .fail(function() {
                parser.displayMessageError("#inputEmail", error.message);
            });
        }
    }
}

//Parse email
$('#inputEmail').donetyping(function() {
    parser.parse('#inputEmail', parser.parseEmail);
});
$('#inputEmail').change(function() {
    parser.parse('#inputEmail', parser.parseEmail)
});

$("#deleteYes").click(function(e) {
    e.preventDefault();

    deleteUser();

    return false;
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
        $(btnDelete).attr("data-user-id", u._id);
        $(btnDelete).attr("data-user-email", u.email);

        $(btnDelete).click(function(e) {
            e.preventDefault();
            

            let id = $(this).attr("data-user-id");
            let email = $(this).attr("data-user-email");

            $("#deleteUserForm").attr("data-user-id", id);
            $("#deleteUserForm").attr("data-user-email", email);

            $('#deleteUserModal').modal('show');            

        });

        $(tr_u).removeClass("d-none");

        $("#tbody_users").append(tr_u);
    }
}