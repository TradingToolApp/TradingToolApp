import React, {useEffect, useState} from "react";
import {Popover, Whisper, Tooltip, IconButton, Table, Input, InputGroup, Text, Tag, Button, HStack} from "rsuite";
import CopyIcon from '@rsuite/icons/Copy';
import {toast} from 'react-toastify';
import {toastConfig} from "@/libs/constant";

const {Cell} = Table;

export const DateTimeCell = ({rowData, dataKey, ...props}: any) => (
    <Cell {...props}>
        {new Date(rowData[dataKey!]).toLocaleDateString().slice(0, 8)}
    </Cell>
);

const styles = {
    width: 300,
    marginBottom: 10
};

export const LicenseKeyCell = ({rowData, dataKey, show, ...props}: any) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(rowData[dataKey!]);
        return toast.success("Copied!", toastConfig.success as any);
    }
    return (
        <Cell {...props} style={{padding: "5px"}}>
            <InputGroup inside style={styles}>
                {
                    show ?
                        <Input as="textarea" rows={9} value={rowData[dataKey!]}/>
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
    const handleRemoveDevice = (id: any) => {
        console.log(id)
    };
    return (
        <Cell {...props}>
            {
                show ?
                    devices.map((item: any, index: any) => {
                        return (
                            <HStack key={index} justifyContent="space-between">
                                <Text size="xl">Device {index}: {item.name}</Text>
                                <Button size="xs" appearance="link"
                                        onClick={() => handleRemoveDevice(item.name)}>remove</Button>
                            </HStack>
                        )
                    })
                    :
                    <>
                        <Text size="xl">Device 0: {devices[0].name}</Text>
                    </>
            }
        </Cell>
    )
};