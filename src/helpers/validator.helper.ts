import { ValidationError } from 'class-validator';
import { upperCaseFirstLetterOfSentence } from '../utils/string.util';

export const buildErrorValidation = (validationErrors: ValidationError[]): any => {
    let result: any = {};
    validationErrors.map(error => {
        result[error.property] = error.constraints && upperCaseFirstLetterOfSentence(error.constraints[Object.keys(error.constraints)[0]])
    });
    return result;
}