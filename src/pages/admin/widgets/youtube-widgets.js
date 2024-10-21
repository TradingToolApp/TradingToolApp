import { Grid, Row, Col } from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderThree from "@/components/header/HeaderThree";
import SideBarThree from "@/components/sidebar/SideBarThree";
import { getYoutubeWidgetData } from "@/services/prisma/youtube-widget.api";
import dynamic from "next/dynamic";

const TableWidgets = dynamic( // this is to wait for window object to be available
    () => {
        return import("@/components/table/youtube-video/TableYoutubeVideos");
    },
);

const YoutubeWidgets = ({ youtubeVideos }) => {
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
                    <TableWidgets tableData={youtubeVideos}/>
                </Col>
            </Row>
        </Grid>
    );
}
export default YoutubeWidgets;

export async function getStaticProps() {
    const youtubeVideos = await getYoutubeWidgetData();
    return {
        props: {
            youtubeVideos
        },
        revalidate: 3600
    }
}