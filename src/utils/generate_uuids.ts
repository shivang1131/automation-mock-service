import { v4 as uuidv4 } from "uuid";

/**
 * Generate a random UUID
 * @returns {string} A randomly generated UUID
 */
export const generateRandomUUID = (): string => {
    return uuidv4();
};

// Example usage



export default generateRandomUUID;