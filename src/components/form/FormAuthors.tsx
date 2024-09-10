"use client";

import React, { useRef, useContext, useState } from "react";
import {
    Form,
    Schema,
    SelectPicker,
    Input,
    Panel,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col,
} from "rsuite";
import Image from "next/image";
import { toast } from 'react-toastify';
import slugify from "slugify";
import ModalSelectImage from "@/components/modal/images/ModalSelectImage";
import { AuthorContext } from "@/providers/author.provider";
import { toastConfig } from "@/lib/constant";
import authorAPI from "@/services/author-api";
import { Textarea } from "./customElement";

const {StringType} = Schema.Types;

const model = Schema.Model({
    author_name: StringType().isRequired("This field is required."),
    author_img: StringType().isRequired("This field is required."),
    author_desgEN: StringType().isRequired("This field is required."),
    author_bioEN: StringType().isRequired("This field is required."),
    author_desgVI: StringType().isRequired("This field is required."),
    author_bioVI: StringType().isRequired("This field is required."),
});

const initialFormValue = {
    id: "",
    value: "",
    label: "",
    author_name: "",
    author_img: "/images/author/default.png",
    author_social: "",
    author_desgEN: "",
    author_bioEN: "",
    author_desgVI: "",
    author_bioVI: "",
}

//This component do 2 jobs, create new author and update author
const FormAuthors = ({formData, handleClose, action, ...rests}: any) => {
    const { allDataAuthors, setAllDataAuthors } = useContext(AuthorContext);
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const [openModalImage, setOpenModalImage] = useState(false);
    const [img, setImg] = useState([]);

    const formRef: any = useRef(initialFormValue);

    const handleOpenModalImage = () => setOpenModalImage(true);
    const handleCloseModalImage = () => setOpenModalImage(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error(formRef.current);
            return;
        }

        try {
            //on create => generate new slug(fileName), else use the old one
            const newAuthor = {
                ...formValue,
                author_slug: action === "CREATE" ? slugify(formValue.author_name, {lower: true}) : formValue.author_slug,
                label: formValue.author_name,
                author_img: img.length !== 0 ? img[0] : formValue.author_img,
            };

            switch (action) {
                case "CREATE":
                    const resCreate = await authorAPI.createAuthor(newAuthor);
                    if (!resCreate.success) {
                        return toast.error(resCreate.message, toastConfig.error as any);
                    }
                    setAllDataAuthors([...allDataAuthors, resCreate.data]);
                    break;
                case "UPDATE":
                    const resUpdate = await authorAPI.updateAuthor(newAuthor);
                    if (!resUpdate.success) {
                        return toast.error(resUpdate.message, toastConfig.error as any);
                    }

                    const updatedAuthors: any[] = allDataAuthors.map((author: any) => {
                        if (author.id === formValue.id) {
                            return resUpdate.data;
                        }
                        return author;
                    });
                    setAllDataAuthors(updatedAuthors);
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
                            <Form.Group controlId="author_name">
                                <Form.ControlLabel>Author Name</Form.ControlLabel>
                                <Form.Control name="author_name"/>
                            </Form.Group>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="author_desgEN">
                                        <Form.ControlLabel>Design EN</Form.ControlLabel>
                                        <Form.Control name="author_desgEN"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={18}>
                                    <Form.Group controlId="author_bioEN">
                                        <Form.ControlLabel>Bio EN</Form.ControlLabel>
                                        <Form.Control name="author_bioEN" accepter={Textarea} rows={3}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel>
                        <Grid fluid>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="author_desgVI">
                                        <Form.ControlLabel>Design VI</Form.ControlLabel>
                                        <Form.Control name="author_desgVI"/>
                                    </Form.Group>
                                </Col>
                                <Col xs={18}>
                                    <Form.Group controlId="author_bioVI">
                                        <Form.ControlLabel>Bio VI</Form.ControlLabel>
                                        <Form.Control name="author_bioVI" accepter={Textarea} rows={3}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Grid>
                    </Panel>
                    <Panel>
                        <Form.Group controlId="author_img">
                            <Form.ControlLabel>Image</Form.ControlLabel>
                            <Button onClick={handleOpenModalImage}>Select</Button>
                        </Form.Group>
                        {action === "UPDATE" && img.length === 0 && <Image src={formValue.author_img} alt="Author image" width={100} height={100}/>}
                        {img.length !== 0 &&
                            <Image src={img[0]} alt="Author image" width={100} height={100}/>}
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
                <ModalSelectImage open={openModalImage} handleClose={handleCloseModalImage} setReturnedImg={setImg}/>
            </Form>
        </>
    );
};

export default FormAuthors;
