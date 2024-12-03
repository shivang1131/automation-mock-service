import { validateSearch } from "./search";
import { validateSelect } from "./select";

export function performL2Validations(
    action: string,
    payload: string,
    externalData = {},
) {
    switch (action) {
        case "search":
            return validateSearch(payload, externalData);
        case "select":
            return validateSelect(payload, externalData);
        default:
            throw new Error("Action not found");
    }
}
