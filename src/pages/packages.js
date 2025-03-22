import React, {useState} from "react";
import Image from 'next/image';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import FooterOne from "@/components/footer/FooterOne";
import {Button, ButtonGroup, Card, CardGroup, Text} from "rsuite";
import {Rokkitt} from 'next/font/google'
import useCurrentUser from "@/hooks/useCurrentUser";
import {SubscriptionType} from "@prisma/client";
import ModalBuyPackage from "@/components/modal/payments/ModalBuyPackage";
import {useGetPackages} from "@/hooks/data/admin/usePackages";
import {getPackages} from "@/libs/api-client/prisma/package.api";
import {toast} from "react-toastify";
import {toastConfig} from "@/libs/constant";

const rokkitt = Rokkitt({
    weight: '700',
    subsets: ['latin'],
});

const PackagesPage = ({allPackages}) => {
    const {packages} = useGetPackages(allPackages);
    const user = useCurrentUser();
    const [plan, setPlan] = useState(SubscriptionType.MONTHLY);
    const [selectedProduct, setSelectedProduct] = useState({});
    const [openPayment, setOpenPayment] = useState(false);

    const handleOpenPayment = () => setOpenPayment(true);
    const handleClosePayment = () => setOpenPayment(false);

    const handleBuy = (product) => {
        if (user.status === "authenticated") {
            switch (plan) {
                case SubscriptionType.MONTHLY:
                    product.price = product.monthlyPrice;
                    break;
                case SubscriptionType.YEARLY:
                    product.price = product.yearlyPrice;
                    break;
            }
            product.subscriptionType = plan;
            setSelectedProduct(product);
            handleOpenPayment();
        } else {
            toast.error("Please login to continue", toastConfig.error);
        }
    }

    return (
        <div className={rokkitt.className}>
            <HeadMeta metaTitle="Packages"/>
            <HeaderFive/>
            <div className="package-container">
                <Text className="m-4" size={36}>Get Your All-Inclusive Membership Now</Text>
                <Text className="m-2" size={28}>Our Most Popular Yearly Plan Is 33% Off</Text>
                <ButtonGroup className="m-4">
                    <Button color="blue" size="lg" onClick={() => setPlan("MONTHLY")} active={plan === "MONTHLY"}>
                        <Text size={20} as="b">
                            Monthly
                        </Text>
                    </Button>
                    <Button color="blue" size="lg" onClick={() => setPlan("YEARLY")} active={plan === "YEARLY"}>
                        <Text size={20} as="b">
                            Yearly
                        </Text>
                    </Button>
                </ButtonGroup>
                {plan === SubscriptionType.MONTHLY &&
                    <CardGroup className="m-4" columns={3}>
                        {packages.slice(0, 3).map((product, index) => (
                            <Card key={index} className="package-card" classPrefix="rsuite-card">
                                <Card.Header className="w-100">
                                    <div className={"position-relative w-100"}>
                                        <Image className="position-absolute start-0 top-0" src="/images/sale.png"
                                               alt="sale"
                                               width="80"
                                               height="80"/>
                                        <Text className="p-4" size={24}>{product.name}</Text>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Text className="m-2" as="del" size={28}
                                          muted>${product.originalMonthlyPrice}/mo</Text>
                                    <Text className="m-2" size={40}>${product.monthlyPrice}/mo</Text>
                                    <Text className="m-2" size={20}>{product.description}</Text>
                                </Card.Body>
                                <Card.Footer className="m-auto">
                                    <Button size="lg" onClick={() => handleBuy(product)}>
                                        <Text size={20}>
                                            Get PRO
                                        </Text>
                                    </Button>
                                </Card.Footer>
                            </Card>

                        ))
                        }
                    </CardGroup>
                }

                {plan === SubscriptionType.YEARLY &&
                    <CardGroup className="m-4" columns={3}>
                        {packages.slice(0, 3).map((product, index) => (
                            <Card key={index} className="package-card" classPrefix="rsuite-card">
                                <Card.Header className="w-100">
                                    <div className={"position-relative w-100"}>
                                        <Image className="position-absolute start-0 top-0" src="/images/sale.png"
                                               alt="sale"
                                               width="80"
                                               height="80"/>
                                        <Text className="p-4" size={24}>{product.name}</Text>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Text className="m-2" size={40}>${product.monthlyPriceByYearlyPrice}/mo</Text>
                                    <Text className="m-2" size={24}>${product.yearlyPrice} paid yearly</Text>
                                    <Text className="m-2" size={20}>{product.description}</Text>
                                </Card.Body>
                                <Card.Footer className="m-auto">
                                    <Button size="lg" onClick={() => handleBuy(product)}>
                                        <Text size={20}>
                                            Get PRO
                                        </Text>
                                    </Button>
                                </Card.Footer>
                            </Card>
                        ))
                        }
                    </CardGroup>
                }
            </div>
            <ModalBuyPackage open={openPayment} handleClose={handleClosePayment} product={selectedProduct}
                             user={user}/>
            <FooterOne/>
        </div>
    );
}

export default PackagesPage;

export async function getStaticProps() {
    const allPackages = await getPackages();

    return {
        props: {
            allPackages
        },
        revalidate: 1800,
    };
}