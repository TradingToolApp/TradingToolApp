import React from "react";
import Image from "next/image";
import {Card, Modal, Text} from "rsuite";
import PayPal from "@/components/payment/paypal";

interface ModalBuyPackageProps {
    open: boolean;
    handleClose: () => void;
    product: any;
    user: any;
}

const ModalBuyPackage = ({open, handleClose, product, user}: ModalBuyPackageProps) => {
    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size={430}>
            <Modal.Header>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "hidden"}}>
                <div className="d-flex flex-column">
                    <Image src={"/images/390x390.png"} width={390} height={390} alt={"payment image"}/>
                    <Card size="sm">
                        <Card.Header as="h5">
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <h3>
                                    {product.name}
                                </h3>
                                <h3>
                                    ${product.price}
                                </h3>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Text className="mb-5" align="justify">
                                {product.description}
                            </Text>
                            <PayPal product={product} user={user}
                                    handleClose={handleClose}/>
                        </Card.Body>
                    </Card>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalBuyPackage;