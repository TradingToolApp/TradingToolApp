import React, {useState, useContext, useEffect} from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button
} from "rsuite";
import {ActionCell, BooleanCell, TranslatableCell} from "./CellComments";
import MoreIcon from "@rsuite/icons/legacy/More";
import SearchIcon from "@rsuite/icons/Search";
import { CommentContext } from "@/providers/comment.provider";
const { Column, HeaderCell, Cell } = Table;

const TableComments = () => {
    const [ loading, setLoading ] = useState(true);
    const { comments } = useContext(CommentContext);
    const [ sortColumn, setSortColumn ] = useState("id");
    const [ sortType, setSortType ] = useState();
    const [ searchKeyword, setSearchKeyword ] = useState("");

    const handleSortColumn = ( sortColumn : any, sortType : any) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const filteredData = () => {
        const filtered = comments.filter(( item: any )=> {
            // if (!item.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
            //     return false;
            // }

            return true;
        });

        return filtered;
    };

    return (
        <>
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
                </Stack>
            </Stack>

            <Table
                height={window.innerHeight - 200}
                data={filteredData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Post</HeaderCell>
                    <Cell dataKey="title"/>
                </Column>
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Comment</HeaderCell>
                    <Cell dataKey="comment"/>
                </Column>
                <Column width={150} flexGrow={1}>
                    <HeaderCell>Reply</HeaderCell>
                    <Cell dataKey="reply"/>
                </Column>
                <Column width={120}>
                    <HeaderCell>Published</HeaderCell>
                    <BooleanCell dataKey="published"/>
                </Column>
                <Column width={120}>
                    <HeaderCell>Last Modify</HeaderCell>
                    <BooleanCell dataKey="updatedAt"/>
                </Column>

                <Column align="center" width={120}>
                    <HeaderCell>
                        <MoreIcon/>
                    </HeaderCell>
                    <ActionCell dataKey="id"/>
                </Column>
            </Table>
        </>
    );
};

export default TableComments;