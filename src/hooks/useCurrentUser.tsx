import {useRouter} from 'next/navigation';
import userAPI from "@/libs/api-client/restful/user.api";
import {useSession} from "next-auth/react";
import {useQuery} from "@tanstack/react-query";
import {useGetUserById} from "@/hooks/data/user/useUser";

export default function useCurrentUser() {
    const {data: session, status} = useSession();
    const router = useRouter();
    // @ts-ignore
    const id: any = session?.user.id;
    const queryInfo = useGetUserById(id, session);
    // const queryInfo = useQuery({
    //     queryKey: ['currentUser', id],
    //     queryFn: () => userAPI.getUserById(id),
    //     initialData: session?.user,
    //     enabled: !!id
    // })
    const profile = queryInfo.data;

    const redirect = async (route: any) => {
        switch (route) {
            case "/dashboard":
                if (profile.role === "ADMIN") {
                    await router.push("/admin/dashboard/posts");
                }
                if (profile.role === "USER") {
                    await router.push(`/user/dashboard/${id}`);
                }
        }
    }

    return {
        status,
        profile,
        redirect
    };
}