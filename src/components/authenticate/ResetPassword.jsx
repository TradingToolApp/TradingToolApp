import React, {useRef} from "react";
import Link from "next/link";
import axios from "axios";
import {Text} from "rsuite";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import FormGroup from "../contact/FormGroup";
import useWindowSize from "@/hooks/useWindowSize";
import useTranslation from "@/hooks/useTranslation";
import useValidator from "@/hooks/useValidator";
import {useRouter} from "next/router";
import {useSearchParams} from "next/navigation";

const ResetPassword = () => {
    const t = useTranslation();
    const validator = useValidator();
    const {screenHeight} = useWindowSize();
    const router = useRouter();
    const form = useRef();
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [error, setError] = React.useState({
        password: "",
        cpassword: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();

        const password = form.current.password.value;
        const cpassword = form.current.cpassword.value;

        const passValidate = validator.passwordValidator(password);
        const cpassValidate = validator.confirmPasswordValidator(cpassword, password);

        setError((prev) => ({
            ...prev,
            password: passValidate.error,
            cpassword: cpassValidate.error,
        }));

        if (!passValidate.isTrue || !cpassValidate.isTrue) {
            return;
        }

        try {
            const response = await axios.post("/api/auth/reset-password", {password, token});

            if (!response.data.success) {
                return toast.error(response.data.message, toastConfig.error);
            }

            toast.success(response.data.message, toastConfig.success);
            return router.push("/login");
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center max-2xl:min-h-52" style={{height: `${screenHeight - 241}px`}}>
            <div className="axil-contact-form-block m-b-xs-30 w-1/2 align-content-center h-100">
                <div className="section-title d-block">
                    <h2 className="h3 axil-title m-b-xs-20">{t.resetPassword.title}</h2>
                    <p>
                        {t.resetPassword.description}
                    </p>
                </div>
                <div className="axil-contact-form-wrapper p-t-xs-10">
                    <form className="axil-contact-form row no-gutters" ref={form} onSubmit={handleSubmit}>
                        <FormGroup pClass="col-12" type="password" label="Password" name="password">
                            {error.password.length !== 0 &&
                                <Text className="position-absolute" color="red" size="sm">{error.password}</Text>}
                        </FormGroup>
                        <FormGroup pClass="col-12" type="password" label="Confirm Password" name="cpassword">
                            {error.cpassword.length !== 0 &&
                                <Text className="position-absolute" color="red" size="sm">{error.cpassword}</Text>}
                        </FormGroup>
                        <div className="col-12 text-center">
                            <button className="btn btn-primary m-t-xs-0 m-t-lg-20">
                                {t.resetPassword.submit}
                            </button>
                        </div>
                    </form>
                    <div className="axil-contact-form-block m-b-xs-30 w-1/2">
                        <div className="col-12">
                            <div className="text-center font-weight-light">
                                <Link href={"/login"}>
                                    {t.resetPassword.login}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;