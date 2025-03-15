import {useRouter} from 'next/navigation';
import {useSession} from "next-auth/react";
import {useGetUserById} from "@/hooks/data/user/useUser";
import {DUserSession} from "@/utils/types/user";

export default function useCurrentUser() {
    const {data: session, status} = useSession();
    const router = useRouter();
    // @ts-ignore
    const id = session?.user.id;
    const {profile} = useGetUserById(id, session);

    const redirect = (route: any) => {
        switch (route) {
            case "/dashboard":
                localStorage.setItem("sidebarActiveKey", "1-1");
                if (profile.role === "ADMIN") {
                    return router.push("/admin/dashboard/posts");
                }
                if (profile.role === "USER") {
                    return router.push(`/user/dashboard/${id}`);
                }
        }
    }

    const user: DUserSession = {
        status,
        profile,
        redirect,
        expires: session?.expires,
    }

    return user;
}