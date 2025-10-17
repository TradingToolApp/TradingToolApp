import React, {useRef, useState} from "react";
import Image from "next/image";
import {Button, ButtonGroup, ButtonToolbar, Card, Form, HStack, Modal, Schema} from "rsuite";
import {PiCurrencyCircleDollarFill} from "react-icons/pi";
import {useToolPayment} from "@/hooks/data/user/useUser";
import PayPal from "@/components/payment/paypal";

interface ModalCreatePaymentProps {
    open: boolean;
    handleClose: () => void;
    user: any;
}

const {NumberType} = Schema.Types;

const model = Schema.Model({
    amount: NumberType().isRequired("This field is required."),
});

const initialFormValue = {
    amount: "",
}

const ModelTopUp = ({open, handleClose, user}: ModalCreatePaymentProps, ...rests: any) => {
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(initialFormValue);
    const formRef: any = useRef(initialFormValue);

    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size="sm">
            <Modal.Header>
                <Modal.Title>Top Up</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Card size="sm" bordered={false}>
                        <Card.Body className="h-100" style={{margin: "10px"}}>
                            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                                  onChange={setFormValue} formValue={formValue} {...rests}>
                                <Form.Group controlId="amount">
                                    <Form.ControlLabel>Amount</Form.ControlLabel>
                                    <Form.Control name="amount"/>
                                </Form.Group>

                                <Form.Group controlId="credit">
                                    <Form.ControlLabel>Credit receive</Form.ControlLabel>
                                    <Form.Control name="credit" value={formValue.amount} readOnly/>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="d-flex align-self-center w-50">
                            <PayPal amount={formValue.amount} user={user} handleClose={handleClose} setFormValue={setFormValue}/>
                        </Card.Footer>
                    </Card>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModelTopUp;