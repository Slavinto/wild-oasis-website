"use server";
import { auth, signIn, signOut } from "@/auth";
import { isValidInput } from "./helpers";
import { updateGuest } from "./data-service";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
    console.log({ formData });

    const session = await auth();
    const user = session?.user;
    const id = user?.id;

    if (!user || !id)
        throw new Error("You must be logged in to perform this action");

    const national_id = formData.get("nationalID")?.toString();
    const nationalityStr = (formData.get("nationality") as string).split("%");
    const [nationality, country_flag] = nationalityStr;
    if (!national_id) {
        throw new Error("Invalid nationalID value");
    }
    const formValues = [nationality, national_id, country_flag];

    if (isValidInput(formValues)) {
        await updateGuest(Number(id), {
            national_id,
            nationality,
            country_flag,
        });

        revalidatePath("/account/profile");
    } else {
        throw new Error("Invalid form input");
    }
}

export async function signInUser() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutUser() {
    await signOut({ redirectTo: "/" });
}

export async function deleteReservation(formData: FormData) {
    console.log(formData.get("bookingId"));
}
