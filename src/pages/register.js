import HeadMeta from "../components/elements/HeadMeta";
import HeaderThree from "../components/header/HeaderThree";
import FooterOne from "../components/footer/FooterOne";
import SignUp from "../components/authenticate/SignUp";

const LogIn = () => {
    return (
        <div>
            <>
                <HeadMeta metaTitle="LogIn" />
                <HeaderThree />
                <SignUp />
                <FooterOne />
            </>
        </div>
    );
}

export default LogIn;