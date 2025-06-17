'use client';

import { useRouter } from "next/navigation";

export const useRedirect=()=>{
    const router=useRouter();
    const redirectTo=(path)=>{
        router.push(path)

    }
    return redirectTo;
}