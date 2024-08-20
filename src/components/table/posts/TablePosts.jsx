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
import { ActionCell } from "./CellPosts";
import { AppContext } from "@/providers/appProvider";
import ModalAddPost from "@/components/modal/posts/ModalAddPost";
const { Column, HeaderCell, Cell } = Table;


const TablePosts = () => {
  const { posts, categories } = useContext(AppContext);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortType, setSortType] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cate, setCate] = useState("");
  const [openAddPost, setOpenAddPost] = useState(false);

  const handleSortColumn = (sortColumn, sortType) => {
    setSortColumn(sortColumn);
    setSortType(sortType);
  };
  const handleOpenAddPost = () => setOpenAddPost(true);
  const handleCloseAddPost = () => setOpenAddPost(false);

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
        <Stack style={{ marginRight: "20px" }}>
          <SelectPicker
            style={{ marginRight: "10px" }}
            label="Category"
            data={categories}
            searchable={false}
            value={cate}
            onChange={setCate}
          />
          <Button size="lg" onClick={handleOpenAddPost}>
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

        <Column sortable>
          <HeaderCell>Post Format</HeaderCell>
          <Cell dataKey="postFormatLabel" />
        </Column>

        <Column align="center" width={150} sortable>
          <HeaderCell>Category</HeaderCell>
          <Cell dataKey="cate" />
        </Column>

        <Column align="center" width={150} sortable>
          <HeaderCell>Create Date</HeaderCell>
          <Cell dataKey="date" />
        </Column>

        <Column align="center" width={150} sortable>
          <HeaderCell>Last Update</HeaderCell>
          <Cell dataKey="updatedAt" />
        </Column>

        <Column align="center" width={150} sortable>
          <HeaderCell>Comments</HeaderCell>
          <Cell dataKey="post_share" />
        </Column>

        <Column align="center" width={150}>
          <HeaderCell>
            <MoreIcon />
          </HeaderCell>
          <ActionCell dataKey="id" />
        </Column>
      </Table>

      <ModalAddPost open={openAddPost} handleClose={handleCloseAddPost} />
    </div>
  );
};

export default TablePosts;