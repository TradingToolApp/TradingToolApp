import {useState, useEffect} from 'react';
import {useSession} from "next-auth/react"
import router from "next/router";

export default function useCurrentSession<T>() {
    const {data: session, status} = useSession();
    const [profile, setProfile] = useState<any>({});

    useEffect(() => {
        if (session)
            setProfile(session.user);
    }, [session]);

    const redirect = async (route: any) => {
        switch (route) {
            case "/dashboard":
                if (profile.role === "ADMIN") {
                    await router.push("/admin/dashboard/posts");
                }
                if (profile.role === "USER") {
                    await router.push(`/user/dashboard/${profile.id}`);
                }
        }
    }

    return {profile, status, session, redirect};
}