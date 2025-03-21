import {useRef} from "react";
import {useRouter} from "next/router";
import {signIn, getSession} from "next-auth/react"
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import Link from "next/link";
import FormGroup from "../contact/FormGroup";
import {FcGoogle} from "react-icons/fc";
import useTranslation from "@/hooks/useTranslation";
import {RoleType} from "@prisma/client";

const SignIn = () => {
    const t = useTranslation();
    const router = useRouter();
    const form = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = form.current.email.value;
        const password = form.current.password.value;

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            })

            if (!res.ok) {
                return toast.error("Invalid credentials", toastConfig.error);
            }

            const session = await getSession();
            if (session.user.role === RoleType.ADMIN) {
                return router.push("/admin/dashboard/posts")
            }
            if (session.user.role === RoleType.USER) {
                return router.push(`/user/dashboard/${session.user.id}`)
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex justify-center max-2xl:min-h-52">
            <div className="axil-contact-form-block m-b-xs-30 w-1/2">
                <div className="section-title d-block">
                    <h2 className="h3 axil-title m-b-xs-20">{t.login.title}</h2>
                    <p>
                        {t.login.description}
                    </p>
                </div>
                <div className="axil-contact-form-wrapper p-t-xs-10">
                    <form className="axil-contact-form row no-gutters" ref={form} onSubmit={handleSubmit}>
                        <FormGroup pClass="col-12" type="email" label="Email" name="email"/>
                        <FormGroup pClass="col-12" type="password" label="Password" name="password"/>
                        <div className="col-12 text-center">
                            <button className="btn btn-primary m-t-xs-0 m-t-lg-20">
                                {t.login.submit}
                            </button>
                        </div>
                    </form>
                    <div className="axil-contact-form-block m-b-xs-30 w-1/2">
                        <div className="col-12 d-flex justify-content-center">
                            <button className="btn p-2 m-2" onClick={() => signIn("google")}>
                                <FcGoogle size="2em"/>
                            </button>
                        </div>
                        <div className="col-12">
                            <div className="text-center font-weight-light">
                                <Link href={"/register"}>
                                    {t.login.register}
                                </Link>
                            </div>
                            <div className="text-center font-weight-light">
                                <Link href={"/auth/forgot-password"}>
                                    {t.login.forgot}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;