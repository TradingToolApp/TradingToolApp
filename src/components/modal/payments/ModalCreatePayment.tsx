import React from "react";
import Image from "next/image";
import {Card, Modal} from "rsuite";
import PayPal from "@/components/payment/paypal";

interface ModalCreatePaymentProps {
    open: boolean;
    handleClose: () => void;
    paymentPlan: any;
    user: any;
}

const ModalCreatePayment = ({open, handleClose, paymentPlan, user}: ModalCreatePaymentProps) => {
    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size="lg">
            <Modal.Header>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "scroll", overflowX: "hidden"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Image src={"/images/1200x1200.jpg"} width={500} height={550} alt={"payment image"}/>
                    <Card size="sm">
                        <Card.Header as="h5">
                            <div style={{display: "flex", justifyContent: "space-between", margin: "10px"}}>
                                <h3>
                                    {paymentPlan.title}
                                </h3>
                                <h3>
                                    ${paymentPlan.amount}
                                </h3>
                            </div>
                        </Card.Header>
                        <Card.Body style={{margin: "10px"}}>
                            <div style={{marginBottom: "20px"}}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet et excepturi facere
                                inventore
                                laboriosam laborum molestias necessitatibus optio possimus quisquam reiciendis rem
                                repudiandae,
                                similique totam ut! Alias amet culpa delectus eligendi in incidunt, ipsa libero maiores
                                minima,
                                molestias neque officia repudiandae temporibus ullam vitae. Dicta enim eveniet libero
                                quaerat
                                quibusdam.
                            </div>
                            <PayPal paymentPlan={paymentPlan} user={user}
                                    handleClose={handleClose}/>
                        </Card.Body>
                    </Card>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalCreatePayment;