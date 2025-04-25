import { ReactNode } from "react";
import { Header } from "@/components";
import { Josefin_Sans, Figtree } from "next/font/google";
import "@/styles/globals.css";
import "react-day-picker/style.css";
import CabinReservationContextProvider from "@/components/cabinReservation/CabinReservationContextProvider";

export const metadata = {
    title: {
        template: "The Wild Oasis%s",
        default: "The Wild Oasis | Welcome",
    },
    description:
        "Luxurious cabin hotel, located in the heart of Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const josefin = Josefin_Sans({
    subsets: ["latin"],
    display: "swap",
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const figtree = Figtree({
    subsets: ["latin"],
    display: "swap",
});

export default async function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html lang='en' className='font-primary'>
            <body className='bg-primary-950 flex flex-col text-primary-100 min-h-screen relative'>
                <Header />
                <div className='grid flex-1 px-8 py-12'>
                    <main className='mx-auto w-full'>
                        <CabinReservationContextProvider>
                            {children}
                        </CabinReservationContextProvider>
                    </main>
                </div>
            </body>
        </html>
    );
}
