import React, { useState } from 'react';
import {
    Input,
    InputGroup,
    Table,
    Button,
    DOMHelper,
    Progress,
    Checkbox,
    Stack,
    SelectPicker
} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import MoreIcon from '@rsuite/icons/legacy/More';
// import DrawerView from './DrawerView';
// import { mockUsers } from '@/data/mock';
// import { NameCell, ImageCell, CheckCell, ActionCell } from './Cells';

// const data = mockUsers(20);

const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;
import data from './data';
// const data = mockUsers(20);
// console.log(data);
const App = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [rating, setRating] = useState(null);

    let checked = false;
    let indeterminate = false;

    if (checkedKeys.length === data.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
        indeterminate = true;
    }

    const handleCheckAll = (_value, checked) => {
        const keys = checked ? data.map(item => item.id) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setSortColumn(sortColumn);
        setSortType(sortType);
    };

    const filteredData = () => {
        const filtered = data.filter(item => {
            if (!item.title.includes(searchKeyword)) {
                return false;
            }

            // if (rating && item.rating !== rating) {
            //     return false;
            // }

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
        <>
            <Stack className="table-toolbar" justifyContent="space-between">
                <Button appearance="primary" onClick={() => setShowDrawer(true)}>
                    Add Member
                </Button>

                <Stack spacing={6}>
                    <SelectPicker
                        label="Rating"
                        data={ratingList}
                        searchable={false}
                        value={rating}
                        onChange={setRating}
                    />
                    <InputGroup inside>
                        <Input placeholder="Search" value={searchKeyword} onChange={setSearchKeyword} />
                        <InputGroup.Addon>
                            <SearchIcon />
                        </InputGroup.Addon>
                    </InputGroup>
                </Stack>
            </Stack>
            <Table
                fillHeight
                data={filteredData}
                onRowClick={rowData => {
                    // console.log(rowData);
                }}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column flexGrow={1} sortable>
                    <HeaderCell>title</HeaderCell>
                    <Cell dataKey="title" />
                </Column>

                <Column align="center" width={150} sortable>
                    <HeaderCell>Category</HeaderCell>
                    <Cell dataKey="cate" />
                </Column>

                <Column align="center" width={150} sortable>
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="date" />
                </Column>

                <Column width={80} fixed="right">
                    <HeaderCell>...</HeaderCell>

                    <Cell style={{ padding: '6px' }}>
                        {rowData => (
                            <Button appearance="link" onClick={() => alert(`id:${rowData.id}`)}>
                                Edit
                            </Button>
                        )}
                    </Cell>
                </Column>
            </Table>
        </>
    );
};

export default App;