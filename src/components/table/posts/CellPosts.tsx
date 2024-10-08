import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Popover, Whisper, Checkbox, Dropdown, IconButton, Table, CellProps} from "rsuite";
import MoreIcon from "@rsuite/icons/legacy/More";
import ModalDeletePost from "../../modal/posts/ModalDeletePost";
import ModalEditPost from "../../modal/posts/ModalEditPost";

const {Cell} = Table;

export const NameCell = ({rowData, dataKey, ...props}: any) => {
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
        <Cell {...props} style={{padding: "4px"}}>
            <Whisper placement="top" speaker={speaker}>
                <a>{dataKey ? rowData[dataKey] : null}</a>
            </Whisper>
        </Cell>
    );
};

export const UpperCaseCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px 10px"}}>
        {dataKey ? rowData[dataKey].charAt(0).toUpperCase() + rowData[dataKey].slice(1) : null}
    </Cell>
);

export const ImageCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "6px"}}>
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

export const ActionCell = ({rowData, ...rests}: any) => {
    const [openUpdatePost, setOpenUpdatePost] = useState(false);
    const [openDeletePost, setOpenDeletePost] = useState(false);

    const handleOpenUpdatePost = () => setOpenUpdatePost(true);
    const handleCloseUpdatePost = () => setOpenUpdatePost(false);
    const handleOpenDeletePost = () => setOpenDeletePost(true);
    const handleCloseDeletePost = () => setOpenDeletePost(false);

    const renderMenu = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Edit
                    handleOpenUpdatePost();
                    break;
                case 2:
                    // Delete
                    handleOpenDeletePost();
                    break;
                default:
                    break;
            }
            onClose();
        };
        return (
            <>
                <Popover ref={ref} className={className} style={{left, top}} full>
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
                    <IconButton appearance="subtle" icon={<MoreIcon/>}/>
                </Whisper>
            </Cell>

            <ModalEditPost modalData={rowData} open={openUpdatePost} handleClose={handleCloseUpdatePost}/>
            <ModalDeletePost modalData={rowData} open={openDeletePost} handleClose={handleCloseDeletePost}/>
        </>
    );
};
