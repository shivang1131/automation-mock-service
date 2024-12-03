import validations from "../../utils/validation-utils";
import payloadUtils from "../../utils/payload-utils";
import { getError } from "../errors/errors";

function check_maximum_quantity(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.items[*].quantity.selected.count",
        );
        const maximum = payloadUtils.getJsonPath(
            testObj,
            "$._EXTERNAL.maximum_quantity",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.EQUAL_TO(attr, maximum);
        if (!output)
            return {
                valid: false,
                errorCode: 40002,
            };
    }
    return { valid: true };
}

const testFunctions: Array<
    (
        payload: any,
        externalData: any,
    ) => {
        valid: boolean;
        errorCode?: number;
    }
> = [check_maximum_quantity];

export function validateSelect(payload: string, externalData = {}) {
    for (const fn of testFunctions) {
        const result = fn(payload, externalData);
        if (result.errorCode && !result.valid) {
            return { valid: false, error: getError(result.errorCode) };
        }
    }
    return { valid: true };
}
