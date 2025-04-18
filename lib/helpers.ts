export const sleep = async (ms: number) => {
    console.log("suspending");
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const toSupabaseTimestamp = (date: Date) => {
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString().replace("Z", "+00:00");
};

export function hasProp<T extends string>(
    value: unknown,
    prop: T
): value is {
    [K in T]: string;
} {
    return typeof value === "object" && value !== null && prop in value;
}

export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        return error;
    }
    if (error && hasProp(error, "message")) {
        return new Error(error.message);
    }
    return new Error(JSON.stringify(error));
};
