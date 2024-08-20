import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import SideBarThree from "@/components/sidebar/SideBarThree";
import dynamic from "next/dynamic";

const TablePosts = dynamic(() => import("@/components/table/posts/TablePosts"), { ssr: false });

const AdminDashboard = ({ allPosts }) => {
    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard" />
                <HeaderThree />
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="h-100">
                    <SideBarThree />
                </Col>
                <Col className="flex-grow-1 h-100">
                    <TablePosts />
                </Col>
            </Row>
        </Grid>
    );
}
export default AdminDashboard;

// export async function getStaticProps() {
//     const allPosts = getAllPosts([
//         'slug',
//         'postFormat',
//         'story',
//         'trending',
//         'title',
//         'excerpt',
//         'featureImg',
//         'cate',
//         'cate_bg',
//         'cate_img',
//         'author_name',
//         'author_img',
//         'date',
//         'post_views',
//         'post_share',
//     ])

//     return {
//         props: { allPosts }
//     }
// }