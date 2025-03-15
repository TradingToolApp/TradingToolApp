"use client";

import React from "react";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {Notification, Button} from 'rsuite';
import {useRouter} from "next/router";

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const {data, status} = useQuery({
        queryKey: ['verify-email', token],
        queryFn: () => axios.get(`/api/auth/verify-email?token=${token}`),
        enabled: !!token
    })

    return (
        <div className="flex justify-center items-center min-vh-100">
            <div className="d-flex flex-column min-vh-100 m-5">
                {status === "pending" && (
                    <Notification type="info" header="Verifying...">
                        Please wait while we verify your email.
                    </Notification>
                )}
                {data && data.data.success && (
                    <Notification type="success" header="Email Verified!">
                        Your email has been verified successfully.
                        <Button color="cyan" appearance="primary" style={{marginTop: 10}}
                                onClick={() => router.push("/login")}>
                            Go to Login</Button>
                    </Notification>
                )}
                {data && !data.data.success && (
                    <Notification type="error" header="Email Not Verified!">
                        Your email has not been verified! Please contact support.
                    </Notification>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;