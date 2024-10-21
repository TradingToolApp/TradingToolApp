"use client";

import React, {useRef, useContext, useState} from "react";
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
    Col, VStack, FlexboxGrid, Tabs,
} from "rsuite";
import Image from "next/image";
import {toast} from 'react-toastify';
import slugify from "slugify";
import ModalSelectImage from "@/components/modal/images/ModalSelectImage";
import {toastConfig} from "@/lib/constant";
import authorAPI from "@/services/restful/author-api";
import {Textarea} from "./customElement";
import {useAddAuthor, useGetAuthors, useUpdateAuthor} from "@/hooks/data/useAuthors";

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
    const addAuthor = useAddAuthor();
    const updateAuthor = useUpdateAuthor();
    const [loading, setLoading] = useState(false);
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
            const newAuthor = {
                ...formValue,
                // author_slug: action === "CREATE" ? slugify(formValue.author_name, {lower: true}) : formValue.author_slug,
                // label: formValue.author_name,
                author_img: img.length !== 0 ? img[0] : formValue.author_img,
            };

            switch (action) {
                case "CREATE":
                    setLoading(true);
                    const resCreate = await addAuthor.mutateAsync(newAuthor);
                    if (resCreate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                case "UPDATE":
                    setLoading(true);
                    const resUpdate = await updateAuthor.mutateAsync(newAuthor);
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
                <VStack>
                    <FlexboxGrid style={{width: "100%"}}>
                        <FlexboxGrid.Item colspan={12}>
                            <Grid fluid>
                                    <Form.Group controlId="author_name" style={{width: "200px"}}>
                                        <Form.ControlLabel>Author Name</Form.ControlLabel>
                                        <Form.Control name="author_name"/>
                                    </Form.Group>
                                    <Form.Group controlId="author_img">
                                        <Form.ControlLabel>Image</Form.ControlLabel>
                                        <Button onClick={handleOpenModalImage}>Select</Button>
                                    </Form.Group>
                                    {action === "UPDATE" && img.length === 0 &&
                                        <Image src={formValue.author_img} alt="Author image" width={100} height={100}/>}
                                    {img.length !== 0 &&
                                        <Image src={img[0]} alt="Author image" width={100} height={100}/>}
                            </Grid>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={12}>
                            <div className="rsuite-custom-tab">
                                <Tabs defaultActiveKey={"1"}>
                                    <Tabs.Tab eventKey="1" title="English">
                                        <Form.Group controlId="author_desgEN">
                                            <Form.ControlLabel>Design EN</Form.ControlLabel>
                                            <Form.Control name="author_desgEN"/>
                                        </Form.Group>
                                        <Form.Group controlId="author_bioEN">
                                            <Form.ControlLabel>Bio EN</Form.ControlLabel>
                                            <Form.Control name="author_bioEN" accepter={Textarea} rows={2}/>
                                        </Form.Group>
                                    </Tabs.Tab>
                                    <Tabs.Tab eventKey="2" title="Vietnamese">
                                        <Form.Group controlId="author_desgVI">
                                            <Form.ControlLabel>Design VI</Form.ControlLabel>
                                            <Form.Control name="author_desgVI"/>
                                        </Form.Group>
                                        <Form.Group controlId="author_bioVI">
                                            <Form.ControlLabel>Bio VI</Form.ControlLabel>
                                            <Form.Control name="author_bioVI" accepter={Textarea} rows={2}/>
                                        </Form.Group>
                                    </Tabs.Tab>
                                </Tabs>
                            </div>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                    <ButtonToolbar style={{marginTop: "20px", marginRight: "20px", marginLeft: "auto"}}>
                        <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
                            Submit
                        </Button>
                        <Button appearance="default" onClick={handleClose} disabled={loading}>
                            Cancel
                        </Button>
                    </ButtonToolbar>
                </VStack>
                <ModalSelectImage open={openModalImage} handleClose={handleCloseModalImage} setReturnedImg={setImg}/>
            </Form>
        </>
    );
};

export default FormAuthors;
