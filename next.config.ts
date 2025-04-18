import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        // domains: [
        //     "celmjprfyjilientjbck.supabase.co",
        //     "lh3.googleusercontent.com",
        //     "authjs.dev",
        // ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "celmjprfyjilientjbck.supabase.co",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "**.googleusercontent.com",
                port: "",
                search: "",
            },
            {
                protocol: "https",
                hostname: "authjs.dev/img/providers",
                port: "",
                search: "",
            },
        ],
    },
};

export default nextConfig;
