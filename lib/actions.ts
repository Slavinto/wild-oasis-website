"use server";
import { signIn, signOut } from "@/auth";

export async function signInUser() {
    await signIn("google", { redirectTo: "/account" });
}

export async function signOutUser() {
    await signOut({ redirectTo: "/" });
}
