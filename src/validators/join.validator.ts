import {
    IsNotEmpty, validate, MinLength
} from 'class-validator';
import { buildErrorValidation } from '../helpers/validator.helper';
import IJoinClass from '../interfaces/join.interface';

export class JoinClassValidator implements IJoinClass {
    @MinLength(5)
    @IsNotEmpty()
    code: string | undefined;
}

export const validateJoinClass = async (body: IJoinClass): Promise<boolean | object> => {
    let _class = new JoinClassValidator();
    _class.code = body.code;
    const errors = await validate(_class);
    return errors.length > 0 ? buildErrorValidation(errors) : true;
}