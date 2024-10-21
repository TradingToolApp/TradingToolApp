"use client";

import React, {useRef, useState} from "react";
import {
    Form,
    Schema,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row, SelectPicker,
} from "rsuite";
import {useAddYoutubeVideo, useUpdateYoutubeVideo} from "@/hooks/data/useYoutubeVideos";

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
    const addYoutubeVideo = useAddYoutubeVideo();
    const updateYoutubeVideo = useUpdateYoutubeVideo();
    const [loading, setLoading] = useState(false);
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

            switch (action) {
                case "CREATE":
                    setLoading(true);
                    const resCreate = await addYoutubeVideo.mutateAsync(newYoutube);
                    if (resCreate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                case "UPDATE":
                    setLoading(true);
                    const resUpdate = await updateYoutubeVideo.mutateAsync(newYoutube);
                    if (resUpdate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                default:
                    break;
            }
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
            <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                Submit
            </Button>
            <Button appearance="default" onClick={handleClose} disabled={loading}>
                Cancel
            </Button>
        </ButtonToolbar>
        </Form>
</>
)
    ;
};

export default FormYoutube;
