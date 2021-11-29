const Crypto = require('crypto');

export const upperCaseFirstLetterOfSentence = (string: string): string => {
    return string[0].toUpperCase() + string.substr(1, string.length);
}

export const generateRandomCode = (length: number = 7): string => {
    return Crypto
        .randomBytes(length)
        .toString('hex')
        .slice(0, length);
}