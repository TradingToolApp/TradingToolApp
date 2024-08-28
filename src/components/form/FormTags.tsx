"use client";

import React, { useRef, useContext, useState } from "react";
import {
    Form,
    Schema,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col,
} from "rsuite";
import slugify from "slugify";
import { AppContext } from "@/providers/app.provider";
import { TagContext } from "@/providers/tag.provider";
import tagAPI from "@/services/tag-api";
import {toast} from "react-toastify";
import {toastConfig} from "@/lib/constant";

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
    const { language } = useContext(AppContext);
    const { allDataTags, setAllDataTags } = useContext(TagContext);
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);

    const formRef: any = useRef(initialFormValue);

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

            switch (action) {
                case "CREATE":
                    const resCreate = await tagAPI.createTag(newTag);
                    if (!resCreate.success) {
                        return toast.error(resCreate.message, toastConfig.error as any);
                    }
                    setAllDataTags([...allDataTags, resCreate.data]);
                    break;
                case "UPDATE":
                    const resUpdate = await tagAPI.updateTag(newTag);
                    if (!resUpdate.success) {
                        return toast.error(resUpdate.message, toastConfig.error as any);
                    }

                    const updatedTags: any[] = allDataTags.map((tag: any) => {
                        if (tag.id === formValue.id) {
                            return resUpdate.data;
                        }
                        return tag;
                    });
                    setAllDataTags(updatedTags);
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
