import HeadMeta from "../components/elements/HeadMeta";
import HeaderThree from "../components/header/HeaderThree";
import FooterOne from "../components/footer/FooterOne";
import SignIn from "../components/authenticate/SignIn";

const LogIn = () => {
    return (
        <>
            <HeadMeta metaTitle="LogIn" />
            <HeaderThree />
            <SignIn />
            <FooterOne />
        </>
    );
}

export default LogIn;