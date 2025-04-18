import { auth } from "@/auth";
import Image from "next/image";
import { HiUser } from "react-icons/hi2";

const UserAvatar = async () => {
    const session = await auth();

    return (
        <div className='w-8 h-8 relative flex items-center justify-center pb-1'>
            {session?.user && session.user.image ? (
                <Image
                    className='rounded-full object-cover'
                    src={session.user.image}
                    alt='user avatar image'
                    fill
                    referrerPolicy='no-referrer'
                />
            ) : (
                <HiUser />
            )}
        </div>
    );
};

export default UserAvatar;
