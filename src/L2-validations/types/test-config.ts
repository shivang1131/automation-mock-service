export interface ValidationConfig {
    runAllValidations: boolean;
}

export type validationOutput = {
    valid: boolean;
    errorCode?: number;
    description?: string;
}[];

export type ExternalData = {
    transaction_id?: string[];
    buyer_app_finder_fees?: string[];
    vehicle_category?: string[];
    start_code?: string[];
    end_code?: string[];
    selected_ids?: string[];
    category_ids?: string[];
};

export type validationInput = {
    payload: any;
    externalData: ExternalData;
    config: ValidationConfig;
};

export type testFunctionArray = Array<
    (input: validationInput) => validationOutput
>;
