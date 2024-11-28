import validations from "../../utils/validation-utils";
import payloadUtils from "../../utils/payload-utils";
import { getError } from "../errors/errors";

function payments_test(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(
        payload,
        "$.message.order.payments[*]",
    );
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const status = payloadUtils.getJsonPath(testObj, "$.status");
        const enumList = ["PAID"];
        const transId = payloadUtils.getJsonPath(
            testObj,
            "$.params.transaction_id",
        );
        const nulls = ["null"];
        const skipCheck = validations.NONE_IN(status, enumList);
        if (skipCheck) continue;
        const output = validations.NONE_IN(transId, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_1(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.context.location.country.code",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_2(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.context.location.city.code",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_3(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.domain");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_4(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.timestamp");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_5(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.bap_id");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_6(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.context.transaction_id",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_7(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.message_id");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_8(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.version");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_9(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.action");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_10(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.bap_uri");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_11(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.ttl");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_12(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.bpp_id");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_13(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.context.bpp_uri");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_14(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(testObj, "$.message.order.id");
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_15(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.items[*].id",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_16(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.items[*].quantity.selected.count",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_17(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.provider.id",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_18(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].id",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_19(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].collected_by",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_20(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].status",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_21(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].type",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_22(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].params.transaction_id",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_23(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].params.currency",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_24(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].params.amount",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_25(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].collected_by",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_26(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].descriptor.name",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_27(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].descriptor.name",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_28(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].collected_by",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_29(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].value",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_30(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].value",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_31(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].value",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_32(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].value",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_33(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].value",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_34(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].tags[*].list[*].value",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_35(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].params.transaction_id",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_36(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].params.currency",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_attribute_37(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const attr = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].params.amount",
        );
        const nulls = ["null"];
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.NONE_IN(attr, nulls);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_1(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["confirm"];
        const enumPath = payloadUtils.getJsonPath(testObj, "$.context.action");
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_2(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["IND"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.context.location.country.code",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_3(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["std:080"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.context.location.city.code",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_4(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["ONDC:TRV11"];
        const enumPath = payloadUtils.getJsonPath(testObj, "$.context.domain");
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_5(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["SJT", "SFSJT", "RJT", "PASS"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.items[*].descriptor.code",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_6(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["BUS", "METRO"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.fulfillments[*].vehicle.category",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_7(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["ROUTE", "TRIP"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.fulfillments[*].type",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_8(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["START", "END", "INTERMEDIATE_STOP", "TRANSIT_STOP"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.fulfillments[*].type",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_9(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["QR"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.fulfillments[*].stops[*].authorization.type",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_10(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["UNCLAIMED", "CLAIMED"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.fulfillments[*].stops[*].authorization.status",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_11(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["NOT-PAID", "PAID"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].status",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_12(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["BPP", "BAP"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].collected_by",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_13(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = ["PRE-ORDER", "ON-FULFILLMENT", "POST-FULFILLMENT"];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.payments[*].type",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
            };
    }
    return { valid: true };
}

function validate_enum_14(payload: any, externalData = {}) {
    const scope = payloadUtils.getJsonPath(payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = externalData;

        const enumList = [
            "BASE_PRICE",
            "REFUND",
            "CANCELLATION_CHARGES",
            "OFFER",
            "TOLL",
        ];
        const enumPath = payloadUtils.getJsonPath(
            testObj,
            "$.message.order.quote.breakup[*].title",
        );
        const skipCheck = false;
        if (skipCheck) continue;
        const output = validations.ALL_IN(enumPath, enumList);
        if (!output)
            return {
                valid: false,
                errorCode: 30000,
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
> = [
    payments_test,
    validate_attribute_1,
    validate_attribute_2,
    validate_attribute_3,
    validate_attribute_4,
    validate_attribute_5,
    validate_attribute_6,
    validate_attribute_7,
    validate_attribute_8,
    validate_attribute_9,
    validate_attribute_10,
    validate_attribute_11,
    validate_attribute_12,
    validate_attribute_13,
    validate_attribute_14,
    validate_attribute_15,
    validate_attribute_16,
    validate_attribute_17,
    validate_attribute_18,
    validate_attribute_19,
    validate_attribute_20,
    validate_attribute_21,
    validate_attribute_22,
    validate_attribute_23,
    validate_attribute_24,
    validate_attribute_25,
    validate_attribute_26,
    validate_attribute_27,
    validate_attribute_28,
    validate_attribute_29,
    validate_attribute_30,
    validate_attribute_31,
    validate_attribute_32,
    validate_attribute_33,
    validate_attribute_34,
    validate_attribute_35,
    validate_attribute_36,
    validate_attribute_37,
    validate_enum_1,
    validate_enum_2,
    validate_enum_3,
    validate_enum_4,
    validate_enum_5,
    validate_enum_6,
    validate_enum_7,
    validate_enum_8,
    validate_enum_9,
    validate_enum_10,
    validate_enum_11,
    validate_enum_12,
    validate_enum_13,
    validate_enum_14,
];

export function validateConfirm(payload: string, externalData = {}) {
    for (const fn of testFunctions) {
        const result = fn(payload, externalData);
        if (result.errorCode && !result.valid) {
            return { valid: false, error: getError(result.errorCode) };
        }
    }
    return { valid: true };
}