"use client";

import React, {useRef} from "react";
import {
    Schema,
    VStack,
    Loader,
    Tooltip,
} from "rsuite";
import Countdown from 'react-countdown';
import {useGetUserSubscriptionsById} from "@/hooks/data/user/useUser";
import FormSingleUserAccount from "@/components/form/user/user-accounts/FormSingleUserAccount";

const {StringType, NumberType} = Schema.Types;

const model = Schema.Model({
    name: StringType(),
    login: NumberType(),
});

//This component do 2 jobs, create new User and update User
const FormUserAccounts = ({user, action, ...rests}: any) => {
    const {subscriptions} = useGetUserSubscriptionsById(user.id);

    if (subscriptions === undefined) {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    return (
        <div>
            <VStack className="form-user-account-container" alignItems="center" spacing={20}>
                <VStack.Item>
                    <FormSingleUserAccount device={subscriptions.devices[0]} timerId="timer1" user={user}/>
                </VStack.Item>
                <VStack.Item>
                    <FormSingleUserAccount device={subscriptions.devices[1]} timerId="timer2" user={user}/>
                </VStack.Item>
                <VStack.Item>
                    <FormSingleUserAccount device={subscriptions.devices[2]} timerId="timer3" user={user}/>
                </VStack.Item>
                <VStack.Item>
                    <FormSingleUserAccount device={subscriptions.devices[3]} timerId="timer4" user={user}/>
                </VStack.Item>
                <VStack.Item>
                    <FormSingleUserAccount device={subscriptions.devices[4]} timerId="timer5" user={user}/>
                </VStack.Item>
            </VStack>
        </div>
    );
};

export default FormUserAccounts;