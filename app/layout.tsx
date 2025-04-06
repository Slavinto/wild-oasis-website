import { Logo, Navigation } from "@/components";
import { ReactNode } from "react";
// import "./globals.css";

export const metadata = {
    title: "The Wild Oasis",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <body>
                <header>
                    <Logo />
                </header>
                <Navigation />
                <main>{children}</main>
            </body>
        </html>
    );
}
