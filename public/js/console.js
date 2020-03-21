"use strict"

var file_content = "";
var file_content_copy = "";

$(function() {

    let console_log_dir = "/public/js/console_js/";

    $("#inputConsole").keypress(function(e) {

        if(e.which == 13) {
            e.preventDefault();

            console.log($("#inputConsole").val());

            $.get(console_log_dir+$("#inputConsole").val(), function(data, status){
                $("#console_code").text(data);
                file_content = $("#console_code").text();
            });
        }

        return false;
    });

    

    //surname:Padial
    /*
    file_content_copy = file_content.replace("surname:Padial", "</code><span class='current-line-debug'>"+"surname:Padial"+"</span><code>");
            $("#console_code").replaceWith("<code class='#console_code'>"+file_content_copy);
    */


});

function debug_console(line) {
    let index = file_content.indexOf(line.trim());

    if(index !== -1) {
        file_content_copy = file_content.replace(line, "</code><span class='current-line-debug'>"+line+"</span><code>");
        $("#console_code").replaceWith("<code class='#console_code'>"+file_content_copy);
    }
}