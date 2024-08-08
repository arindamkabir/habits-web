export const truncateString = (str: string, maxLength = 10) => (str.length > maxLength) ? str.slice(0, maxLength) + "..." : str;

export const capitalize = (str: string) => str.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())