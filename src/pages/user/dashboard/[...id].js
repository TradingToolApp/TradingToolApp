import React, {useEffect} from "react";
import {Grid, Row, Col, Loader, HStack, Avatar, Text, Card, VStack, Button, Table} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import dynamic from "next/dynamic";
import useCurrentUser from "@/hooks/useCurrentUser";
import useWindowSize from "@/hooks/useWindowSize";
import TableLicenseInfo from "@/components/table/user/lisense-info/TableLisenseInfo";
import UserInfoCard from "@/components/card/UserInfoCard";

const SideBarUser = dynamic(() => import("@/components/sidebar/SideBarUser"), {ssr: false})

const UserDashboard = () => {
    const user = useCurrentUser();
    const {screenHeight} = useWindowSize();

    if (user.status !== 'authenticated') {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    if (user.status === 'authenticated' && user.profile.length !== 0) {
        user.profile.subscriptions[0].registeredDevices = [
            {
                name: "iphone",
            },
            {
                name: "ipad",
            },
            {
                name: "desktop1",
            },
            {
                name: "desktop2",
            },
            {
                name: "desktop3",
            },
        ]
    }

    return (
        <>
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="User Dashboard"/>
                    <HeaderThree/>
                </Row>
                <HStack>
                    <HStack.Item style={{height: `${screenHeight - 120}px`}}>
                        <SideBarUser/>
                    </HStack.Item>
                    <HStack.Item grow={1} style={{height: `${screenHeight - 120}px`}}>
                        <VStack className="h-100 w-100">
                            <VStack.Item>
                                <UserInfoCard user={user}/>
                            </VStack.Item>
                            <VStack.Item grow={1} flex={1} className="h-100 w-100">
                                <Card size="lg" shaded className="h-100 w-100">
                                    <Card.Header as="h5">Subscription</Card.Header>
                                    <Card.Body className="h-100">
                                        <TableLicenseInfo tableData={user.profile.subscriptions}/>
                                    </Card.Body>
                                </Card>
                            </VStack.Item>
                        </VStack>
                    </HStack.Item>
                </HStack>
            </Grid>

        </>
    );
}
export default UserDashboard;