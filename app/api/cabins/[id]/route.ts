import { getBookedDatesByCabinId, getCabin } from "@/lib/data-service";
import { handleError } from "@/lib/helpers";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: number }> }
) {
    try {
        const { id } = await params;
        const [cabin, bookedDates] = await Promise.all([
            getCabin(id),
            getBookedDatesByCabinId(id),
        ]);

        return Response.json({
            status: 200,
            data: {
                requestedId: id,
                description: cabin.description,
                bookedDates,
            },
            message: "success",
        });
    } catch (error) {
        const newError = handleError(error);
        console.error(newError.message);
        return Response.json({
            status: 500,
            message:
                "Failed to fetch cabin or cabin dates: " + newError.message,
        });
    }
}
