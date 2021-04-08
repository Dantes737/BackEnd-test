class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }
    static authError(message) {
        return new ApiError(401, message);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
    static dataBaseErrors(message) {
        return new ApiError(502, message);
    }
};

module.exports=ApiError;