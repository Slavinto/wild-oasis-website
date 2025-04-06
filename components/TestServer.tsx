import React from "react";
import TestClient from "./TestClient";

const Test = async () => {
    let result;
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        result = await response.json();
        console.log({ result });
    } catch (error) {
        console.error(error);
    }

    return <TestClient data={result} />;
};

export default Test;
