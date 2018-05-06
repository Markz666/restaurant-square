
const crypto = require("crypto");
const token = {
    createToken: function(obj, timeout) {
        const obj2 = {
            data: obj, //payload
            created: parseInt(Date.now() / 1000),
        };

        //payload info
        const base64Str = Buffer.from(JSON.stringify(obj2),"utf8").toString("base64");

        //add signature
        const secret = "tech ninja";
        const hash = crypto.createHmac('sha256',secret);
            hash.update(base64Str);
        const signature = hash.digest('base64');
        return  base64Str + "." + signature;
    },
    decodeToken: function(token) {
        const decArr = token.split(".");
        if (decArr.length < 2) {
            //token invalid
            return false;
        }

        const payload = {};
        // parse payload json as an object
        try {
            payload = JSON.parse(Buffer.from(decArr[0],"base64").toString("utf8"));
        } catch(e) {
            return false;
        }

        //check the signature
        const secret = "tech ninja";        
        const hash = crypto.createHmac('sha256', secret);
        hash.update(decArr[0]);
        const checkSignature = hash.digest('base64');

        return {
            payload: payload,
            signature: decArr[1],
            checkSignature: checkSignature
        }
    },
    checkToken: function(token) {
        const resDecode = this.decodeToken(token);
        if (!resDecode) {
            return false;
        }

        //check is the token is expired or not
        const expState = (parseInt(Date.now() / 1000) - parseInt(resDecode.payload.created)) > parseInt(resDecode.payload.exp) ? false : true;
        if (resDecode.signature === resDecode.checkSignature && expState) {
            return true;
        }
        return false;
    }
    
}
module.exports = token;