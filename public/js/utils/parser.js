"use strict"
var parser;
	
$(function() {
	
	parser = {
		legalAge: 18,
		nameLength: 4,
		emailPattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
		namePattern: /^[A-Za-z\u00C0-\u00FF\s]+$/,
		passwordPattern: /^(?=.{6,})(?=.*\d)(?=.*[A-Z]).*$/,
		
	    parseNotNullText : "Por favor, rellena el campo",
	    parseNotEmptyText : "Por favor, rellena el campo",
	    parseEmailText: "Por favor, introduce un email válido",
	    parseNameText: "Por favor, introduce solo letras y al menos 4 caracteres",
	    parsePasswordText: "La contraseña debe contener al menos"+" 1 mayúscula"+ ", 1 número"+" y 6 caracteres",
	    parseSamePasswordText: "Las contraseñas deben coincidir",
	    parseIntegerText : "Por favor, introduce un número válido",
	    parseIntegerPositiveText: "Por favor, introduce un número positvo",
	    parseDateText: "Por favor, introduce una fecha válida",
	    parseHourText: "Por favor, inroduce un hora válida",
	    parseBirthdayText: "Debes tener al menos 18 años",
	    parseStartDateText: "La fecha debe ser posterior a este momento",
	    parseEndDateText: "La fecha debe ser posterior a la de inicio",

	    /**
	     * Resturn true if the argument is correct, if not return false
	     * @param {*} argument 
	     */
	    parseNotNull: function parseNotNull(argument) {
	        let result = (argument !== null && argument !== undefined);
	        return { ok: result, msg: (result ? null : parser.parseNotNullText) };
	    },
	    
	    parseStringNotEmpty: function parseStringNotEmpty(argument) {
	        argument = argument.trim();
	        let result = (argument !== "");
	        return { ok: result, msg: (result ? null : parser.parseNotNullText) };
	    },
	    
	    parseEmail: function parseEmail(argument) {
	    	let re = parser.emailPattern;
	    	let result = re.test(argument);
	    	return { ok: result, msg: (result ? null : parser.parseEmailText) };
	    },
	    
	    parseName: function parseName(argument) {
	    	let re = parser.namePattern;
	    	let result = re.test(argument);
	    	result = result && argument.length >= parser.nameLength;
	    	return { ok: result, msg: (result ? null : parser.parseNameText) };
	    },
	    
	    parsePassword: function parsePassword(argument) {
	    	let re = parser.passwordPattern;
	    	let result = re.test(argument);
	    	return { ok: result, msg: (result ? null : parser.parsePasswordText) };
	    },
	    
	    parseSamePassword: function parseSamePassword(argument, idPassword) {
	    	let password = $(idPassword).val();
	    	let result = (argument != null && password != null && argument === password);
	    	return { ok: result, msg: (result ? null : parser.parseSamePasswordText) };
	    },

	    parseInteger: function parseInteger(argument) {
	        let result = Number.isInteger(argument);
	        return { ok: result, msg: (result ? null : parser.parseIntegerText) };
	    },
	    
	    parseIntegerPostive: function parseIntegerPostive(argument) {
	    	let result = Number.isInteger(Number(argument));
	        return { ok: result, msg: (result ? null : parser.parseIntegerPositiveText) };
	    },
	    
	    parseDate: function parseDate(argument) {
	    	let result = new Date(argument);
	    	return { ok: result != null , msg: (result ? null : parser.parseDateText) };
	    },
	    
	    parseBirthday: function parseBirthday(argument) {
	    	let birthday = moment(new Date(argument));
	    	let legalDate = moment().subtract(parser.legalAge, 'year');
	    	
	    	let result = false;
	    	let msg = parser.parseDateText;
	    	if(birthday && legalDate) { 		
				result = legalDate.isSame(birthday) || legalDate.isAfter(birthday);
				msg = parser.parseBirthdayText;
	    	}
	    	
	    	return { ok: result, msg: (result ? null : msg) };
	    },
	    
	    parseStatDateWithoutHour: function parseStatDateWithoutHour(argument) {
	    	let result = parser.parseDate(argument);
	    	
	    	if(result.ok) {
	    		let startDateMoment = moment(new Date(argument));
	    		let now = moment(new Date()).startOf('day');
	    		
	    		result.ok = false;
		    	result.msg = parser.parseDateText; 
		    	if(startDateMoment && now) { 		
		    		result.ok = startDateMoment.isSame(now) || startDateMoment.isAfter(now);
		    		result.msg = (result.ok ? null : parser.parseStartDateText);
		    	}
	    	}
	    	
	    	return result;
	    },
	    
	    parseHourStr: function parseHourStr(argument) {
	    	let hour = argument.substring(0,2);
	    	let minutes = argument.substring(3,5);
	    	
	    	let hourNumber = Number(hour);
	    	let minutesNumber = Number(minutes);
	    	
	    	let hourOk = (!isNaN(hourNumber) && hourNumber >= 0 && hourNumber <= 23);
	    	let minutesOk = (!isNaN(minutesNumber) && minutesNumber >= 0 && minutesNumber <= 59);
	    	let result = hourOk && minutesOk;
	    	
	    	return { ok: result , msg: (result ? null : parser.parseHourText) };
	    },
	    
	    //Onl call this function after parseStartDateWithoutHour and parseStartHourStr
	    //opcs[0] : id of input hour, opcs[1] : "start" / "end", if "end" -> opcs[2] : input start date, opcs[3] : input start hour
	    parseStartOrEndDate: function parseStartDate(argument, opcs) {
	    	let hourValue = $(opcs[0]).val();
	    	
	    	let hour = hourValue.substring(0, 2);
	    	let minutes = hourValue.substring(3, 5);
	    	
	    	let timeOffset = moment().utcOffset() / 60;
	    	let dateMoment = moment(new Date(argument)).add(Number(hour) - timeOffset, 'h').add(Number(minutes), 'm');
	    	
	    	let result = false;
	    	let msg = parser.parseDateText; 
	    	if(dateMoment) {
	    		if(opcs[1] === "start" || opcs[1] === "date") {
	    			result = dateMoment.isAfter(moment());
	    			msg = (result ? null : parser.parseStartDateText);
	    		}
	    		else if(opcs[1] === "end") {
	    			let startDateVal = $(opcs[2]).val();
	    			let startHourVal = $(opcs[3]).val();
	    			
	    			if(startDateVal && startDateVal !== "" && startHourVal && startHourVal !== "") {
		    			let startHour = startHourVal.substring(0, 2);
		    	    	let startMinutes = startHourVal.substring(3, 5);
	
		    			let startDateMoment = moment(new Date(startDateVal)).add(Number(startHour) - timeOffset, 'h').add(Number(startMinutes), 'm');
		    			
		    			result = startDateMoment.isBefore(dateMoment);
	    			}
	    			if(!result)
	    				parser.displayMessageError(opcs[0], null);
	    			msg = (result ? null : parser.parseEndDateText);
	    		}
	    	}
	    	
	    	return { ok: (result != null ? result : false), msg: (result ? null : msg) };
	    },
	    
	    cleanMessageError: function cleanMessageError(id) {
	    	$(id).removeClass("is-valid");
	        $(id).removeClass("is-invalid");
	        $(id).addClass("is-valid");
	        $(id).parent().find(".invalid-feedback").text("");
	    },

	    displayMessageError: function displayMessageError(id, msg) {
	    	$(id).removeClass("is-valid");
	        $(id).removeClass("is-invalid");
	        $(id).addClass("is-invalid");
	        if(msg !== undefined && msg !== null && msg !== "")
	        	$(id).parent().find(".invalid-feedback").text(msg);
	    },

	    parse: function parse(id, parseFunction, opc) {
	        let input = $(id);
	        let argument = input.val();
	        let msg = null;
	        let required = $(id).attr("required");

	        let notNull = parser.parseNotNull(argument);

	        if(notNull.ok) {
	            let result = parseFunction(argument, opc);
	            msg = result.msg;
	        }
	        else if(required) {
	            msg = notNull.msg;
	        }

	        let ok = (msg === null || msg === "");
	        
	        if(!ok) {
	            parser.displayMessageError(id, msg);
	        }
	        else {
	            parser.cleanMessageError(id);
	        }
	        
	        return ok;
	    }
				
	};
	
});