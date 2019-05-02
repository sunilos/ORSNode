/**
 * JSON Response to the http request 
 */
class Response  {
    constructor(err,result) {
        this.success= false;
        this.result = '';
        if(err){
            this.success= false;
            this.result = err;            
        }else{
            this.success= true;
            this.result = result;            
        }
    };
}

module.exports = Response;