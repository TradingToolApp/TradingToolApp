import React, {useState} from 'react';
import Image from 'next/image';
import {Stack, Card, Divider, Button, TagGroup, Tag} from 'rsuite';
import FooterOne from "@/components/footer/FooterOne";
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import ModalCreatePayment from "@/components/modal/payments/ModalCreatePayment";
import useCurrentSession from "@/hooks/useCurrentSession";
import {useRouter} from "next/router";
import {SubscriptionPlans} from "@/libs/constant";

const Pricing = () => {
    const user = useCurrentSession();
    const router = useRouter();
    const [openModalPayment, setOpenModalPayment] = useState(false);
    const [paymentPlan, setPaymentPlan] = useState({});

    const handleOpenModalPayment = () => setOpenModalPayment(true);
    const handleCloseModalPayment = () => setOpenModalPayment(false);

    const handleMonthlyPayment = () => {
        if (user.status === "unauthenticated") {
            return router.push("/login");
        }
        setPaymentPlan(SubscriptionPlans.filter(plan => plan.type === "MONTHLY")[0]);
        handleOpenModalPayment();
    }

    const handleYearlyPayment = () => {
        if (user.status === "unauthenticated") {
            return router.push("/login");
        }
        setPaymentPlan(SubscriptionPlans.filter(plan => plan.type === "YEARLY")[0]);
        handleOpenModalPayment();
    }

    return (
        <>
            <HeadMeta metaTitle="Pricing"/>
            <HeaderThree/>
            <div style={{textAlign: "center", margin: "50px"}}>
                <h1>Pricing</h1>
                <p>Get started with our pricing plans.</p>
                <Stack spacing={30} justifyContent={"center"} style={{margin: "50px"}}>
                    <Card width={320} shaded>
                        <Image
                            src="https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974&auto=format&fit=crop"
                            alt="Shadow"
                            width={320}
                            height={320}
                        />
                        <Card.Header style={{marginBottom: "0px", textAlign: "center"}}>
                            <h2 style={{marginBottom: "10px", textAlign: "center"}}>
                                Monthly
                            </h2>
                            <h3 style={{marginBottom: "10px", textAlign: "center"}}>
                                $5
                            </h3>
                        </Card.Header>
                        <Divider style={{margin: 0}}/>
                        <Card.Body style={{textAlign: "justify"}}>
                            Meet Shadow, a spirited little explorer with a heart full of adventure! This charming pup
                            loves to roam the fields, soaking up the sights and sounds of nature.
                            <TagGroup>
                                <Tag size="sm">🐶 Dog</Tag>
                                <Tag size="sm">☀️ Sunny</Tag>
                                <Tag size="sm">🌈 Rainbow</Tag>
                            </TagGroup>
                        </Card.Body>
                        <Card.Footer style={{justifyContent: "center", marginTop: "10px"}}>
                            <Button
                                color="orange"
                                appearance="primary"
                                size={"lg"}
                                onClick={handleMonthlyPayment}
                            >
                                Pay Now
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card width={320} shaded>
                        <Image
                            src="https://images.unsplash.com/photo-1576606539605-b2a44fa58467?q=80&w=1974&auto=format&fit=crop"
                            alt="Shadow"
                            width={320}
                            height={320}
                        />
                        {/*<Card.Header style={{fontSize: "40px", fontWeight: "bold", textAlign: "center"}}>Basic</Card.Header>*/}
                        <Card.Header style={{marginBottom: "0px", textAlign: "center"}}>
                            <h2 style={{marginBottom: "10px", textAlign: "center"}}>
                                Yearly
                            </h2>
                            <h3 style={{marginBottom: "10px", textAlign: "center"}}>
                                $60
                            </h3>
                        </Card.Header>
                        <Divider style={{margin: 0}}/>
                        <Card.Body style={{textAlign: "justify"}}>
                            Meet Shadow, a spirited little explorer with a heart full of adventure! This charming pup
                            loves to roam the fields, soaking up the sights and sounds of nature.
                            <TagGroup>
                                <Tag size="sm">🐶 Dog</Tag>
                                <Tag size="sm">☀️ Sunny</Tag>
                                <Tag size="sm">🌈 Rainbow</Tag>
                            </TagGroup>
                        </Card.Body>
                        <Card.Footer style={{justifyContent: "center", marginTop: "10px"}}>
                            <Button
                                color="orange"
                                appearance="primary"
                                size={"lg"}
                                onClick={handleYearlyPayment}
                            >
                                Pay Now
                            </Button>
                        </Card.Footer>
                    </Card>
                </Stack>

            </div>
            <FooterOne/>
            <ModalCreatePayment open={openModalPayment} handleClose={handleCloseModalPayment}
                                paymentPlan={paymentPlan} user={user}/>
        </>
    );
}


export default Pricing;