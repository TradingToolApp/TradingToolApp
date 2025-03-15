import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import FooterOne from "@/components/footer/FooterOne";
import ResetPassword from "@/components/authenticate/ResetPassword";

const ResetPasswordPage = () => {
    return (
        <>
            <HeadMeta metaTitle="Reset Password"/>
            <HeaderFive/>
            <ResetPassword/>
            <FooterOne/>
        </>
    );
}

export default ResetPasswordPage;