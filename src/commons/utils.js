
export const objectToQueryString = (paramsObj) => {
    return new URLSearchParams(paramsObj).toString();
}

export const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
}

export const isNumber = (value) => {
    return /^-?\d+$/.test(value);
}

export const timeStringToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);

    return hours * 60 + minutes + seconds / 60;
}

