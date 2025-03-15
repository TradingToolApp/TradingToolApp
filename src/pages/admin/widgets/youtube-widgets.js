import {Grid, Row, Col} from 'rsuite';
import HeadMeta from "@/components/elements/HeadMeta";
import HeaderFive from "@/components/header/HeaderFive";
import {getYoutubeWidgetData} from "@/libs/api-client/prisma/youtube-widget.api";
import dynamic from "next/dynamic";

const SideBarOne = dynamic(() => import("@/components/sidebar/SideBarAdmin"), {ssr: false})
const TableYoutubeVideos = dynamic(() => import("@/components/table/admin/youtube-video/TableYoutubeVideos"), {ssr: false});

const YoutubeWidgets = ({youtubeVideos}) => {
    return (
        <Grid className="d-flex flex-column vh-100 vw-100" fluid>
            <Row>
                <HeadMeta metaTitle="Admin Dashboard"/>
                <HeaderFive/>
            </Row>
            <Row className="h-100 overflow-y-auto d-flex flex-row">
                <Col className="h-100">
                    <SideBarOne/>
                </Col>
                <Col className="flex-grow-1 h-100 bordered">
                    <TableYoutubeVideos tableData={youtubeVideos}/>
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