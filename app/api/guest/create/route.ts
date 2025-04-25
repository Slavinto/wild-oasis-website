import { createGuest } from "@/lib/data-service";

export async function POST(request: Request) {
    try {
        const credentials = await request.json();

        const guest = await createGuest(credentials);

        return Response.json({
            status: 201,
            message: "Guest successfully created",
            guest,
        });
    } catch (error) {
        return Response.json({
            status: 500,
            message: "Failed to create a new guest in supabase",
            error: JSON.stringify(error),
        });
    }
}
