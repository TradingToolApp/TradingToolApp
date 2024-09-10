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
    Col,
    SelectPicker,
    Input,
} from "rsuite";
import {YoutubeContext} from "@/providers/widgets/youtube.provider";
import youtubeAPI from "@/services/widgets/youtube-api";
import { toast } from "react-toastify";
import { toastConfig } from "@/lib/constant";
import { AppContext } from "@/providers/app.provider";
import { AuthorContext } from "@/providers/author.provider";
import { CommentContext } from "@/providers/comment.provider";
import { getValueByLanguage } from "@/lib/formatData";
import commentAPI from "@/services/comment-api";

const Textarea = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) => <Input {...props} as="textarea" ref={ref}/>);
Textarea.displayName = "Textarea";

const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props: any, ref: any) =>
    <SelectPicker searchable={false} menuMaxHeight={200}
                  style={{width: "100px"}}
                  data={[{value: true, label: "True"}, {
                      value: false,
                      label: "False"
                  }]}
                  defaultValue={"false"} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";

const {StringType} = Schema.Types;

const model = Schema.Model({
    reply: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    postId: "",
    authorId: "",
    title: "",
    name: "",
    email: "",
    comment: "",
    reply: "",
    published: false,
}

//This component do 2 jobs, create new tag and update tag
const FormYoutube = ({formData, handleClose, action, ...rests}: any) => {
    const {language} = useContext(AppContext);
    const {allDataComment, setAllDataComment} = useContext(CommentContext);
    const {authors} = useContext(AuthorContext);

    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(
        {title: getValueByLanguage(formData.post.translations, language).title, ...formData}
        ||
        initialFormValue
    );

    const formRef: any = useRef(initialFormValue);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error(formRef.current);
            return;
        }

        try {
            //on create => generate new slug(fileName), else use the old one
            const newComment = {
                ...formValue,
            };
            console.log(newComment)
            const resUpdate = await commentAPI.updateComment(newComment);
            if (!resUpdate.success) {
                return toast.error(resUpdate.message, toastConfig.error as any);
            }

            const updatedComments: any[] = allDataComment.map((tag: any) => {
                if (tag.id === formValue.id) {
                    return resUpdate.data;
                }
                return tag;
            });
            setAllDataComment(updatedComments);

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
                                <Form.ControlLabel>Post</Form.ControlLabel>
                                <Form.Control name="title" readOnly/>
                            </Form.Group>
                            <Col xs={12}>
                                <Form.Group controlId="name">
                                    <Form.ControlLabel>Name</Form.ControlLabel>
                                    <Form.Control name="name" readOnly/>
                                </Form.Group>
                            </Col>
                            <Col xs={12}>
                                <Form.Group controlId="email">
                                    <Form.ControlLabel>Email</Form.ControlLabel>
                                    <Form.Control name="email" readOnly/>
                                </Form.Group>
                            </Col>
                            <Form.Group controlId="comment">
                                <Form.ControlLabel>Comment</Form.ControlLabel>
                                <Form.Control name="comment" accepter={Textarea} rows={4} readOnly/>
                            </Form.Group>
                            <Form.Group controlId="reply">
                                <Form.ControlLabel>Reply</Form.ControlLabel>
                                <Form.Control name="reply" accepter={Textarea} rows={4} required/>
                            </Form.Group>
                            <Form.Group controlId="author_slug">
                                <Form.ControlLabel>Author</Form.ControlLabel>
                                <Form.Control name="author_slug" accepter={SelectPicker} data={authors}/>
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
