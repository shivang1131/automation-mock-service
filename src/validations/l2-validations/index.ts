import { validateSearch } from "./search";

export async function performL2Validations(
    action: string,
    payload: string,
    externalData = {},
) {
    switch (action) {
        case "search":
            return validateSearch(payload, externalData);
        default:
            throw new Error("Action not found");
    }
}
