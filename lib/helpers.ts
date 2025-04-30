import { formatDistance, parseISO } from "date-fns";

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

export const isValidInput = (value: string | string[]): boolean => {
    const regex = /^[a-zA-Z0-9\-._~:/?#\[\]@!$&'()*+,;=]{1,30}$/;
    // console.log(
    //     !value.find((v) => {
    //         const test = !regex.test(v);
    //         console.log({ value });
    //         console.log(test);
    //     })
    // );
    return typeof value === "string"
        ? regex.test(value)
        : !value.find((v) => !regex.test(v));
};

export const formatDistanceFromNow = (dateStr: string) =>
    formatDistance(parseISO(dateStr), new Date(), {
        addSuffix: true,
    }).replace("about ", "");
