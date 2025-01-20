import React, {useState} from "react";
import Image from "next/image";
import {Popover, Whisper, Dropdown, IconButton, Table} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalUpdateCategory from "../../../modal/admin/categories/ModalUpdateCategory";
import ModalDeleteCategory from "@/components/modal/admin/categories/ModalDeleteCategory";

const {Cell} = Table;

export const ImageCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: 0, marginLeft: "7px"}}>
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
            <Image src={rowData[dataKey!] ?? "/images/defaultCategoryImage.png"} width="40" height="40"
                   alt="Image cell"/>
        </div>
    </Cell>
);

export const ActionCell = ({rowData, ...rests}: any) => {
    const [openUpdateCategory, setOpenUpdateCategory] = useState(false);
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

    const handleOpenUpdateCategory = () => setOpenUpdateCategory(true);
    const handleCloseUpdateCategory = () => setOpenUpdateCategory(false);
    const handleOpenDeleteCategory = () => setOpenDeleteCategory(true);
    const handleCloseDeleteCategory = () => setOpenDeleteCategory(false);

    const renderMenu = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Edit
                    handleOpenUpdateCategory();
                    break;
                case 2:
                    // Delete
                    handleOpenDeleteCategory();
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

            <ModalUpdateCategory modalData={rowData} open={openUpdateCategory} handleClose={handleCloseUpdateCategory}/>
            <ModalDeleteCategory modalData={rowData} open={openDeleteCategory} handleClose={handleCloseDeleteCategory}/>
        </>
    );
};
