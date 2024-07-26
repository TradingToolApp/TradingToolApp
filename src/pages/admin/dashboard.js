import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "../../components/elements/HeadMeta";
import HeaderThree from "../../components/header/HeaderThree";
import SideBarThree from "../../components/sidebar/SideBarThree";
import dynamic from "next/dynamic";
import { PostProvider } from "@/contextProvider/postContext";

const TableOne = dynamic(() => import("../../components/table/TableOne"), { ssr: false });

const AdminDashboard = ({ allPosts }) => {
    return (
        <PostProvider>
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
                        <TableOne />
                    </Col>
                </Row>
            </Grid>
        </PostProvider>
    );
}
export default AdminDashboard;

// export const getStaticProps = async () => {

//     const feed = await prisma.post.findMany({
//         // where: { published: true },
//         // include: {
//         //     author: {
//         //         select: { name: true },
//         //     },
//         // },
//     });
//     return {
//         props: { feed },
//         revalidate: 10,
//     };
// };