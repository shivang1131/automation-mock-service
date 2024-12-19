import payloadUtils from "../utils/json-path-utils";
import validations from "../utils/validation-utils";
import {
    testFunctionArray,
    validationInput,
    validationOutput,
} from "../types/test-config";

export default function init(input: validationInput): validationOutput {
    const scope = payloadUtils.getJsonPath(input.payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = input.externalData;

        function Category_id_is_correctly_mapped(
            input: validationInput,
        ): validationOutput {
            const scope = payloadUtils.getJsonPath(input.payload, "$");
            for (const testObj of scope) {
                testObj._EXTERNAL = input.externalData;
                const attr = payloadUtils.getJsonPath(
                    testObj,
                    "$.message.order.payments[*].tags[?(@.descriptor.code=='BUYER_FINDER_FEES')].list[?(@.descriptor.code=='BUYER_FINDER_FEES_PERCENTAGE')].value",
                );
                const buyer_finder_fees = payloadUtils.getJsonPath(
                    testObj,
                    "$._EXTERNAL.buyer_app_finder_fees",
                );

                const validate = validations.equalTo(attr, buyer_finder_fees);

                if (!validate) {
                    return [
                        {
                            valid: false,
                            errorCode: 30000,
                            description: `- **condition A**: $.message.order.payments[*].tags[?(@.descriptor.code=='BUYER_FINDER_FEES')].list[?(@.descriptor.code=='BUYER_FINDER_FEES_PERCENTAGE')].value must be equal to $._EXTERNAL.buyer_app_finder_fees`,
                        },
                    ];
                }
            }
            return [{ valid: true }];
        }
        function Items_sent_in_init_and_select_are_the_same(
            input: validationInput,
        ): validationOutput {
            const scope = payloadUtils.getJsonPath(input.payload, "$");
            for (const testObj of scope) {
                testObj._EXTERNAL = input.externalData;
                const attr = payloadUtils.getJsonPath(
                    testObj,
                    "$.message.order.items[*].id",
                );
                const item_ids = payloadUtils.getJsonPath(
                    testObj,
                    "$._EXTERNAL.selected_ids[*]",
                );

                const validate = validations.equalTo(attr, item_ids);

                if (!validate) {
                    return [
                        {
                            valid: false,
                            errorCode: 30000,
                            description: `- **condition A**: $.message.order.items[*].id must be equal to $._EXTERNAL.selected_ids[*]`,
                        },
                    ];
                }
            }
            return [{ valid: true }];
        }

        const testFunctions: testFunctionArray = [
            Category_id_is_correctly_mapped,
            Items_sent_in_init_and_select_are_the_same,
        ];

        let invalidResults: validationOutput = [];
        for (const fn of testFunctions) {
            const subResult = fn(input).filter((r) => !r.valid);
            invalidResults = [...invalidResults, ...subResult];
            if (!input.config.runAllValidations && invalidResults.length > 0) {
                return invalidResults;
            }
        }
        if (invalidResults.length > 0) {
            return invalidResults;
        }
    }
    return [{ valid: true }];
}
