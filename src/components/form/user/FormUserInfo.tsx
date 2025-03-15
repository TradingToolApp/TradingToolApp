"use client";

import React, {useRef, useState} from "react";
import {
    Form,
    Schema,
    ButtonToolbar,
    Button,
} from "rsuite";
import {useUpdateUserById} from "@/hooks/data/user/useUser";
import {TextField} from "@/components/form/customElement";

const {StringType, NumberType} = Schema.Types;

const model = Schema.Model({
    name: StringType().isRequired("This field is required."),
    phone: NumberType().pattern(/^[0-9]{10}$/, 'Please enter a legal phone number.').isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    name: "",
    phone: "",
}

//This component do 2 jobs, create new User and update User
const FormUserInfo = ({formData, handleClose, action, ...rests}: any) => {
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const updateUserById = useUpdateUserById();
    const [loading, setLoading] = useState(false);

    const formRef: any = useRef(initialFormValue);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error(formRef.current);
            return;
        }

        setLoading(true);
        try {

            //on create => generate new slug(fileName), else use the old one
            const newUser = {
                ...formValue,
            };

            switch (action) {
                case "UPDATE":
                    const resUpdate = await updateUserById.mutateAsync(newUser);
                    if (resUpdate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);

    };

    return (
        <>
            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <TextField name="name" label={"Name"}/>
                <TextField name="phone" label={"Phone"}/>
                <ButtonToolbar style={{marginTop: "20px", marginRight: "10px", float: "right"}}>
                    <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                        Submit
                    </Button>
                    <Button appearance="default" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                </ButtonToolbar>
            </Form>
        </>
    );
};

export default FormUserInfo;
