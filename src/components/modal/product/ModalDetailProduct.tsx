import React from "react";
import Image from "next/image";
import {Button, Card, Modal} from "rsuite";
import subscriptionAPI from "@/libs/api-client/restful/subscription.api";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";
import PayPal from "@/components/payment/paypal";

interface ModalDetailProductProps {
    open: boolean;
    handleClose: () => void;
    user: any;
    product: any;
}

const ModalDetailProduct = ({open, handleClose, user, product}: ModalDetailProductProps) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size="lg">
            <Modal.Header>
                <Modal.Title>Confirm get Trial</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "scroll", overflowX: "hidden"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Image src={"/images/390x390.png"} width={390} height={390} alt="Product's image"/>
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
                        <Card.Body style={{margin: "10px"}}>
                            <div style={{marginBottom: "20px"}}>
                                {product.description}
                            </div>
                            <PayPal product={product} user={user}
                                    handleClose={handleClose}/>
                        </Card.Body>
                    </Card>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button appearance="primary" disabled={loading}>
                    Yes
                </Button>
                <Button onClick={handleClose} appearance="subtle" disabled={loading}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailProduct;