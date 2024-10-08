import React, {useState, useContext, useEffect} from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button
} from "rsuite";
import { YoutubeContext } from "@/providers/widgets/youtube.provider";
import { ActionCell, BooleanCell } from "./CellWidgets";
import MoreIcon from "@rsuite/icons/legacy/More";
import ModalAddYoutube from "@/components/modal/widgets/youtube/ModalAddYoutube";
const { Column, HeaderCell, Cell } = Table;

const TableTags = () => {
    const { allDataYoutube } = useContext(YoutubeContext);
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
                height={window.innerHeight - 200}
                data={allDataYoutube}
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

export default TableTags;
