import HeadMeta from "../components/elements/HeadMeta";
import HeaderThree from "../components/header/HeaderThree";
import FooterOne from "../components/footer/FooterOne";
import SignUp from "../components/authenticate/SignUp";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Register = () => {
    const router = useRouter();
    const { status } = useSession({ required: true })

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "authenticated") {
        router.push("/admin/dashboard/posts");
        return null;
    }
    return (
        <>
            <HeadMeta metaTitle="LogIn" />
            <HeaderThree />
            <SignUp />
            <FooterOne />
        </>
    );
}

export default Register;