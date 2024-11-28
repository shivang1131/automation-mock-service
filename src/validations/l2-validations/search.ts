import validations from "../../utils/validation-utils";
import payloadUtils from "../../utils/payload-utils";
import { getError } from "../errors/errors";

function check_start_gps_precision(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.intent.fulfillment.stops[?(@.type=='START')].location.gps",
        );
        const reg = ["/^d+.d{6}$/"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.FOLLOW_REGEX(attr, reg);
        if (!output)
            return {
                valid: false,
                errorCode: 40000,
            };
    }
    return { valid: true };
}

function check_end_gps_precision(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.intent.fulfillment.stops[?(@.type=='END')].location.gps",
        );
        const reg = ["/^d+.d{6}$/"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.FOLLOW_REGEX(attr, reg);
        if (!output)
            return {
                valid: false,
                errorCode: 40001,
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
> = [check_start_gps_precision, check_end_gps_precision];

export function validateSearch(payload: string, externalData = {}) {
    for (const fn of testFunctions) {
        const result = fn(payload, externalData);
        if (result.errorCode && !result.valid) {
            return { valid: false, error: getError(result.errorCode) };
        }
    }
    return { valid: true };
}
