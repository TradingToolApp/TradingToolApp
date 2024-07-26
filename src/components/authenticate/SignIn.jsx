import { useRef, useState } from 'react';
import { signIn } from "next-auth/react"
import Link from "next/link";
import FormGroup from "../contact/FormGroup";
import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert';
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";

const Result = () => {
    return (
        <Alert variant="success" className="success-msg">
            Your Message has been successfully sent.
        </Alert>
    )
}

const handleLogIn = async (e) => {}

const ContactForm = () => {
    const form = useRef();
    const [result, showresult] = useState(false);

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_g3aufzu', 'template_sk4dqiz', form.current, '9L_sRsO66U253zcxC')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        form.current.reset();
        showresult(true);
    };

    setTimeout(() => {
        showresult(false);
    }, 2000);

    return (
        <div className="flex justify-center max-2xl:min-h-52">
            <div className="axil-contact-form-block m-b-xs-30 w-1/2">
                <div className="section-title d-block">
                    <h2 className="h3 axil-title m-b-xs-20">Log In</h2>
                    <p>
                        Your email address will not be published. All the fields are
                        required.
                    </p>
                </div>
                <div className="axil-contact-form-wrapper p-t-xs-10">
                    <form className="axil-contact-form row no-gutters" ref={form} onSubmit={handleLogIn}>
                        <FormGroup pClass="col-12" type="email" label="Email" name="contact-email" />
                        <FormGroup pClass="col-12" type="password" label="Password" name="contact-message" />
                        <div className="col-12 text-center">
                            <button className="btn btn-primary m-t-xs-0 m-t-lg-20">
                                SUBMIT
                            </button>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn p-2 m-2" onClick={() => signIn("google", { callbackUrl: process.env.NEXT_PUBLIC_DOMAIN + "/admin/dashboard" })}>
                                <FcGoogle size="2em" />
                            </button>
                            <button className="btn p-2 m-2">
                                <FaFacebookSquare size="2em" color="blue" />
                            </button>
                        </div>
                        <div className="col-12">
                            <div className="text-center text-black-50 font-weight-light">
                                <Link href={"/register"}>
                                    Do not have an account? Sign Up
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 form-group">
                            {result ? <Result /> : null}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;