import React from "react";
import Image from "next/image";
import {Button, Card, Modal} from "rsuite";
import {PiCurrencyCircleDollarFill} from "react-icons/pi";
import {useToolPayment} from "@/hooks/data/user/useUser";

interface ModalCreatePaymentProps {
    open: boolean;
    handleClose: () => void;
    product: any;
    user: any;
}

const ModalBuyTool = ({open, handleClose, product, user}: ModalCreatePaymentProps) => {
    const toolPayment = useToolPayment();
    const handleBuy = () => {
        if (user.status === "authenticated") {
            toolPayment.mutateAsync({productId: product.id, userId: user.profile.id});
        }
    }

    return (
        <Modal open={open} onClose={handleClose} backdrop={"static"} size="lg">
            <Modal.Header>
                <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{overflow: "scroll"}}>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <Image src={product.image} width={390} height={390} alt={"payment image"}/>
                    <Card size="sm" bordered={false}>
                        <Card.Header as="h5">
                            <div style={{display: "flex", justifyContent: "space-between", margin: "10px"}}>
                                <h3>
                                    {product.name}
                                </h3>
                                <h3>
                                    <PiCurrencyCircleDollarFill size="2rem"/>
                                    {product.price}
                                </h3>
                            </div>
                        </Card.Header>
                        <Card.Body className="h-100" style={{margin: "10px"}}>
                            <div style={{marginBottom: "20px"}}>
                                {product.description}
                            </div>
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

export default ModalBuyTool;