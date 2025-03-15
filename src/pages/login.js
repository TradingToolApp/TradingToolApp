import HeadMeta from "../components/elements/HeadMeta";
import HeaderFive from "../components/header/HeaderFive";
import FooterOne from "../components/footer/FooterOne";
import SignIn from "../components/authenticate/SignIn";

const LogIn = () => {
    return (
        <div>
            <HeadMeta metaTitle="LogIn"/>
            <HeaderFive/>
            <SignIn/>
            <FooterOne/>
        </div>
    );
}

export default LogIn;