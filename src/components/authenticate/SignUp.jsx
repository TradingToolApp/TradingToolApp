import {useRef, useState} from 'react';
import Link from "next/link";
import {useRouter} from 'next/navigation'
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import PhoneInput from 'react-phone-number-input'
import {Text} from "rsuite";
import useValidator from "@/hooks/useValidator";
import useTranslation from "@/hooks/useTranslation";
import FormGroup from "../contact/FormGroup";
import userAPI from "@/libs/api-client/restful/user.api";

const SignUp = () => {
    const form = useRef();
    const router = useRouter();
    const t = useTranslation();
    const validator = useValidator();
    const [phone, setPhone] = useState()
    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        phone: ""
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            name: form.current.name.value,
            email: form.current.email.value,
            password: form.current.password.value,
            cpassword: form.current.cpassword.value,
            image: "/images/190x190.png"
        };

        //validate
        const nameValidate = validator.nameValidator(data.name);
        const emailValidate = validator.emailValidator(data.email);
        const passValidate = validator.passwordValidator(data.password);
        const cpassValidate = validator.confirmPasswordValidator(data.cpassword, data.password);

        setError((prev) => ({
            ...prev,
            name: nameValidate.error,
            email: emailValidate.error,
            password: passValidate.error,
            cpassword: cpassValidate.error,
        }));

        if (!passValidate.isTrue || !cpassValidate.isTrue || !nameValidate.isTrue || !emailValidate.isTrue) {
            return;
        }

        try {
            const res = await userAPI.createUser(data);

            if (!res.success) {
                return toast.error(res.message, toastConfig.error);
            }

            toast.success("Registration successful! Please check your email box for verifying", toastConfig.success);
            return router.push("/login");
        } catch (err) {
            console.log(err);
        }

        form.current.reset();
    };

    return (
        <div className="w-50 m-auto shadow-lg rounded-3 axil-contact-form-block m-b-xs-30">
            <div className="section-title d-block">
                <h2 className="h3 axil-title m-b-xs-20">{t.register.title}</h2>
                <p>
                    {t.register.description}
                </p>
            </div>
            <div className="axil-contact-form-wrapper p-t-xs-10">
                <form className="axil-contact-form row no-gutters" ref={form} onSubmit={handleRegister}>
                    <FormGroup pClass="col-12" type="text" label="Name" name="name">
                        {error.name.length !== 0 &&
                            <Text className="position-absolute" color="red" size="sm">{error.name}</Text>}
                    </FormGroup>
                    <FormGroup pClass="col-12" type="email" label="Email" name="email">
                        {error.email.length !== 0 &&
                            <Text className="position-absolute" color="red" size="sm">{error.email}</Text>}
                    </FormGroup>
                    <div className="form-group col-12">
                        <PhoneInput className="input-phonenumber"
                                    international
                                    countryCallingCodeEditable={false}
                                    initialValueFormat="national"
                                    defaultCountry="US"
                                    placeholder="Enter phone number"
                                    value={phone}
                                    onChange={setPhone}/>
                        {error.phone.length !== 0 &&
                            <Text className="position-absolute" color="red" size="sm">{error.phone}</Text>}
                    </div>
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
                            {t.register.submit}
                        </button>
                    </div>
                </form>
                <div className="mt-5 w-1/2">
                    <div className="col-12">
                        <div className="text-center font-weight-light">
                            <Link href={"/login"}>
                                {t.register.login}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;