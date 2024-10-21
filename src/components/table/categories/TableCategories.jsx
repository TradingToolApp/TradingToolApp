import React, { useState } from "react";
import {
    Input,
    InputGroup,
    Table,
    Stack,
    Button
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from "@rsuite/icons/legacy/More";
import { ActionCell, ImageCell } from "./CellCategories";
import ModalAddCategory from "../../modal/categories/ModalAddCategory";
import useWindowSize from "@/hooks/useWindowSize";
import { useGetCategories } from "@/hooks/data/useCategories";

const { Column, HeaderCell, Cell } = Table;

const TableCategories = ( { tableData } ) => {
    const { screenHeight } = useWindowSize();
    const { categories } = useGetCategories(tableData);
    const [ sortColumn, setSortColumn ] = useState("id");
    const [ sortType, setSortType ] = useState();
    const [ searchKeyword, setSearchKeyword ] = useState("");
    const [ openAddCategory, setOpenAddCategory ] = useState(false);

    const handleOpenAddCategory = () => setOpenAddCategory(true);
    const handleCloseAddCategory = () => setOpenAddCategory(false);

    const handleSortColumn = ( sortColumn, sortType ) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const filteredData = () => {
        const filtered = categories.filter(( item ) => {
            if (!item.label.toLowerCase().includes(searchKeyword.toLowerCase())) {
                return false;
            }

            return true;
        });

        if (sortColumn && sortType) {
            return filtered.sort(( a, b ) => {
                let x = a[sortColumn];
                let y = b[sortColumn];

                if (typeof x === 'string') {
                    x = x.charCodeAt(0);
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt(0);
                }

                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
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
                    <Button size="lg" onClick={handleOpenAddCategory}>
                        Add Category
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
                <Column width={150}>
                    <HeaderCell>Image</HeaderCell>
                    <ImageCell dataKey="cate_img"/>
                </Column>

                <Column flexGrow={1} sortable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="label"/>
                </Column>

                <Column align="center" width={150}>
                    <HeaderCell>
                        <MoreIcon/>
                    </HeaderCell>
                    <ActionCell dataKey="id"/>
                </Column>
            </Table>
            <ModalAddCategory open={openAddCategory} handleClose={handleCloseAddCategory}/>
        </div>
    );
};

export default TableCategories;
