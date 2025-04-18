import React from "react";
import { sleep } from "@/lib/helpers";

const TestServer = async () => {
    await sleep(3000);
    return <h1>TestServer</h1>;
};

export default TestServer;
