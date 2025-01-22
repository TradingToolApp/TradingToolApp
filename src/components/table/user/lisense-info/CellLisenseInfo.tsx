import React, {useState} from "react";
import {Table, Input, InputGroup, Text, VStack, Button, HStack} from "rsuite";
import CopyIcon from '@rsuite/icons/Copy';
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";
import ModalRemoveRegisteredDevice from "@/components/modal/user/info/ModalRemoveRegisteredDevice";

const {Cell} = Table;

export const DateTimeCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props}>
        {new Date(rowData[dataKey!]).toLocaleDateString().slice(0, 9)}
    </Cell>
);

const styles = {
    width: "auto",
};

export const LicenseKeyCell = ({rowData, dataKey, show, ...props}: any) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(rowData[dataKey!]);
        return toast.success("Copied!", toastConfig.success as any);
    }
    return (
        <Cell {...props}>
            <InputGroup inside style={styles}>
                {
                    show ?
                        <Input as="textarea" rows={6} value={rowData[dataKey!]}/>
                        :
                        <Input value={rowData[dataKey!]} readOnly/>
                }
                <InputGroup.Button style={{height: "auto"}}>
                    <CopyIcon onClick={handleCopy}/>
                </InputGroup.Button>
            </InputGroup>
        </Cell>
    )
};

export const ArrayCell = ({rowData, dataKey, show, ...props}: any) => {
    const devices = rowData[dataKey!];
    const [openRemoveRegisteredDevice, setOpenRemoveRegisteredDevice] = useState(false);
    const [removeItem, setRemoveItem] = useState({})
    const handleOpenRemoveRegisteredDevice = () => setOpenRemoveRegisteredDevice(true);
    const handleCloseRemoveRegisteredDevice = () => setOpenRemoveRegisteredDevice(false);

    const handleRemoveDevice = async (item: any) => {
        handleOpenRemoveRegisteredDevice();
        setRemoveItem(item);
    };

    return (
        <>
            <Cell {...props} style={{paddingTop: 17}}>
                {
                    show ?
                        devices.map((item: any, index: any) => {
                            return (
                                <HStack key={index} justifyContent="space-between" style={{marginBottom: 10}}>
                                    <Text size="lg">{item.macAddress} - {item.name}</Text>
                                    <Button size="xs"
                                            onClick={() => handleRemoveDevice(item)}>remove</Button>
                                </HStack>
                            )
                        })
                        :
                        <Text size="lg">{devices[0].macAddress} - {devices[0].name}</Text>
                }
            </Cell>
            <ModalRemoveRegisteredDevice modalData={removeItem} open={openRemoveRegisteredDevice}
                                         handleClose={handleCloseRemoveRegisteredDevice}/>
        </>
    )
};