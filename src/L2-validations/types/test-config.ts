export interface ValidationConfig {
    runAllValidations: boolean;
}

export type validationOutput = {
    valid: boolean;
    errorCode?: number;
    description?: string;
}[];

export type ExternalData = {};

export type validationInput = {
    payload: any;
    externalData: ExternalData;
    config: ValidationConfig;
};

export type testFunctionArray = Array<
    (input: validationInput) => validationOutput
>;
