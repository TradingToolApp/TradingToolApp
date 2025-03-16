"use client";

import React, {useEffect, useRef, useState, useCallback, useMemo} from "react";
import {
    Form,
    Schema,
    Button,
    VStack,
    HStack,
    Loader,
    Whisper,
    Tooltip,
    ButtonGroup
} from "rsuite";
import Countdown from 'react-countdown';
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import {useCreateRegisteredDevice, useUpdateRegisteredDevice} from "@/hooks/data/user/useUser";
import {TextField} from "@/components/form/customElement";
import useLocalStorage from "@/hooks/useLocalStorage";

const {StringType, NumberType} = Schema.Types;

const model = Schema.Model({
    name: StringType(),
    login: NumberType(),
});

const initialFormValue = {
    id: "",
    userId: "",
    name: "",
    login: "",
}


//This component do 2 jobs, create new User and update User
const FormUserAccounts = ({device, timerId, user, action, ...rests}: any) => {
    const addDevice = useCreateRegisteredDevice();
    const updateDevice = useUpdateRegisteredDevice();
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(device || initialFormValue);

    const formRef: any = useRef(initialFormValue);

    const tooltip = (
        <Tooltip>
            <Countdown date={Date.now() + 15000}
                       renderer={props => <div> Please wait {props.seconds} to edit</div>}/>
        </Tooltip>
    );

    const renderWhisper = useMemo(() => {
        return (
            <Whisper placement="autoHorizontalStart"
                     speaker={tooltip}>
                <Loader className="form-user-account-item-loader" size="xs" vertical/>
            </Whisper>
        )
    }, [loading])

    const handleDisableEdit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 15500);
    }

    const handleToggleEdit = () => {
        setEdit(!edit);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!formRef.current.check()) {
                console.error(formRef.current);
                return;
            }
            const newDevice = {
                ...formValue,
                userId: user.id
            }
            if (formValue.id.length === 0) {
                const resCreate: any = await addDevice.mutateAsync(newDevice);
                if (resCreate.success) {
                    toast.success(resCreate.message, toastConfig.success as any);
                    handleToggleEdit();
                    handleDisableEdit();
                } else {
                    toast.error(resCreate.message, toastConfig.error as any);
                }
            } else {
                const resUpdate: any = await updateDevice.mutateAsync(newDevice);
                if (resUpdate.success) {
                    toast.success(resUpdate.message, toastConfig.success as any);
                    handleToggleEdit();
                    handleDisableEdit();
                } else {
                    toast.error(resUpdate.message, toastConfig.error as any);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <VStack className="form-user-account-container" alignItems="center" spacing={20}>
                <VStack.Item className="form-user-account-item">
                    <Form fluid ref={formRef} model={model}
                          disabled={!edit}
                          onCheck={setFormError}
                          onChange={setFormValue}
                          formValue={formValue}
                          {...rests}>
                        <HStack>
                            <HStack.Item className="form-user-account-item-input">
                                <TextField name="name" label="Name No.1"/>
                                <TextField name="login" label="Login No.1"/>
                            </HStack.Item>
                            <HStack.Item alignSelf="flex-start">
                                <ButtonGroup className="form-user-account-item-button-group">
                                    {edit ?
                                        <Button className="form-user-account-item-button"
                                                onClick={(e) => handleSubmit(e)}>
                                            Save
                                        </Button> :
                                        <Button className="form-user-account-item-button"
                                                disabled={loading}
                                                onClick={() => handleToggleEdit()}>
                                            Edit
                                        </Button>
                                    }
                                    {loading && renderWhisper}
                                </ButtonGroup>
                            </HStack.Item>
                        </HStack>
                    </Form>
                </VStack.Item>
            </VStack>
        </div>
    );
};

export default FormUserAccounts;

