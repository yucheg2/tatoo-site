const validator = (data, config) => {
    const errors = {};
    const validate = (validateMethod, config, data) => {
        let statusValidate;
        switch (validateMethod) {
        case "min":{
            statusValidate = (data.length >= config.value);
            break;
        }
        case "isCapital":{
            const capitalRegExp = /[A-Z]+/g;
            statusValidate = capitalRegExp.test(data);
            break;
        }
        case "isDigit":{
            const digitRegExp = /\d+/g;
            statusValidate = digitRegExp.test(data);
            break;
        }
        case "isPhone":{
            const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{3}?\)?[-.\s]?\d{3}[-.\s]?\d{2}[-.\s]?\d{2,9}$/g;
            statusValidate = phoneRegExp.test(data);
            break;
        }
        case "isEmail":{
            const emailRegExp = /^\S+@\S+\.\S+$/g;
            statusValidate = emailRegExp.test(data);
            break;
        }
        default:
            break;
        }
        if (!statusValidate) {
            return config.message;
        };
    };
    Object.keys(data).forEach((fieldName) => {
        config[fieldName] && Object.keys(config[fieldName]).forEach((validateMethod) => {
            const error = validate(
                validateMethod,
                config[fieldName][validateMethod],
                data[fieldName]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        });
    });
    return errors;
};

export default validator;
