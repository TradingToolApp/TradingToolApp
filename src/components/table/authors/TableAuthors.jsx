import React, { useState, useContext } from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button
} from "rsuite";
import { AuthorContext } from "@/providers/author.provider";
import { ActionCell, ImageCell } from "./CellAuthors";
import ModalAddAuthor from "../../modal/authors/ModalAddAuthor";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from "@rsuite/icons/legacy/More";
const { Column, HeaderCell, Cell } = Table;

const TableAuthors = () => {
    const { authors } = useContext(AuthorContext);
    const [ sortColumn, setSortColumn ] = useState("id");
    const [ sortType, setSortType ] = useState();
    const [ searchKeyword, setSearchKeyword ] = useState("");
    const [ openAddAuthor, setOpenAddAuthor ] = useState(false);

    const handleOpenAddAuthor = () => setOpenAddAuthor(true);
    const handleCloseAddAuthor = () => setOpenAddAuthor(false);

    const handleSortColumn = ( sortColumn, sortType ) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const filteredData = () => {
        const filtered = authors.filter(( item ) => {
            if (!item.author_name.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        return filtered;
    };
    console.log("table author re-render");

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
                    <Button size="lg" onClick={handleOpenAddAuthor}>
                        Add Author
                    </Button>
                </Stack>
            </Stack>

            <Table
                height={window.innerHeight - 200}
                data={filteredData()}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column width={150}>
                    <HeaderCell>Image</HeaderCell>
                    <ImageCell dataKey="author_img"/>
                </Column>

                <Column flexGrow={1} sortable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="author_name"/>
                </Column>

                <Column align="center" width={150}>
                    <HeaderCell>
                        <MoreIcon/>
                    </HeaderCell>
                    <ActionCell dataKey="id"/>
                </Column>
            </Table>
            <ModalAddAuthor open={openAddAuthor} handleClose={handleCloseAddAuthor}/>
        </div>
    );
};

export default TableAuthors;
