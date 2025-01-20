import React, {useState} from "react";
import {useRouter} from "next/router";
import {Popover, Whisper, Dropdown, IconButton, Table} from "rsuite";
import MoreIcon from '@rsuite/icons/More';
import ModalDeletePost from "../../../modal/admin/posts/ModalDeletePost";
import ModalEditPost from "../../../modal/admin/posts/ModalEditPost";
import Link from "next/link";

const {Cell} = Table;

export const UpperCaseCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px 10px"}}>
        {dataKey ? rowData[dataKey].charAt(0).toUpperCase() + rowData[dataKey].slice(1) : null}
    </Cell>
);

export const BooleanCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props} style={{padding: "13px"}}>
        {rowData[dataKey] === true ? "Yes" : "No"}
    </Cell>
);

export const ActionCell = ({rowData, ...rests}: any) => {
    const router = useRouter();
    const [openUpdatePost, setOpenUpdatePost] = useState(false);
    const [openDeletePost, setOpenDeletePost] = useState(false);

    const handleOpenUpdatePost = () => setOpenUpdatePost(true);
    const handleCloseUpdatePost = () => setOpenUpdatePost(false);
    const handleOpenDeletePost = () => setOpenDeletePost(true);
    const handleCloseDeletePost = () => setOpenDeletePost(false);

    const renderMenu = ({onClose, left, top, right, className}: any, ref: any) => {
        const handleSelect = (eventKey: any) => {
            switch (eventKey) {
                case 1:
                    // Open
                    // window.open(`/post/${rowData.slug}`, '_ blank', 'noopener,noreferrer');
                    // router.push(`/post/${rowData.slug}`);
                    break;
                case 2:
                    // Edit
                    handleOpenUpdatePost();
                    break;
                case 3:
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
                <Popover ref={ref} className={className} style={{right, top}} full>
                    <Dropdown.Menu onSelect={handleSelect}>
                        <Dropdown.Item eventKey={1}>
                            <Link href={`/post/${rowData.slug}`} target="_blank" rel="noopener noreferrer">
                                <div style={{color: "black"}}>Open</div>
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey={2}>Edit</Dropdown.Item>
                        <Dropdown.Item eventKey={3}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Popover>
            </>
        );
    };

    return (
        <>
            <Cell {...rests} className="link-group" style={{padding: "4px"}}>
                <Whisper placement="bottomEnd" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon/>}/>
                </Whisper>
            </Cell>

            <ModalEditPost modalData={rowData} open={openUpdatePost} handleClose={handleCloseUpdatePost}/>
            <ModalDeletePost modalData={rowData} open={openDeletePost} handleClose={handleCloseDeletePost}/>
        </>
    );
};
