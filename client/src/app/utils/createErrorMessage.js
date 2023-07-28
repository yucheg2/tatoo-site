/* eslint no-use-before-define: 0 */
const createErrorMessage = (error) => {
    const { code, message } = error.response.data.error;
    if (code === 400) {
        const errorObj = {};
        if (message === "EMAIL_EXISTS") {
            errorObj.email = "Пользователь с таким email уже зарегистрирован.";
            return errorObj;
        } else
        if (message === "EMAIL_NOT_FOUND" || message === "INVALID_PASSWORD" || message === "INVALID_EMAIL" || message === "INVALID_DATA") {
            errorObj.email = "Почта или пароль введены неверно.";
        } else
        if (message === "CREDENTIAL_TOO_OLD_LOGIN_AGAIN") {
            errorObj.password = "Введите пароль чтобы изменить почту";
        } else {
            errorObj.message = message;
        }
        return errorObj;
    } else {
        return { message };
    }
};

export default createErrorMessage;
