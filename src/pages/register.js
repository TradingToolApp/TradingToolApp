import HeadMeta from "../components/elements/HeadMeta";
import HeaderFive from "../components/header/HeaderFive";
import FooterOne from "../components/footer/FooterOne";
import SignUp from "../components/authenticate/SignUp";

const Register = () => {
    return (
        <>
            <HeadMeta metaTitle="Register"/>
            <HeaderFive/>
            <SignUp/>
            <FooterOne/>
        </>
    );
}

export default Register;