import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],
    pages: { signIn: "/sign-in" },
    callbacks: {
        authorized: async ({ auth }) => {
            return !!auth;
        },
        signIn: async ({ user }) => {
            try {
                const { email, name } = user;
                if (!name || !email) {
                    throw new Error(
                        "Invalid user credentials. Failed to sign in"
                    );
                }
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/api/guest/get?email=${email}`
                );
                const data = await response.json();
                const { guest } = data;
                // if the guest doesn't exist in the db -> create one
                if (!guest) {
                    const responsePost = await fetch(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/api/guest/create`,
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name, email }),
                        }
                    );
                    const { guest: newGuest } = await responsePost.json();
                    if (!newGuest) {
                        return false;
                    }
                    user.id = newGuest.at(0).id;
                }
                if (guest) {
                    user.id = guest.id;
                }
                return true;
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                return false;
            }
        },
        jwt: async ({ token, user }) => {
            if (user) {
                token.email = user.email;
                token.id = user.id;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token.email && token.id) {
                session.user.email = token.email;
                session.user.id = token.id.toString();
            }
            return session;
        },
    },
    events: {},
});
