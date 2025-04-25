import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition, useEffect, useRef } from "react";

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
                router.replace(`${pathname}?${params.toString()}`, {
                    scroll: false,
                });
            });
        },
        [searchParams, pathname, router]
    );

    return { createQueryString, isPending };
};

export const useClickOutside = (
    handler: () => void,
    listenCapturing: boolean = true,
    ignoreClass?: string
) => {
    const ref = useRef<HTMLDivElement | HTMLUListElement | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(e.target as Node) &&
                !(e.target as HTMLElement)?.closest(ignoreClass || "")
            ) {
                handler();
            }
        };
        document.addEventListener("click", handleClick, listenCapturing);
        return () => {
            document.removeEventListener("click", handleClick, listenCapturing);
        };
    }, [handler, ref, listenCapturing, ignoreClass]);

    return { ref };
};
