import { getGuest } from "@/lib/data-service";
import { handleError } from "@/lib/helpers";

export async function GET(request: Request) {
    console.log({ request });
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            throw new Error("Failed to load guest data. Invalid email address");
        }

        console.log("__________________________________________________");
        console.log({ email });
        const guest = await getGuest(email);
        console.log("__________________________________________________");
        return Response.json({ status: 200, message: "success", guest });
    } catch (error) {
        throw new Error(handleError(error).message);
    }
}
