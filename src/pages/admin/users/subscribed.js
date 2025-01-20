import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "../../../components/elements/HeadMeta";
import HeaderThree from "../../../components/header/HeaderThree";
import dynamic from "next/dynamic";
import {getSubscribedUsers} from "@/libs/api-client/prisma/subcription.api";
import useWindowSize from "@/hooks/useWindowSize";

const SideBarAdmin = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableSubscribedUsers = dynamic(() => import("@/components/table/admin/users/TableSubscribedUsers"), {ssr: false});

const Subscribed = ({allData}) => {
    const {screenHeight} = useWindowSize();

    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard"/>
                <HeaderThree/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="sidebar"
                     style={{height: `${screenHeight - 120}px`}}>
                    <SideBarAdmin/>
                </Col>
                <Col className="flex-grow-1 bordered"
                     style={{height: `${screenHeight - 120}px`}}>
                    <TableSubscribedUsers tableData={allData}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default Subscribed;

export async function getStaticProps() {
    const subscribedUsers = await getSubscribedUsers();
    return {
        props: {
            allData: subscribedUsers,
        },
        revalidate: 3600,
    }
}