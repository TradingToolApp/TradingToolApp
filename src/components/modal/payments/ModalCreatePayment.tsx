import React from "react";
import Image from "next/image";
import {Card, Modal} from "rsuite";
import PayPal from "@/components/payment/paypal";

interface ModalCreatePaymentProps {
    open: boolean;
    handleClose: () => void;
    product: any;
    user: any;
}

const ModalCreatePayment = ({open, handleClose, product, user}: ModalCreatePaymentProps) => {
    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size="lg">
            <Modal.Header>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "scroll", overflowX: "hidden", overflowY: "hidden"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Image src={product.image} width={390} height={390} alt={"payment image"}/>
                    <Card size="sm">
                        <Card.Header as="h5">
                            <div style={{display: "flex", justifyContent: "space-between", margin: "10px"}}>
                                <h3>
                                    {product.name}
                                </h3>
                                <h3>
                                    ${product.price}
                                </h3>
                            </div>
                        </Card.Header>
                        <Card.Body className="h-100" style={{margin: "10px"}}>
                            <div style={{marginBottom: "20px"}}>
                                {product.description}
                            </div>
                        </Card.Body>
                        <Card.Footer className="w-100">
                            <PayPal product={product} user={user}
                                    handleClose={handleClose}/>
                        </Card.Footer>
                    </Card>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalCreatePayment;