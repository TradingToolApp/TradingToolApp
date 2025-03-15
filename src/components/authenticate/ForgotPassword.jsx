import {useRef} from "react";
import Link from "next/link";
import axios from "axios";
import {Text} from "rsuite";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import FormGroup from "../contact/FormGroup";
import useWindowSize from "@/hooks/useWindowSize";
import useTranslation from "@/hooks/useTranslation";

const ForgotPassword = () => {
    const t = useTranslation();
    const form = useRef();
    const {screenHeight} = useWindowSize();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = form.current.email.value;

        try {
            const response = await axios.post("/api/auth/forgot-password", {email});
            if (response.data.success) {
                return toast.success(response.data.message, toastConfig.success);
            } else {
                return toast.error(response.data.message, toastConfig.error);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center max-2xl:min-h-52" style={{height: `${screenHeight - 240}px`}}>
            <div className="axil-contact-form-block m-b-xs-30 w-1/2 align-content-center h-100">
                <div className="section-title d-block">
                    <h2 className="h3 axil-title m-b-xs-20">{t.forgotPassword.title}</h2>
                    <p>
                        {t.forgotPassword.description}
                    </p>
                </div>
                <div className="axil-contact-form-wrapper p-t-xs-10">
                    <form className="axil-contact-form row no-gutters" ref={form} onSubmit={handleSubmit}>
                        <FormGroup pClass="col-12" type="email" label="Email" name="email"/>
                        <div className="col-12 text-center">
                            <button className="btn btn-primary m-t-xs-0 m-t-lg-20">
                                {t.forgotPassword.submit}
                            </button>
                        </div>
                    </form>
                    <div className="axil-contact-form-block m-b-xs-30 w-1/2">
                        <div className="col-12">
                            <div className="text-center font-weight-light">
                                <Link href={"/login"}>
                                    {t.forgotPassword.login}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;