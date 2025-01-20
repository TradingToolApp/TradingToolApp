import FormGroup from "../contact/FormGroup";
// import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert';
import {useRef, useState} from 'react';
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import router from "next/router";
import userAPI from "@/libs/api-client/restful/user.api";

const Result = () => {
    return (
        <Alert variant="success" className="success-msg">
            Your Message has been successfully sent.
        </Alert>
    )
}

const SignUp = () => {
    const form = useRef();

    const [result, showresult] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        const data = {
            email: form.current.email.value,
            password: form.current.password.value,
            phone: form.current.phone.value,
            name: form.current.name.value,
            image: "/images/190x190.png"
        };

        try {
            const res = await userAPI.createUser(data);

            if (!res.success) {
                return toast.error(res.message, toastConfig.error);
            }

            return router.push("/login");
        } catch (err) {
            console.log(err);
        }

        // Add send email code here
        // emailjs.sendForm('service_g3aufzu', 'template_sk4dqiz', form.current, '9L_sRsO66U253zcxC')
        //     .then((result) => {
        //         console.log(result.text);
        //     }, (error) => {
        //         console.log(error.text);
        //     });
        form.current.reset();
        showresult(true);
    };

    setTimeout(() => {
        showresult(false);
    }, 2000);
    return (
        <div className="axil-contact-form-block m-b-xs-30">
            <div className="section-title d-block">
                <h2 className="h3 axil-title m-b-xs-20">Register</h2>
                <p>
                    Your email address will not be published. All the fields are
                    required.
                </p>
            </div>
            <div className="axil-contact-form-wrapper p-t-xs-10">
                <form className="axil-contact-form row no-gutters" ref={form} onSubmit={handleRegister}>
                    <FormGroup pClass="col-12" type="text" label="Name" name="name"/>
                    <FormGroup pClass="col-12" type="text" label="Phone" name="phone"/>
                    <FormGroup pClass="col-12" type="email" label="Email" name="email"/>
                    <FormGroup pClass="col-12" type="password" label="Password" name="password"/>
                    <div className="col-12">
                        <button className="btn btn-primary m-t-xs-0 m-t-lg-20">
                            Register
                        </button>
                    </div>
                    <div className="col-12 form-group">
                        {result ? <Result/> : null}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;