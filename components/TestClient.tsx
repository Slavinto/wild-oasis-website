"use client";
import React from "react";

const TestClient = ({ data }: { data: any[] }) => {
    console.log({ data });
    return (
        <ul>
            <button>OK</button>
            {data.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
};

export default TestClient;
