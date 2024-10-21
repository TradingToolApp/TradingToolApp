import React, { useState } from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button
} from "rsuite";
import { ActionCell } from "./CellTags";
import ModalAddTag from "../../modal/tags/ModalAddTag";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from "@rsuite/icons/legacy/More";
import useWindowSize from "@/hooks/useWindowSize";
import { useGetTags } from "@/hooks/data/useTags";
const { Column, HeaderCell, Cell } = Table;

const TableTags = ({ tableData }) => {
    const { screenHeight } = useWindowSize();
    const { tags } = useGetTags(tableData);
    const [ sortColumn, setSortColumn ] = useState("id");
    const [ sortType, setSortType ] = useState();
    const [ searchKeyword, setSearchKeyword ] = useState("");
    const [ openAddTag, setOpenAddTag ] = useState(false);

    const handleOpenAddTag = () => setOpenAddTag(true);
    const handleCloseAddTag = () => setOpenAddTag(false);

    const handleSortColumn = ( sortColumn, sortType ) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const filteredData = () => {
        const filtered = tags.filter(( item ) => {
            if (!item.label.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        return filtered;
    };

    return (
        <div>
            <Stack className="table-toolbar" style={{ marginTop: "10px" }} justifyContent="space-between">
                <Stack spacing={6}>
                    <InputGroup inside>
                        <Input
                            style={{ width: "400px" }}
                            placeholder="Search"
                            value={searchKeyword}
                            onChange={setSearchKeyword}
                        />
                        <InputGroup.Addon>
                            <SearchIcon/>
                        </InputGroup.Addon>
                    </InputGroup>
                </Stack>
                <Stack style={{ marginRight: "20px" }}>
                    <Button size="lg" onClick={handleOpenAddTag}>
                        Add Tag
                    </Button>
                </Stack>
            </Stack>

            <Table
                height={screenHeight - 200}
                data={filteredData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Tag</HeaderCell>
                    <Cell dataKey="label"/>
                </Column>

                <Column align="center" width={150}>
                    <HeaderCell>
                        <MoreIcon/>
                    </HeaderCell>
                    <ActionCell dataKey="id"/>
                </Column>
            </Table>
            <ModalAddTag open={openAddTag} handleClose={handleCloseAddTag}/>
        </div>
    );
};

export default TableTags;
