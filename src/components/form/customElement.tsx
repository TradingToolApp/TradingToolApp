import React from "react";
import {InputGroup, Input, SelectPicker, CheckPicker, Whisper, Tooltip, Form} from "rsuite";
import {FaCopy} from "react-icons/fa";

const styles = {
    marginBottom: 10
};

export const Textarea = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) => <Input {...props}
                                                                                                 as="textarea"
                                                                                                 ref={ref}/>);
Textarea.displayName = "Textarea";

export const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) =>
    <SelectPicker searchable={false} menuMaxHeight={200}
                  style={{width: "100px"}}
                  defaultValue={"false"} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";

export const InputWithCopyButton = ({value = "", ...props}: any) => (
    <Whisper trigger="click" speaker={<Tooltip>Copied</Tooltip>}>
        <InputGroup {...props} inside style={{height: "auto"}}>
            <Input value={value} readOnly/>
            <InputGroup.Button>
                <FaCopy/>
            </InputGroup.Button>
        </InputGroup>
    </Whisper>
);

export const CheckPickerCustom = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) =>
    <CheckPicker searchable={false} menuMaxHeight={200}
                 style={{width: "100px"}}
                 defaultValue={"false"} {...props} ref={ref}/>);
CheckPickerCustom.displayName = "CheckPickerCustom";

export const TextField = ({name, label, accepter, ...rest}: any) => (
    <Form.Group controlId={name}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
);
