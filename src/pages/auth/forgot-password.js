import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import FooterOne from "@/components/footer/FooterOne";
import ForgotPassword from "@/components/authenticate/ForgotPassword";

const ForgotPasswordPage = () => {
    return (
        <>
            <HeadMeta metaTitle="Forgot Password"/>
            <HeaderFive/>
            <ForgotPassword/>
            <FooterOne/>
        </>
    );
}

export default ForgotPasswordPage;