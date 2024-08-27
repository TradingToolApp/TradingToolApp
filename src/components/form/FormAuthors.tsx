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
import authorAPI from "@/services/author-api";
import { AuthorContext } from "@/providers/authorProvider";

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => <Input {...props} as="textarea" ref={ref}/>);
Textarea.displayName = "Textarea";

const SelectPickerCustom = React.forwardRef<HTMLInputElement, any>((props, ref) => <SelectPicker searchable={false} menuMaxHeight={200}
                                                                                                 style={{width: "100px"}} {...props} ref={ref}/>);
SelectPickerCustom.displayName = "SelectPickerCustom";

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
    const toaster = useToaster();
    const {language} = useContext(AppContext);
    const {authors, setAuthors} = useContext(AuthorContext);
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

            console.log(newAuthor)

            switch (action) {
                case "CREATE":
                    const resCreate = await authorAPI.createAuthor(newAuthor);
                    if (resCreate.success === false) {
                        return toaster.push(<Message type={"error"}>{resCreate.message}</Message>);
                    }
                    setAuthors([...authors, newAuthor]);
                    break;
                case "UPDATE":
                    const resUpdate = await authorAPI.updateAuthor(newAuthor);
                    if (resUpdate.success === false) {
                        return toaster.push(<Message type={"error"}>{resUpdate.message}</Message>);
                    }
                    const updatedAuthors: any[] = authors.filter((author: any) => author.author_slug !== formValue.author_slug);
                    const index = authors.findIndex((author: any) => author.author_slug === formValue.author_slug);
                    updatedAuthors.splice(index, 0, newAuthor);
                    setAuthors(updatedAuthors);
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
                <ModalImage open={openModalImage} handleClose={handleCloseModalImage} setReturnedImg={setImg}/>
            </Form>
        </>
    );
};

export default FormAuthors;
