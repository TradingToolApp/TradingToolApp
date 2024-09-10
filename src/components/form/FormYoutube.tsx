"use client";

import React, {useRef, useContext, useState} from "react";
import {
    Form,
    Schema,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col, SelectPicker,
} from "rsuite";
import slugify from "slugify";
import {AppContext} from "@/providers/app.provider";
import {YoutubeContext} from "@/providers/widgets/youtube.provider";
import youtubeAPI from "@/services/widgets/youtube-api";
import {toast} from "react-toastify";
import {toastConfig} from "@/lib/constant";

const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) => <SelectPicker searchable={false} menuMaxHeight={200}
                                                                                                 style={{width: "100px"}}
                                                                                                 data={[{value: true, label: "True"}, {value: false, label: "False"}]}
                                                                                                 defaultValue={"false"} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";

const {StringType} = Schema.Types;

const model = Schema.Model({
    title: StringType().isRequired("This field is required."),
    videoUrl: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    videoId: "",
    title: "",
    videoUrl: "",
    embedUrl: "",
    published: false,
}

//This component do 2 jobs, create new tag and update tag
const FormYoutube = ({formData, handleClose, action, ...rests}: any) => {
    const {language} = useContext(AppContext);
    const {allDataYoutube, setAllDataYoutube} = useContext(YoutubeContext);
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
            const newYoutube = {
                ...formValue,
            };

            console.log(newYoutube)
            switch (action) {
                case "CREATE":
                    const resCreate = await youtubeAPI.createYoutubeURL(newYoutube);
                    if (!resCreate.success) {
                        return toast.error(resCreate.message, toastConfig.error as any);
                    }
                    setAllDataYoutube([...allDataYoutube, resCreate.data]);
                    break;
                case "UPDATE":
                    const resUpdate = await youtubeAPI.updateYoutubeURL(newYoutube);
                    if (!resUpdate.success) {
                        return toast.error(resUpdate.message, toastConfig.error as any);
                    }

                    const updatedTags: any[] = allDataYoutube.map((tag: any) => {
                        if (tag.id === formValue.id) {
                            return resUpdate.data;
                        }
                        return tag;
                    });
                    setAllDataYoutube(updatedTags);
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
                        <Form.Group controlId="title">
                            <Form.ControlLabel>Title</Form.ControlLabel>
                            <Form.Control name="title"/>
                        </Form.Group>
                    <Form.Group controlId="videoUrl">
                        <Form.ControlLabel>Video Url</Form.ControlLabel>
                        <Form.Control name="videoUrl"/>
                    </Form.Group>
                    <Form.Group controlId="published">
                        <Form.ControlLabel>Published</Form.ControlLabel>
                        <Form.Control name="published" accepter={SelectPickerCustom}
                                       />
                    </Form.Group>
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
)
    ;
};

export default FormYoutube;
