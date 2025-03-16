import React from "react";
import {Grid, Row, Loader, HStack, Card, VStack} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import useCurrentUser from "@/hooks/useCurrentUser";
import TableLicenseInfo from "@/components/table/user/lisense-info/TableLisenseInfo";
import UserInfoCard from "@/components/card/UserInfoCard";
import FormUserAccounts from "@/components/form/user/user-accounts/FormUserAccounts";


const UserDashboard = () => {
    const user = useCurrentUser();

    if (user.profile === undefined || user.status === "loading") {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    return (
        <>
            <Grid className="d-flex flex-column vh-100 vw-100" fluid>
                <Row>
                    <HeadMeta metaTitle="User Dashboard"/>
                    <HeaderFive/>
                </Row>
                <HStack>
                    <HStack.Item grow={1}>
                        <VStack className="h-100 w-100">
                            <VStack.Item>
                                <UserInfoCard user={user}/>
                            </VStack.Item>
                            <VStack.Item grow={1} flex={1} className="h-100 w-100">
                                <div className="d-flex flex-row h-100 w-100">
                                    <Card size="lg" shaded className="w-75">
                                        <Card.Header className="mb-0" as="h4">Subscription</Card.Header>
                                        <Card.Body className="d-flex flex-column h-100 mx-2">
                                            <TableLicenseInfo user={user.profile}/>
                                        </Card.Body>
                                    </Card>
                                    <div className="mx-4 bordered w-25 p-4">
                                        <h4>Accounts</h4>
                                        <FormUserAccounts user={user.profile}/>
                                    </div>
                                </div>
                            </VStack.Item>
                        </VStack>
                    </HStack.Item>
                </HStack>
            </Grid>
        </>
    );
}
export default UserDashboard;