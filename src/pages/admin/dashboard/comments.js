import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import {getComments} from "@/libs/api-client/prisma/comment.api";
import dynamic from "next/dynamic"; // lazy loading

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableComments = dynamic(() => import("@/components/table/admin/comments/TableComments"), {ssr: false});

const Comments = ({allComments}) => {
    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard"/>
                <HeaderThree/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="h-100">
                    <SideBarOne/>
                </Col>
                <Col className="flex-grow-1 h-100 bordered">
                    <TableComments tableData={allComments}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default Comments;

export async function getStaticProps() {
    const allComments = await getComments();
    return {
        props: {
            allComments
        },
        revalidate: 3600
    }
}