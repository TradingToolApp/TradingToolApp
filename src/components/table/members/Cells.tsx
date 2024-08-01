import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Popover, Whisper, Checkbox, Dropdown, IconButton, Table, CellProps } from "rsuite";
import MoreIcon from "@rsuite/icons/legacy/More";
import DeleteTableRowModal from "./DeleteTableRowModal";
import EditTableRowModal from "./EditTableRowModal";

const { Cell } = Table;

export const NameCell = ({ rowData, dataKey, ...props }: any) => {
  const speaker = (
    <Popover title="Description">
      <p>
        <b>Name:</b> {rowData.name}
      </p>
      <p>
        <b>Gender:</b> {rowData.gender}
      </p>
      <p>
        <b>City:</b> {rowData.city}
      </p>
      <p>
        <b>Street:</b> {rowData.street}
      </p>
    </Popover>
  );

  return (
    <Cell {...props} style={{ padding: "4px" }}>
      <Whisper placement="top" speaker={speaker}>
        <a>{dataKey ? rowData[dataKey] : null}</a>
      </Whisper>
    </Cell>
  );
};

export const ImageCell = ({ rowData, dataKey, ...props }: any) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: "#f5f5f5",
        borderRadius: 6,
        marginTop: 2,
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      <Image src={rowData[dataKey!] ?? ""} width="40" alt="Image cell"/>
    </div>
  </Cell>
);

export const CheckCell = ({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  ...props
}: any & {
  checkedKeys: number[];
  onChange: (value: any, checked: boolean) => void;
}) => (
  <Cell {...props} style={{ padding: "4px" }}>
    <div style={{ lineHeight: "46px" }}>
      <Checkbox value={rowData[dataKey!]} inline onChange={onChange} checked={checkedKeys.some((item: any) => item === rowData[dataKey!])} />
    </div>
  </Cell>
);

export const ActionCell = ({ rowData, ...rests }: any) => {
  const [openEditRow, setOpenEditRow] = useState(false);
  const [openDeleteRow, setOpenDeleteRow] = useState(false);
  const [slug, setSlug] = useState(null);

  const handleOpenEditRow = (slug: any) => {
    setSlug(slug);
    setOpenEditRow(true);
  };
  const handleCloseEditRow = () => setOpenEditRow(false);

    const handleOpenDeleteRow = (slug: any) => {
      setSlug(slug);
      setOpenDeleteRow(true);
    };
    const handleCloseDeleteRow = () => setOpenDeleteRow(false);

  const renderMenu = ({ onClose, left, top, className }: any, ref: any) => {
    const handleSelect = (eventKey: any) => {
      switch (eventKey) {
        case 1:
          // Edit
          handleOpenEditRow(rowData.slug);
          break;
        case 2:
          // Delete
          handleOpenDeleteRow(rowData.slug);
          break;
        default:
          break;
      }
      onClose();
    };
    return (
      <>
        <Popover ref={ref} className={className} style={{ left, top }} full>
          <Dropdown.Menu onSelect={handleSelect}>
            <Dropdown.Item eventKey={1}>Edit</Dropdown.Item>
            <Dropdown.Item eventKey={2}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Popover>
      </>
    );
  };

  return (
    <>
      <Cell {...rests} className="link-group" style={{padding: "4px"}}>
        <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
          <IconButton appearance="subtle" icon={<MoreIcon />} />
        </Whisper>
      </Cell>

      <EditTableRowModal modalData={rowData} openEditRow={openEditRow} handleCloseEditRow={handleCloseEditRow} />
      <DeleteTableRowModal slug={slug} open={openDeleteRow} handleCloseDeleteRow={handleCloseDeleteRow} />
    </>
  );
};
