import React, {useState} from "react";
import {Popover, Whisper, Dropdown, IconButton, Table} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalUpdateProduct from "@/components/modal/admin/products/ModalUpdateProduct";
import ModalDeleteProduct from "@/components/modal/admin/products/ModalDeleteProduct";

const {Cell} = Table;

export const ActionCell = ({rowData, ...rests}: any) => {
    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
    const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
    const handleOpenUpdateProduct = () => setOpenUpdateProduct(true);
    const handleCloseUpdateProduct = () => setOpenUpdateProduct(false);
    const handleOpenDeleteProduct = () => setOpenDeleteProduct(true);
    const handleCloseDeleteProduct = () => setOpenDeleteProduct(false);

    const renderMenu = ({onClose, left, top, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Edit
                    handleOpenUpdateProduct();
                    break;
                case 2:
                    // Delete
                    handleOpenDeleteProduct();
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

            <ModalUpdateProduct modalData={rowData} open={openUpdateProduct} handleClose={handleCloseUpdateProduct}/>
            <ModalDeleteProduct modalData={rowData} open={openDeleteProduct} handleClose={handleCloseDeleteProduct}/>
        </>
    );
};

export const BooleanCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px"}}>
        {rowData[dataKey] === true ? "Yes" : "No"}
    </Cell>
);
