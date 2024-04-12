export const validateNotEmpty = value => {
    console.log(value)
    if (value === undefined || value.trim() === '') {
        return 'This field cannot be empty';
    }
    return null;
};
export const validateNumber = value => {
    if (value === undefined || isNaN(Number(value)) || value.trim() === '') {
        return 'This field must be a number';
    }
    return null;
};

export const validatePositive = value => {
    if (value === undefined || Number(value) <= 0) {
        return 'This field must be a positive number';
    }
    return null;
};