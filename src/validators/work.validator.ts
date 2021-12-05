import {
    IsNotEmpty, validate, MinLength
} from 'class-validator';
import { buildErrorValidation } from '../helpers/validator.helper';
import IWork from '../interfaces/work.interface';

export class WorkValidator implements IWork {
    @MinLength(5)
    @IsNotEmpty()
    name: string | undefined;

    @IsNotEmpty()
    description: string | undefined;
}

export const validateWork = async (body: IWork): Promise<boolean | object> => {
    let _class = new WorkValidator();
    _class.name = body.name;
    _class.description = body.description;
    const errors = await validate(_class);
    return errors.length > 0 ? buildErrorValidation(errors) : true;
}