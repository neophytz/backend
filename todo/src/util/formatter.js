exports.http_formatter = (message, data=null, success=true) => {
    if(success===false && data.code === 11000){
        message = '';
        Object.keys(data.keyValue).forEach(key => {
            message += `${key} : ${data.keyValue[key]} already exists in our record.`
        })
    }
    return {message, data, success};
}