import React, {useRef, useState} from "react";
import {Modal, Form, ButtonToolbar, Button, Schema} from 'rsuite';
import userAPI from "@/libs/api-client/restful/user.api";
import {toastConfig} from "@/libs/constant";
import {toast} from "react-toastify";

interface IModalChangePassword {
    open: boolean;
    handleClose: () => void;
    user: any;
}

const {StringType} = Schema.Types;

const model = Schema.Model({
    oldPassword: StringType().isRequired("This field is required."),
    newPassword: StringType().isRequired("This field is required.")
        .pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, `At least 8 letter, a symbol, an uppercase, a number`),
});


const ModalChangePassword = ({open, handleClose, user}: IModalChangePassword) => {
    const formRef: any = useRef(null);
    const [formValue, setFormValue] = useState<any>({oldPassword: "", newPassword: ""});
    const [, setFormError] = React.useState({});

    const handleChangePassword = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error("Form error");
            return;
        }

        try {
            const data = {
                oldPassword: formValue.oldPassword,
                newPassword: formValue.newPassword,
                email: user.profile.email
            }

            const res: any = await userAPI.changePassword(data);
            if (res.success) {
                toast.success("Password changed successfully", toastConfig.success as any);
                handleClose();
            } else {
                toast.error(res.message, toastConfig.error as any);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal size={"xs"} backdrop open={open} onClose={handleClose} style={{marginTop: "50px"}}>
            <Modal.Header>
                <Modal.Title>Change Password</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <Form fluid
                      ref={formRef}
                      model={model}
                      onCheck={setFormError}
                      onChange={setFormValue}
                      formValue={formValue}
                      style={{all: "unset", alignItems: "center"}}
                >
                    <Form.Group controlId="oldPassword">
                        <Form.ControlLabel>Old Password</Form.ControlLabel>
                        <Form.Control name="oldPassword" type="password" style={{width: "360px"}}/>
                    </Form.Group>
                    <Form.Group controlId="newPassword">
                        <Form.ControlLabel>New Password</Form.ControlLabel>
                        <Form.Control name="newPassword" type="password" style={{width: "360px"}}/>
                    </Form.Group>
                    <Form.Group>
                        <ButtonToolbar style={{float: "right"}}>
                            <Button appearance="primary" onClick={handleChangePassword}>Submit</Button>
                            <Button appearance="default" onClick={handleClose}>Cancel</Button>
                        </ButtonToolbar>
                    </Form.Group>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ModalChangePassword;