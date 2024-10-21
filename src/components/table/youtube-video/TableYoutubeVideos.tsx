import React, {useState} from "react";
import {
    Table,
    Stack,
    Button
} from "rsuite";
import { ActionCell, BooleanCell } from "./CellYoutubeVideos";
import MoreIcon from "@rsuite/icons/legacy/More";
import ModalAddYoutube from "@/components/modal/widgets/youtube/ModalAddYoutube";
import useWindowSize from "@/hooks/useWindowSize";
import {useGetYoutubeVideos} from "@/hooks/data/useYoutubeVideos";
const { Column, HeaderCell, Cell } = Table;

const TableYoutubeVideos = ({ tableData }: any) => {
    const { youtubeVideos } = useGetYoutubeVideos(tableData);
    const { screenHeight } = useWindowSize();
    const [ openAdd, setOpenAdd ] = useState(false);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    return (
        <>
            <Stack className="table-toolbar" style={{ marginTop: "10px" }} justifyContent="space-between">
                <Stack spacing={6}>
                </Stack>
                <Stack style={{ marginRight: "20px" }}>
                    <Button size="lg" onClick={handleOpenAdd}>
                        Add Link
                    </Button>
                </Stack>
            </Stack>

            <Table
                height={screenHeight - 200}
                data={youtubeVideos}
            >
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Title</HeaderCell>
                    <Cell dataKey="title"/>
                </Column>
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Youtube Link</HeaderCell>
                    <Cell dataKey="videoUrl"/>
                </Column>
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Published</HeaderCell>
                    <BooleanCell dataKey="published"/>
                </Column>

                <Column align="center" width={150}>
                    <HeaderCell>
                        <MoreIcon/>
                    </HeaderCell>
                    <ActionCell dataKey="id"/>
                </Column>
            </Table>
            <ModalAddYoutube open={openAdd} handleClose={handleCloseAdd}/>
        </>
    );
};

export default TableYoutubeVideos;