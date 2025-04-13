import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export const useSetSearchParam = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (!value) {
                params.delete(name);
            } else {
                params.set(name, value);
            }
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`, {
                    scroll: false,
                });
            });
        },
        [searchParams, pathname, router]
    );

    return { createQueryString, isPending };
};
