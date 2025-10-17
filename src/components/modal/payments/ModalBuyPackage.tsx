import React from "react";
import Image from "next/image";
import {Card, Modal, Text, Button} from "rsuite";
import PayPal from "@/components/payment/paypal";
import {usePackagePayment} from "@/hooks/data/user/useUser";

interface ModalBuyPackageProps {
    open: boolean;
    handleClose: () => void;
    product: any;
    user: any;
}

const ModalBuyPackage = ({open, handleClose, product, user}: ModalBuyPackageProps) => {
    const packagePayment = usePackagePayment();

    const handleBuy = () => {
        if (user.status === "authenticated") {
            packagePayment.mutateAsync({productId: product.id, userId: user.profile.id, subscriptionType: product.subscriptionType});
        }
    }

    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size={430}>
            <Modal.Header>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    <Image src={"/images/390x390.png"} width={320} height={320} alt={"payment image"}/>
                    <Card size="sm" bordered={false}>
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
                        <Card.Body >
                            <Text className="mb-5" align="justify">
                                {product.description}
                            </Text>
                        </Card.Body>
                        <Card.Footer className="d-flex align-self-center">
                            <Button onClick={handleBuy} style={{width: '80px'}} appearance="primary">Buy</Button>
                            <Button onClick={handleClose} style={{width: '80px'}}>Close</Button>
                        </Card.Footer>
                    </Card>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default ModalBuyPackage;