
let nameLength = 4;
let emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let namePattern= /^[A-Za-z\u00C0-\u00FF\s]+$/;
let passwordPattern= /^(?=.{6,})(?=.*\d)(?=.*[A-Z]).*$/;

let parseNotNullText = "Por favor, rellena el campo";
let parseEmailText = "Por favor, introduce un email válido";
let parseNameText = "Por favor, introduce solo letras y/o números, y al menos 4 caracteres";
let parsePasswordText = "La contraseña debe contener al menos"+" 1 mayúscula"+ ", 1 número"+" y 6 caracteres";

function parseNotNull(argument) {
    let result = (argument !== null && argument !== undefined);
    return { ok: result, msg: (result ? null : parseNotNullText) };
}

exports.parse = function parse(value, parseFunction, required, opc) {
    let msg = null;
    let res = parseNotNull(value);
    
    if(res.ok) {
        res = parseFunction(value, opc);
    }
    else if(required) {
        res.ok = false;
    }
    
    return { result: res.ok, message: msg };
}
    
exports.parseEmail = function parseEmail(argument) {
        let re = emailPattern;
        let result = re.test(argument);
        return { ok: result, msg: (result ? null : parseEmailText) };
    }
    
exports.parseName = function parseName(argument) {
        let re = namePattern;
        let result = re.test(argument);
        result = result && argument.length >= nameLength;
        return { ok: result, msg: (result ? null : parseNameText) };
    }
    
exports.parsePassword = function parsePassword(argument) {
        let re = passwordPattern;
        let result = re.test(argument);
        return { ok: result, msg: (result ? null : parsePasswordText) };
    }

