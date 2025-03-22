import React, {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {CardGroup, Card, HStack, VStack, Divider, ButtonGroup, Button, Text} from "rsuite";
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import {SubscriptionType} from "@prisma/client";
import {PlatformType, ProductType} from "@prisma/client";
import useCurrentUser from "@/hooks/useCurrentUser";
import ModalCreatePayment from "@/components/modal/payments/ModalCreatePayment";
import ModalConfirmGetTrial from "@/components/modal/product/ModalConfirmGetTrial";
import subscriptionAPI from "@/libs/api-client/restful/subscription.api";
import useWindowSize from "@/hooks/useWindowSize";

const ProductCardTwo = ({products}: any) => {
    const {screenWidth} = useWindowSize();
    const user = useCurrentUser();
    const router = useRouter();
    const [product, setProduct] = useState<any>({});
    const [activeFilter, setActiveFilter] = useState<number[]>([]);
    const [openPayment, setOpenPayment] = useState(false);
    const [openConfirmGetTrial, setOpenConfirmGetTrial] = useState(false);

    const handleOpenPayment = () => setOpenPayment(true);
    const handleClosePayment = () => setOpenPayment(false);
    const handleOpenConfirmGetTrial = () => setOpenConfirmGetTrial(true);
    const handleCloseConfirmGetTrial = () => setOpenConfirmGetTrial(false);

    const toggleSetFilter = (e: any, index: number) => {
        if (activeFilter.includes(index)) {
            setActiveFilter(activeFilter.filter((item) => item !== index));
            e.currentTarget.blur();
        } else {
            setActiveFilter([...activeFilter, index]);
        }
    }

    const filteredProduct = products.filter((product: any) => {
        if (activeFilter.length === 0) {
            return true;
        }
        if (activeFilter.includes(0) && product.platform === PlatformType.MT5) {
            return true;
        }
        if (activeFilter.includes(1) && product.platform === PlatformType.MT4) {
            return true;
        }
        if (activeFilter.includes(2) && product.type === ProductType.EA) {
            return true;
        }
        if (activeFilter.includes(3) && product.type === ProductType.INDICATOR) {
            return true;
        }
        return;
    });

    const handleBuyProduct = (product: any) => {
        if (user.status === "authenticated") {
            handleOpenPayment();
            product.subscriptionType = SubscriptionType.LIFETIME;
            setProduct(product);
        } else {
            toast.error("Please login to buy", toastConfig.error as any);
        }
    }

    const handleTrialProduct = async (product: any) => {
        if (user.status === "authenticated") {
            //check if the trial is available
            const trial = await subscriptionAPI.checkTrial(user.profile.id, product.id);

            if (trial.success) {
                setProduct(product);
                handleOpenConfirmGetTrial();
            } else {
                toast.error(trial.message, toastConfig.error as any);
            }
        } else {
            toast.error("Please login to trial", toastConfig.error as any);
        }
    }

    const handleDownload = async (product: any) => {
        if (user.status === "authenticated") {
            const license = await subscriptionAPI.checkLicense(user.profile.id, product.id);
            if (!license.success) {
                return toast.error(license.message, toastConfig.error as any);
            }
            window.open(license.data[0].product.urlDownload, "_blank");
        } else {
            toast.error("Please login to download", toastConfig.error as any);
        }
    }

    return (
        <div>
            <div className="product-filter-button-group m-2 p-2">
                <ButtonGroup>
                    <Button key={0} appearance="subtle" active={activeFilter.includes(0)}
                            onClick={(e) => toggleSetFilter(e, 0)}>
                        <Image src="/images/Metatrader5.svg" alt="mt5" width={20} height={20}/>MetaTrader5
                    </Button>
                    <Button key={1} appearance="subtle" active={activeFilter.includes(1)}
                            onClick={(e) => toggleSetFilter(e, 1)}>
                        <Image src="/images/Metatrader4.svg" alt="mt4" width={20} height={20}/>MetaTrader4
                    </Button>
                    <Button key={2} appearance="subtle" active={activeFilter.includes(2)}
                            onClick={(e) => toggleSetFilter(e, 2)}>
                        Experts
                    </Button>
                    <Button key={3} appearance="subtle" active={activeFilter.includes(3)}
                            onClick={(e) => toggleSetFilter(e, 3)}>
                        Indicators
                    </Button>
                </ButtonGroup>
            </div>
            <div className="product-card-two">
                <CardGroup className="card-group-two" columns={screenWidth > 1500 ? 8 : 6}>
                    {filteredProduct.map((product: any, index: any) => (
                        <Card key={index} width={200} size="sm" shaded bordered>
                            <Image
                                src={product.image}
                                alt="Image product"
                                width={200}
                                height={200}
                            />
                            <Card.Header as="h5" className="text-center mb-2">
                                {product.name}
                                <Text size="sm" color="orange">{product.type}</Text>
                            </Card.Header>
                            <Divider className="m-0"/>
                            <Card.Body className="p-2">
                                <div>
                                    <HStack justifyContent="space-between" alignItems="center"
                                            divider={<Divider className="m-0" vertical/>}>
                                        <VStack alignItems="center" justifyContent="center"
                                                divider={<Divider className="m-0"/>}>
                                            <Button appearance="link" color="red" className="m-0"
                                                    onClick={() => handleBuyProduct(product)}>Buy</Button>
                                            <Button appearance="link" color="red" className="m-0"
                                                    onClick={() => router.push("/packages")}>Rent</Button>
                                        </VStack>
                                        <h4 className="m-0">
                                            ${product.price}
                                        </h4>
                                        <VStack alignItems="center" divider={<Divider className="m-0"/>}>
                                            <Button appearance="link" color="red" className="m-0"
                                                    onClick={() => handleTrialProduct(product)}>Trial</Button>
                                            <Button appearance="link" color="red" className="m-0"
                                                    onClick={() => handleDownload(product)}>
                                                <Image src="/images/Metatrader5.svg" alt="mt5" width={14} height={14}/>
                                                {product.platform}
                                            </Button>
                                        </VStack>
                                    </HStack>
                                </div>
                            </Card.Body>
                            <Divider className="m-0"/>
                            <Card.Footer className="p-4">
                                <VStack>
                                    <Text size="md" align="justify" maxLines={5}>
                                        {product.description}</Text>
                                    <VStack.Item alignSelf="flex-end">
                                        <Button appearance="link" color="red" className="m-0"
                                                onClick={() => router.push(product.urlPost)}>Read More</Button>
                                    </VStack.Item>
                                </VStack>
                            </Card.Footer>
                        </Card>
                    ))}
                </CardGroup>
            </div>
            <ModalCreatePayment open={openPayment} handleClose={handleClosePayment} product={product}
                                user={user}/>
            <ModalConfirmGetTrial open={openConfirmGetTrial} handleClose={handleCloseConfirmGetTrial} user={user}
                                  product={product}/>
        </div>
    )
}

export default ProductCardTwo;