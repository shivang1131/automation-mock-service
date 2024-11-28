import validations from "../utils/validation-utils";
import payloadUtils from "../utils/payload-utils";

function test1(payload: any) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        const reg = ["regex"];
        const temp = payloadUtils.getJsonPath(testObj, "context.action");
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.FOLLOW_REGEX(temp, reg);
        if (!output) return false;
    }
    return true;
}
