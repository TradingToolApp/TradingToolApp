import React, {useRef, useState} from 'react';
import {Modal, Button, Form, Schema, ButtonToolbar} from 'rsuite';
import {useSendGift} from "@/hooks/data/admin/useSubscriptions";
import {Textarea, TextField} from "@/components/form/customElement";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";

const {StringType, NumberType} = Schema.Types;

const model = Schema.Model({
    amount: NumberType().isRequired("This field is required."),
    message: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    amount: "",
    message: "",
}

const ModalSendGift = ({modalData, open, handleClose, ...rests}: any) => {
    const sendGift = useSendGift();
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(initialFormValue);
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
            const result = await sendGift.mutateAsync({userId: modalData.id, email: modalData.email, amount: formValue.amount});
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <Modal style={{marginTop: "100px"}} backdrop="static" role="alertdialog" open={open} onClose={handleClose}
               size="xs">
            <Modal.Body>
                <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                      onChange={setFormValue} formValue={formValue} {...rests}>
                    <Form.Group controlId="amount">
                        <Form.ControlLabel>Amount</Form.ControlLabel>
                        <Form.Control name="amount"/>
                    </Form.Group>
                    <Form.Group controlId="message">
                        <Form.ControlLabel>Message</Form.ControlLabel>
                        <Form.Control name="message" accepter={Textarea} rows={5}/>
                    </Form.Group>

                    <ButtonToolbar style={{marginTop: "20px", marginRight: "10px", float: "right"}}>
                        <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                            Send
                        </Button>
                        <Button appearance="default" onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </Form>
            </Modal.Body>
            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
};

export default ModalSendGift;