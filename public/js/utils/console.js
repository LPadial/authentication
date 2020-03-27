"use strict"

//Files
var fileName = "";
var file_content = "";
var file_content_copy = "";

//Console
var debug_line_array = {
    //Register
    "one_time_password.js" : [15,19,30],
    "route_user_register.js" : [14],
    "model_user.js" : [6,29],
    "controller_user_register.js" : [11,17,22,25],
    //Login
    "route_user_login.js" : [17],
    "controller_user_login.js" : [18,26,30,32,37],
    "jwt.js" : [8,10,11,22],
    //Get Users
    "route_user_get_users.js" : [11],
    "authenticated.js" : [8,13,16,17,21,31],
    "permissions.js" : [6],
    "controller_user_get_users.js" : [11],
    //Delete user
    "route_user_delete.js" : [15],
    "controller_user_delete.js" : [11]
};
var debug_count = "";

$(function() {

    let console_log_dir = "/public/js/console_js/";

    let helpText =  "-------- DEBUG OPTIONS --------"+'\n';
    helpText +=     " - cat [filename] : Show the content of a file placed in server folder '"+console_log_dir+"'"+'\n';
    helpText +=     " - next  : Go to next debug line of the current file"+'\n';
    helpText +=     " - stop  : Go to first debug line of the current file and clear debug lines"+'\n';
    helpText +=     " - reset : Go to first debug line of the current file"+'\n';
    helpText +=     " - clear : Clear debug lines"+'\n';
    helpText +=     " - help  : Show help"+'\n';

    var loaded = false;

    $("#inputConsole").dblclick(function(e) {
        e.preventDefault();

        let command = $("#inputConsole").val().trim();
        console.log(command);

        if(command.startsWith("cat ")) {
            let arg = command.replace("cat ", "");
            readConsoleFile(arg, function(data) {
                //Mostar las lineas que tu quieras
            });
        }
        else if(command.trim().startsWith("next")) {
            if(loaded && debug_count !== "") {
                if(debug_line_array !== null && debug_line_array[fileName].length > 0 && debug_count < debug_line_array[fileName].length) {
                    debug_console_index(debug_line_array[fileName][debug_count]);
                    debug_count++;
                }
            }
        }
        else if(command.trim().startsWith("stop")) {
            stopDebug();
        }
        else if(command.trim().startsWith("reset")) {
            resetDebug();
        }
        else if(command.trim().startsWith("clear")) {
            clearDebugLine();
        }
        else if(command.trim().startsWith("help")) {
            help();
        }
    });

    //Read console file
    function readConsoleFile(file, onCallback) {
        if(file !== "") {
            fileName = file;
            let path = console_log_dir+fileName;

            $.get(path, function(data){
                loaded = true;
                debug_count = 0;

                $("#console_code").text(data);
                file_content = $("#console_code").text();
                file_content_copy = "";

                onCallback(data);
            });
        }
    }

    //Debug functionality
    function debug_console_line(line) {
        debugLine(line);
    }
    
    function debug_console_index(i) {
        let file_content_arr = file_content.split('\n');
        debugLine(file_content_arr[i]);
    }
    
    function debugLine(line) {
        if(file_content_copy === "")
            file_content_copy = file_content;
    
        let index = file_content_copy.indexOf(line.trim());
    
        if(index !== -1) {
            file_content_copy = file_content.replace(line.trim(), "<span class='current-line-debug'>"+line+"</span>");
            $("#console_code").replaceWith('<code id="console_code">'+file_content_copy+'</code>');
        }
        else {
            clearDebugLine();
        }
    }
    
    function stopDebug() {
        clearDebugLine();
        resetDebug();
    }
    
    function clearDebugLine() {
        $("#console_code").replaceWith('<code id="console_code">'+file_content+'</code>');
    }
    
    function resetDebug() {
        debug_count = 0;
    }

    function help() {
        $("#console_code").replaceWith('<code id="console_code">'+helpText+'</code>');
    }

});