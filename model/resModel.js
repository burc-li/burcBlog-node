class BaseModel{

    constructor(data,message){
        //如果传入一个字符串 比如：（"登录失败"），则赋值为this.message
        if(typeof data === 'string'){
            this.message = data;
            data = null;
            message = null;
        }
        if(data)
            this.data = data;
        if(message)
            this.message = message;
    }
}

class SuccessModel extends BaseModel {
    constructor(data,message){
        super(data,message);
        this.success = true;
    }
}

class ErrorModel extends BaseModel {
    constructor(data,message){
        super(data,message);
        this.success = false;
    }
}

module.exports = { SuccessModel, ErrorModel };