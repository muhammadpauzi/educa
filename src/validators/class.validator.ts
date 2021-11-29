import {
    IsNotEmpty, validate, MinLength
} from 'class-validator';
import { buildErrorValidation } from '../helpers/validator.helper';
import IClass from '../interfaces/class.interface';

export class ClassValidator implements IClass {
    @MinLength(5)
    @IsNotEmpty()
    name: string | undefined;

    @IsNotEmpty()
    room: string | undefined;

    @MinLength(5)
    @IsNotEmpty()
    code: string | undefined;
}

export const validateClass = async (body: IClass): Promise<boolean | object> => {
    let _class = new ClassValidator();
    _class.name = body.name;
    _class.room = body.room;
    _class.code = body.code;
    const errors = await validate(_class);
    return errors.length > 0 ? buildErrorValidation(errors) : true;
}