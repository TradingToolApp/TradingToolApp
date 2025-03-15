import {Grid, Row, Col, Loader} from 'rsuite';
import HeadMeta from "../../../components/elements/HeadMeta";
import HeaderFive from "../../../components/header/HeaderFive";
import dynamic from "next/dynamic";
import {getSubscribedUsers} from "@/libs/api-client/prisma/subcription.api";
import useWindowSize from "@/hooks/useWindowSize";
import {useSubscribedUsers} from "@/hooks/data/admin/useSubscriptions";
import React from "react";

const SideBarAdmin = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableSubscribedUsers = dynamic(() => import("@/components/table/admin/users/TableSubscribedUsers"), {ssr: false});

const Subscribed = ({allData}) => {
    const {subscribedUsers} = useSubscribedUsers(allData);
    const {screenHeight} = useWindowSize();

    if (subscribedUsers === undefined) {
        return <Loader size="md" style={{minHeight: "100vh", margin: "0"}} backdrop
                       content="loading..." vertical/>
    }

    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard"/>
                <HeaderFive/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="sidebar"
                     style={{height: `${screenHeight - 120}px`}}>
                    <SideBarAdmin/>
                </Col>
                <Col className="flex-grow-1 bordered"
                     style={{height: `${screenHeight - 120}px`}}>
                    <TableSubscribedUsers tableData={subscribedUsers}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default Subscribed;

export async function getStaticProps() {
    const allData = await getSubscribedUsers();

    return {
        props: {
            allData,
        },
        revalidate: 3600,
    }
}