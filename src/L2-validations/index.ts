import on_search from "./api-tests/on_search";
import select from "./api-tests/select";
import on_select from "./api-tests/on_select";
import init from "./api-tests/init";
import on_init from "./api-tests/on_init";
import confirm from "./api-tests/confirm";
import on_confirm from "./api-tests/on_confirm";

export function performL2Validations(
    action: string,
    payload: any,
    allErrors = false,
    externalData = {},
) {
    const duplicate = structuredClone(payload);
    switch (action) {
        case "on_search":
            return on_search({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        case "select":
            return select({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        case "on_select":
            return on_select({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        case "init":
            return init({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        case "on_init":
            return on_init({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        case "confirm":
            return confirm({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        case "on_confirm":
            return on_confirm({
                payload: duplicate,
                externalData: externalData,
                config: {
                    runAllValidations: allErrors,
                },
            });
        default:
            throw new Error("Action not found");
    }
}
