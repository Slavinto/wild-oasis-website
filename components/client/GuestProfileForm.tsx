"use client";

import { ProjectTables } from "@/data/enums";
import { Tables } from "@/data/supabaseTypes";
import { updateProfile } from "@/lib/actions";
import Image from "next/image";
import { ReactNode } from "react";
import FormSubmitButton from "./FormSubmitButton";

const GuestProfileForm = ({
    guest,
    children,
}: {
    guest: Tables<ProjectTables.Guests>;
    children: ReactNode;
}) => {
    const { full_name, email, country_flag, national_id } = guest;
    return (
        <form
            action={updateProfile}
            className='max-w-[60rem] bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col'
        >
            <div className='space-y-2'>
                <label>Full name</label>
                <input
                    name='fullName'
                    defaultValue={full_name?.toString()}
                    disabled
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
                />
            </div>

            <div className='space-y-2'>
                <label>Email address</label>
                <input
                    name='email'
                    defaultValue={email?.toString()}
                    disabled
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400'
                />
            </div>

            <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                    <label htmlFor='nationality'>Where are you from?</label>
                    {country_flag ? (
                        <Image
                            width={20}
                            height={20}
                            src={country_flag}
                            alt='Country flag'
                            className='h-5 rounded-sm'
                        />
                    ) : null}
                </div>
                {children}
            </div>

            <div className='space-y-2'>
                <label htmlFor='nationalID'>National ID number</label>
                <input
                    defaultValue={national_id || ""}
                    name='nationalID'
                    className='px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm'
                />
            </div>

            <div className='flex justify-end items-center gap-6'>
                <FormSubmitButton />
            </div>
        </form>
    );
};

export default GuestProfileForm;
