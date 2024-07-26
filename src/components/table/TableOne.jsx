import React, { useState, useContext } from "react";
import {
  Input,
  InputGroup,
  Table,
  Stack,
  SelectPicker,
  Button
} from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
import MoreIcon from "@rsuite/icons/legacy/More";
import { ActionCell } from "./members/Cells";
import AddTableRowModal from "./members/AddTableRowModal";
import { PostContext } from "@/contextProvider/postContext";

const { Column, HeaderCell, Cell } = Table;

const cateList = [
  { value: "News", label: "News" },
  { value: "Study", label: "Study" },
  { value: "Tools", label: "Tools" },
  { value: "Discussion", label: "Discussion" },
];

const TableOne = () => {
  const { posts, loading } = useContext(PostContext);
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cate, setCate] = useState("");
  const [openAddRow, setOpenAddRow] = useState(false);

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };
  const handleOpenAddRow = () => setOpenAddRow(true);
  const handleCloseAddRow = () => setOpenAddRow(false);

  const filteredData = () => {
    const filtered = posts.filter((item) => {
      if (!item.title.toLowerCase().includes(searchKeyword.toLowerCase())) {
        return false;
      }

      if (cate && item.cate !== cate) {
        return false;
      }

      return true;
    });

    if (sortColumn && sortType) {
      return filtered.sort((a, b) => {
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
        <Stack spacing={6} >
          <InputGroup inside>
            <Input
              style={{ width: "400px" }}
              placeholder="Search"
              value={searchKeyword}
              onChange={setSearchKeyword}
            />
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
          </InputGroup>
        </Stack>
        <Stack style={{marginRight: "20px"}}>
          <SelectPicker
            style={{ marginRight: "10px" }}
            label="Category"
            data={cateList}
            searchable={false}
            value={cate}
            onChange={setCate}
          />
          <Button size="lg" onClick={handleOpenAddRow}>
            Add post
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
        <Column flexGrow={1} sortable>
          <HeaderCell>Post Title</HeaderCell>
          <Cell dataKey="title" />
        </Column>

        <Column align="center" width={150} sortable>
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="cate" />
        </Column>

        <Column align="center" sortable width={150}>
          <HeaderCell>Date</HeaderCell>
          <Cell dataKey="date" />
        </Column>

        <Column align="center" width={150}>
          <HeaderCell>
            <MoreIcon />
          </HeaderCell>
          <ActionCell dataKey="id" />
        </Column>
      </Table>

      <AddTableRowModal
        openAddRow={openAddRow}
        handleCloseAddRow={handleCloseAddRow}
      />
    </div>
  );
};

export default TableOne;
