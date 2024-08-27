"use client";

import React, { useRef, useContext, useState } from "react";
import {
    Form,
    Schema,
    CheckPicker,
    SelectPicker,
    Input,
    PanelGroup,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col,
    useToaster,
    Message,
} from "rsuite";
import slugify from "slugify";
import ModalImage from "@/components/modal/ModalImage";
import { AppContext } from "@/providers/appProvider";
import Image from "next/image";
import tagAPI from "@/services/tag-api";
import { TagContext } from "@/providers/tagProvider";

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => <Input {...props} as="textarea" ref={ref}/>);
Textarea.displayName = "Textarea";

const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props, ref) => <SelectPicker searchable={false} menuMaxHeight={200}
                                                                                                 style={{width: "100px"}} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";

const {StringType} = Schema.Types;

const model = Schema.Model({
    tagEN: StringType().isRequired("This field is required."),
    tagVI: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    value: "",
    label: "",
    tag_slug: "",
    tagEN: "",
    tagVI: "",
}

//This component do 2 jobs, create new tag and update tag
const FormTags = ({formData, handleClose, action, ...rests}: any) => {
    const toaster = useToaster();
    const {language} = useContext(AppContext);
    const {tags, setTags} = useContext(TagContext);
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    console.log(tags)
    const formRef: any = useRef(initialFormValue);
    const hasFormValue = Boolean(formValue);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error(formRef.current);
            return;
        }

        try {
            //on create => generate new slug(fileName), else use the old one
            const newTag = {
                ...formValue,
                tag_slug: action === "CREATE" ? slugify(formValue.tagEN, {lower: true}) : formValue.tag_slug,
                label: language === "en" ? formValue.tagEN : formValue.tagVI,
            };

            console.log(newTag)

            switch (action) {
                case "CREATE":
                    const resCreate = await tagAPI.createTag(newTag);
                    if (!resCreate.success) {
                        return toaster.push(<Message type={"error"}>{resCreate.message}</Message>);
                    }
                    setTags([...tags, newTag]);
                    break;
                case "UPDATE":
                    const resUpdate = await tagAPI.updateTag(newTag);
                    if (!resUpdate.success) {
                        return toaster.push(<Message type={"error"}>{resUpdate.message}</Message>);
                    }
                    const updatedTags: any[] = tags.filter((tag: any) => tag.tag_slug !== formValue.tag_slug);
                    const index = tags.findIndex((tag: any) => tag.tag_slug === formValue.tag_slug);
                    updatedTags.splice(index, 0, newTag);
                    setTags(updatedTags);
                    break;
                default:
                    break;
            }

            setFormValue(initialFormValue);
            handleClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <Row>
                    <Panel>
                        <Grid fluid>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="tagEN">
                                        <Form.ControlLabel>Tag EN</Form.ControlLabel>
                                        <Form.Control name="tagEN"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={12}>
                                    <Form.Group controlId="tagVI">
                                        <Form.ControlLabel>Tag VI</Form.ControlLabel>
                                        <Form.Control name="tagVI"/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                </Row>
                <ButtonToolbar style={{marginTop: "20px", marginRight: "10px", float: "right"}}>
                    <Button appearance="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button appearance="default" onClick={handleClose}>
                        Cancel
                    </Button>
                </ButtonToolbar>
            </Form>
        </>
    );
};

export default FormTags;
