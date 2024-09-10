import React from "react";
import {Input, SelectPicker} from "rsuite";


export const Textarea = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) => <Input {...props} as="textarea" ref={ref}/>);
Textarea.displayName = "Textarea";

export const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) =>
    <SelectPicker searchable={false} menuMaxHeight={200}
                  style={{width: "100px"}}
                  defaultValue={"false"} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";