"use strict"

// error field 

const uniqueMessage = error => {
    let output;
    try {
        let fieldName = error.message.subString(
            error.message.lastIndexOf(".$")+ 2,
            error.message.lastIndexOf("_1")
        );
        output = fieldName.charAt(0).toUpperCase() +
        fieldName.slice(1) + "already exist"
    } catch(ex) {
        output = "unique field already exist"
    }
    return output;
};



exports.errorHandler = error => {
    let message = "";
    if(error.code) {
        switch(error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default: 
                message = "Something went wrong"
        }
    } else {
        for (let errorName in error.errorors) {
            if(error.errorors[errorName].message)
                message = error.errorors[errorName].message;
        }
    }
    return message
};