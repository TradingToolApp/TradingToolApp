"use client";

import React, {useEffect, useRef, useState} from "react";
import {
    Form,
    Schema,
    Button,
    VStack,
    HStack,
    Loader
} from "rsuite";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import {
    useGetUserSubscriptionsById,
    useCreateRegisteredDevice,
    useUpdateRegisteredDevice
} from "@/hooks/data/user/useUser";
import {TextField} from "@/components/form/customElement";

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
const FormUserAccounts = ({user, action, ...rests}: any) => {
    const {subscriptions} = useGetUserSubscriptionsById(user.id);
    const addDevice = useCreateRegisteredDevice();
    const updateDevice = useUpdateRegisteredDevice();

    const [loading, setLoading] = useState({
        loading_1: false,
        loading_2: false,
        loading_3: false,
        loading_4: false,
        loading_5: false,
    });
    const [edit, setEdit] = useState<any>({
        edit_1: false,
        edit_2: false,
        edit_3: false,
        edit_4: false,
        edit_5: false,
    });
    const [, setFormError_1] = React.useState({});
    const [, setFormError_2] = React.useState({});
    const [, setFormError_3] = React.useState({});
    const [, setFormError_4] = React.useState({});
    const [, setFormError_5] = React.useState({});
    const formRef_1: any = useRef(initialFormValue);
    const formRef_2: any = useRef(initialFormValue);
    const formRef_3: any = useRef(initialFormValue);
    const formRef_4: any = useRef(initialFormValue);
    const formRef_5: any = useRef(initialFormValue);
    const [formValue_1, setFormValue_1] = useState<any>(initialFormValue);
    const [formValue_2, setFormValue_2] = useState<any>(initialFormValue);
    const [formValue_3, setFormValue_3] = useState<any>(initialFormValue);
    const [formValue_4, setFormValue_4] = useState<any>(initialFormValue);
    const [formValue_5, setFormValue_5] = useState<any>(initialFormValue);

    const handleDisableEdit = (key: string) => {
        setLoading({...loading, [key]: true});
        setTimeout(() => {
            setLoading({...loading, [key]: false});
        }, 30000);
    }
    const handleToggleEdit = (key: string) => {
        setEdit({...edit, [key]: !edit[key]});
    }

    const handleSubmit = async (e: any, key: any) => {
        e.preventDefault();
        try {
            switch (key) {
                case "edit_1":
                    if (!formRef_1.current.check()) {
                        console.error(formRef_1.current);
                        return;
                    }
                    handleDisableEdit("loading_1");
                    const newDevice_1 = {
                        ...formValue_1,
                        userId: user.id
                    }
                    if (formValue_1.id.length === 0) {
                        const resCreate_1: any = await addDevice.mutateAsync(newDevice_1);
                        if (resCreate_1.success) {
                            toast.success(resCreate_1.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resCreate_1.message, toastConfig.error as any);
                        }
                    } else {
                        const resUpdate_1: any = await updateDevice.mutateAsync(newDevice_1);
                        if (resUpdate_1.success) {
                            toast.success(resUpdate_1.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resUpdate_1.message, toastConfig.error as any);
                        }
                    }
                    break;
                case "edit_2":
                    if (!formRef_2.current.check()) {
                        console.error(formRef_2.current);
                        return;
                    }
                    handleDisableEdit("loading_2");
                    const newDevice_2 = {
                        ...formValue_2,
                        userId: user.id
                    }
                    if (formValue_2.id.length === 0) {
                        const resCreate_2 = await addDevice.mutateAsync(newDevice_2);
                        if (resCreate_2.success) {
                            toast.success(resCreate_2.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resCreate_2.message, toastConfig.error as any);
                        }
                    } else {
                        const resUpdate_2 = await updateDevice.mutateAsync(newDevice_2);
                        if (resUpdate_2.success) {
                            toast.success(resUpdate_2.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resUpdate_2.message, toastConfig.error as any);
                        }
                    }
                    break;
                case "edit_3":
                    if (!formRef_3.current.check()) {
                        console.error(formRef_3.current);
                        return;
                    }
                    handleDisableEdit("loading_3");
                    const newDevice_3 = {
                        ...formValue_3,
                        userId: user.id
                    }
                    if (formValue_3.id.length === 0) {
                        const resCreate_3 = await addDevice.mutateAsync(newDevice_3);
                        if (resCreate_3.success) {
                            toast.success(resCreate_3.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resCreate_3.message, toastConfig.error as any);
                        }
                    } else {
                        const resUpdate_3 = await updateDevice.mutateAsync(newDevice_3);
                        if (resUpdate_3.success) {
                            toast.success(resUpdate_3.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resUpdate_3.message, toastConfig.error as any);
                        }
                    }
                    break;
                case "edit_4":
                    if (!formRef_4.current.check()) {
                        console.error(formRef_4.current);
                        return;
                    }
                    handleDisableEdit("loading_4");
                    const newDevice_4 = {
                        ...formValue_4,
                        userId: user.id
                    }
                    if (formValue_4.id.length === 0) {
                        const resCreate_4 = await addDevice.mutateAsync(newDevice_4);
                        if (resCreate_4.success) {
                            toast.success(resCreate_4.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resCreate_4.message, toastConfig.error as any);
                        }
                    } else {
                        const resUpdate_4 = await updateDevice.mutateAsync(newDevice_4);
                        if (resUpdate_4.success) {
                            toast.success(resUpdate_4.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resUpdate_4.message, toastConfig.error as any);
                        }
                    }
                    break;
                case "edit_5":
                    if (!formRef_5.current.check()) {
                        console.error(formRef_5.current);
                        return;
                    }
                    handleDisableEdit("loading_5");
                    const newDevice_5 = {
                        ...formValue_5,
                        userId: user.id
                    }
                    if (formValue_1.id.length === 0) {
                        const resCreate_5 = await addDevice.mutateAsync(newDevice_5);
                        if (resCreate_5.success) {
                            toast.success(resCreate_5.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resCreate_5.message, toastConfig.error as any);
                        }
                    } else {
                        const resUpdate_5 = await updateDevice.mutateAsync(newDevice_5);
                        if (resUpdate_5.success) {
                            toast.success(resUpdate_5.message, toastConfig.success as any);
                            handleToggleEdit(key);
                        } else {
                            toast.error(resUpdate_5.message, toastConfig.error as any);
                        }
                    }
                    break;
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (subscriptions !== undefined) {
            setFormValue_1(subscriptions?.devices[0] || initialFormValue);
            setFormValue_2(subscriptions?.devices[1] || initialFormValue);
            setFormValue_3(subscriptions?.devices[2] || initialFormValue);
            setFormValue_4(subscriptions?.devices[3] || initialFormValue);
            setFormValue_5(subscriptions?.devices[4] || initialFormValue);
        }
    }, [subscriptions]);

    if (subscriptions === undefined) {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    return (
        <div>
            <VStack className="form-user-account-container" alignItems="center" spacing={20}>
                <VStack.Item className="form-user-account-item">
                    <Form fluid ref={formRef_1} model={model}
                          disabled={!edit.edit_1}
                          onCheck={setFormError_1}
                          onChange={setFormValue_1}
                          formValue={formValue_1}
                          {...rests}>
                        <HStack>
                            <HStack.Item className="form-user-account-item-input">
                                <TextField name="name" label="Name No.1"/>
                                <TextField name="login" label="Login No.1"/>
                            </HStack.Item>
                            <HStack.Item alignSelf="flex-start">
                                {edit.edit_1 ?
                                    <Button className="form-user-account-item-button"
                                            onClick={(e) => handleSubmit(e, "edit_1")}>
                                        Save
                                    </Button> :
                                    <Button className="form-user-account-item-button"
                                            disabled={loading.loading_1}
                                            onClick={() => handleToggleEdit("edit_1")}>
                                        Edit
                                    </Button>
                                }
                            </HStack.Item>
                        </HStack>
                    </Form>
                </VStack.Item>
                <VStack.Item>
                    <Form fluid ref={formRef_2} model={model}
                          disabled={!edit.edit_2}
                          onCheck={setFormError_2}
                          onChange={setFormValue_2}
                          formValue={formValue_2}
                          {...rests}>
                        <HStack>
                            <HStack.Item className="form-user-account-item-input">
                                <TextField name="name" label="Name No.2"/>
                                <TextField name="login" label="Login No.2"/>
                            </HStack.Item>
                            <HStack.Item alignSelf="flex-start">
                                {edit.edit_2 ?
                                    <Button className="form-user-account-item-button"
                                            onClick={(e) => handleSubmit(e, "edit_2")}>
                                        Save
                                    </Button> :
                                    <Button className="form-user-account-item-button"
                                            disabled={loading.loading_2}
                                            onClick={() => handleToggleEdit("edit_2")}>
                                        Edit
                                    </Button>
                                }
                            </HStack.Item>
                        </HStack>
                    </Form>
                </VStack.Item>
                <VStack.Item>
                    <Form fluid ref={formRef_3} model={model}
                          disabled={!edit.edit_3}
                          onCheck={setFormError_3}
                          onChange={setFormValue_3}
                          formValue={formValue_3}
                          {...rests}>
                        <HStack>
                            <HStack.Item className="form-user-account-item-input">
                                <TextField name="name" label="Name No.3"/>
                                <TextField name="login" label="Login No.3"/>
                            </HStack.Item>
                            <HStack.Item alignSelf="flex-start">
                                {edit.edit_3 ?
                                    <Button className="form-user-account-item-button"
                                            onClick={(e) => handleSubmit(e, "edit_3")}>
                                        Save
                                    </Button> :
                                    <Button className="form-user-account-item-button"
                                            disabled={loading.loading_3}
                                            onClick={() => handleToggleEdit("edit_3")}>
                                        Edit
                                    </Button>
                                }
                            </HStack.Item>
                        </HStack>
                    </Form>
                </VStack.Item>
                <VStack.Item>
                    <Form fluid ref={formRef_4} model={model}
                          disabled={!edit.edit_4}
                          onCheck={setFormError_4}
                          onChange={setFormValue_4}
                          formValue={formValue_4}
                          {...rests}>
                        <HStack>
                            <HStack.Item className="form-user-account-item-input">
                                <TextField name="name" label="Name No.4"/>
                                <TextField name="login" label="Login No.4"/>
                            </HStack.Item>
                            <HStack.Item alignSelf="flex-start">
                                {edit.edit_4 ?
                                    <Button className="form-user-account-item-button"
                                            onClick={(e) => handleSubmit(e, "edit_4")}>
                                        Save
                                    </Button> :
                                    <Button className="form-user-account-item-button"
                                            disabled={loading.loading_4}
                                            onClick={() => handleToggleEdit("edit_4")}>
                                        Edit
                                    </Button>
                                }
                            </HStack.Item>
                        </HStack>
                    </Form>
                </VStack.Item>
                <VStack.Item>
                    <Form fluid ref={formRef_5} model={model}
                          disabled={!edit.edit_5}
                          onCheck={setFormError_5}
                          onChange={setFormValue_5}
                          formValue={formValue_5}
                          {...rests}>
                        <HStack>
                            <HStack.Item className="form-user-account-item-input">
                                <TextField name="name" label="Name No.5"/>
                                <TextField name="login" label="Login No.5"/>
                            </HStack.Item>
                            <HStack.Item alignSelf="flex-start">
                                {edit.edit_5 ?
                                    <Button className="form-user-account-item-button"
                                            onClick={(e) => handleSubmit(e, "edit_5")}>
                                        Save
                                    </Button> :
                                    <Button className="form-user-account-item-button"
                                            disabled={loading.loading_5}
                                            onClick={() => handleToggleEdit("edit_5")}>
                                        Edit
                                    </Button>
                                }
                            </HStack.Item>
                        </HStack>
                    </Form>
                </VStack.Item>
            </VStack>
        </div>
    );
};

export default FormUserAccounts;
