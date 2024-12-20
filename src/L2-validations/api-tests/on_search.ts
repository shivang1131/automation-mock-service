import payloadUtils from "../utils/json-path-utils";
import validations from "../utils/validation-utils";
import {
    testFunctionArray,
    validationInput,
    validationOutput,
} from "../types/test-config";

export default function on_search(input: validationInput): validationOutput {
    const scope = payloadUtils.getJsonPath(input.payload, "$");
    for (const testObj of scope) {
        testObj._EXTERNAL = input.externalData;

        function Buyer_finder_fees_value_is_correct(
            input: validationInput,
        ): validationOutput {
            const scope = payloadUtils.getJsonPath(input.payload, "$");
            for (const testObj of scope) {
                testObj._EXTERNAL = input.externalData;
                const buyer_finder_fees = payloadUtils.getJsonPath(
                    testObj,
                    "$.message.catalog.providers[*].payments[*].tags[?(@.descriptor.code == 'BUYER_FINDER_FEES')].list[?(@.descriptor.code == 'BUYER_FINDER_FEES_PERCENTAGE')].value",
                );
                const buyer_app_finder_fees = payloadUtils.getJsonPath(
                    testObj,
                    "$._EXTERNAL.buyer_app_finder_fees",
                );

                const validate = validations.allIn(
                    buyer_finder_fees,
                    buyer_app_finder_fees,
                );

                if (!validate) {
                    return [
                        {
                            valid: false,
                            errorCode: 30000,
                            description: `- **condition A**: every element of $.message.catalog.providers[*].payments[*].tags[?(@.descriptor.code == 'BUYER_FINDER_FEES')].list[?(@.descriptor.code == 'BUYER_FINDER_FEES_PERCENTAGE')].value must be in $._EXTERNAL.buyer_app_finder_fees`,
                        },
                    ];
                }
            }
            return [{ valid: true }];
        }
        function Vehicle_category_passed_in_is_metro(
            input: validationInput,
        ): validationOutput {
            const scope = payloadUtils.getJsonPath(input.payload, "$");
            for (const testObj of scope) {
                testObj._EXTERNAL = input.externalData;
                const vehicle = payloadUtils.getJsonPath(
                    testObj,
                    "$.message.catalog.providers[*].fulfillments[*].vehicle.category",
                );
                const vehicle_category = payloadUtils.getJsonPath(
                    testObj,
                    "$._EXTERNAL.vehicle_category",
                );

                const validate = validations.allIn(vehicle_category, vehicle);

                if (!validate) {
                    return [
                        {
                            valid: false,
                            errorCode: 30000,
                            description: `- **condition A**: every element of $._EXTERNAL.vehicle_category must be in $.message.catalog.providers[*].fulfillments[*].vehicle.category`,
                        },
                    ];
                }
            }
            return [{ valid: true }];
        }
        function Start_code_matches_the_search_call(
            input: validationInput,
        ): validationOutput {
            const scope = payloadUtils.getJsonPath(input.payload, "$");
            for (const testObj of scope) {
                testObj._EXTERNAL = input.externalData;
                const start_code = payloadUtils.getJsonPath(
                    testObj,
                    "$.message.catalog.providers[0].fulfillments[0].stops[?(@.type == 'START')].location.descriptor.code",
                );
                const start = payloadUtils.getJsonPath(
                    testObj,
                    "$._EXTERNAL.start_code",
                );

                const skipCheck = !validations.arePresent(start);
                if (skipCheck) continue;

                const validate = validations.allIn(start_code, start);

                if (!validate) {
                    return [
                        {
                            valid: false,
                            errorCode: 30000,
                            description: `- **condition A**: every element of $.message.catalog.providers[0].fulfillments[0].stops[?(@.type == 'START')].location.descriptor.code must be in $._EXTERNAL.start_code

	> Note: **Condition A** can be skipped if the following conditions are met:
	>
	> - **condition B**: $._EXTERNAL.start_code must **not** be present in the payload`,
                        },
                    ];
                }
            }
            return [{ valid: true }];
        }
        function End_code_matches_the_search_call(
            input: validationInput,
        ): validationOutput {
            const scope = payloadUtils.getJsonPath(input.payload, "$");
            for (const testObj of scope) {
                testObj._EXTERNAL = input.externalData;
                const end_code = payloadUtils.getJsonPath(
                    testObj,
                    "$.message.catalog.providers[0].fulfillments[0].stops[?(@.type == 'END')].location.descriptor.code",
                );
                const end = payloadUtils.getJsonPath(
                    testObj,
                    "$._EXTERNAL.end_code",
                );

                const skipCheck = !validations.arePresent(end);
                if (skipCheck) continue;

                const validate = validations.allIn(end_code, end);

                if (!validate) {
                    return [
                        {
                            valid: false,
                            errorCode: 30000,
                            description: `- **condition A**: every element of $.message.catalog.providers[0].fulfillments[0].stops[?(@.type == 'END')].location.descriptor.code must be in $._EXTERNAL.end_code

	> Note: **Condition A** can be skipped if the following conditions are met:
	>
	> - **condition B**: $._EXTERNAL.end_code must **not** be present in the payload`,
                        },
                    ];
                }
            }
            return [{ valid: true }];
        }

        const testFunctions: testFunctionArray = [
            Buyer_finder_fees_value_is_correct,
            Vehicle_category_passed_in_is_metro,
            Start_code_matches_the_search_call,
            End_code_matches_the_search_call,
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
