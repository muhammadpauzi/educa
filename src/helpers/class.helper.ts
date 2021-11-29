import { Class } from "../models";
import { generateRandomCode } from "../utils/string.util";

export const getAvailableCode = async (): Promise<string> => {
    let code: string = '';
    while (true) {
        code = generateRandomCode();
        const classExists = await Class.findOne({ where: { code } });
        if (!classExists) {
            break;
        }
    }
    return code;
}