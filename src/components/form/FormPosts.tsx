"use client";

import React, {useRef, useState} from "react";
import {
    Form,
    Schema,
    CheckPicker,
    FlexboxGrid,
    Tabs,
    ButtonToolbar,
    Button,
    Grid,
    Row,
    Col,
    Divider,
    VStack,
} from "rsuite";
import Image from "next/image";
import ModalSelectImage from "@/components/modal/images/ModalSelectImage";
import {initialFormValue, postFormatList} from "@/lib/constant";
import {Textarea, SelectPickerCustom, InputWithCopyButton} from "./customElement";
import {useAddPost, useUpdatePost} from "@/hooks/data/usePosts";
import {useGetCategories} from "@/hooks/data/useCategories";
import {useGetAuthors} from "@/hooks/data/useAuthors";
import {useGetTags} from "@/hooks/data/useTags";

const PostStatusList = [
    {label: "Public", value: "public"},
    {label: "Private", value: "private"},
];

const TrendingList = [
    {label: "Yes", value: true},
    {label: "No", value: false},
]

const {StringType} = Schema.Types;

const model = Schema.Model({
    postFormat: StringType().isRequired("This field is required."),
    // featureImg: StringType().isRequired("This field is required."),
    cate_slug: StringType().isRequired("This field is required."),
    titleEN: StringType().isRequired("This field is required."),
    excerptEN: StringType().isRequired("This field is required."),
    contentEN: StringType().isRequired("This field is required."),
    titleVI: StringType().isRequired("This field is required."),
    excerptVI: StringType().isRequired("This field is required."),
    contentVI: StringType().isRequired("This field is required."),
});

//This component do 2 jobs, create new post and edit post
const FormPosts = ({formData, handleClose, action, ...rests}: any) => {
    const {categories} = useGetCategories();
    const {authors} = useGetAuthors();
    const {tags} = useGetTags();
    const addPost = useAddPost();
    const updatePost = useUpdatePost();
    const [loading, setLoading] = useState(false);
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
    const [, setFormError] = React.useState({});
    const [selectMultipleImg, setSelectMultipleImg] = useState(false);
    const [featureImg, setFeatureImg] = useState([]);
    const [urlImg, setURLImg] = useState("");
    const [openModalImage, setOpenModalImage] = useState(false);
    const formRef: any = useRef(initialFormValue);
    const hasFormValue = Boolean(formValue);

    const handleOpenModalImage = () => setOpenModalImage(true);
    const handleCloseModalImage = () => setOpenModalImage(false);

    const handleSetFeatureImg = () => {
        setSelectMultipleImg(false);
        handleOpenModalImage();
    }
    const handleSetContentImg = () => {
        setSelectMultipleImg(true);
        handleOpenModalImage();
    }

    const handleCopyURL = () => {
        const url = process.env.NEXT_PUBLIC_BASEPATH + "/posts/" + formValue.slug;
        navigator.clipboard.writeText(url);
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!formRef.current.check()) {
            console.error("Form error");
            return;
        }

        try {
            //on create => generate new slug(fileName), else use the old one
            const newPost = {
                ...formValue,
                videoLink: formValue.videoLink !== "" && "https://www.youtube.com/embed/" + formValue.videoLink.split("?v=")[1],
            };
            switch (action) {
                case "CREATE":
                    setLoading(true);
                    const resCreate = await addPost.mutateAsync(newPost);
                    if (resCreate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                case "UPDATE":
                    setLoading(true);
                    const resUpdate = await updatePost.mutateAsync(newPost);
                    if (resUpdate.success) {
                        setFormValue(initialFormValue);
                        handleClose();
                    }
                    setLoading(false);
                    break;
                default:
                    break;
            }
        } catch (error: any) {
            console.error(error);
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
                                <Row gutter={150} style={{marginBottom: "15px"}}>
                                    <Col xs={2} md={4}
                                         style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="postFormat">
                                            <Form.ControlLabel>Post Type</Form.ControlLabel>
                                            <Form.Control name="postFormat" accepter={SelectPickerCustom} data={postFormatList}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="cate_slug">
                                            <Form.ControlLabel>Category</Form.ControlLabel>
                                            <Form.Control name="cate_slug" accepter={SelectPickerCustom} data={categories}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="author_slug">
                                            <Form.ControlLabel>Author</Form.ControlLabel>
                                            <Form.Control name="author_slug" accepter={SelectPickerCustom} data={authors}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row gutter={150} style={{marginBottom: "15px"}}>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="tags">
                                            <Form.ControlLabel>Tags</Form.ControlLabel>
                                            <Form.Control name="tags" accepter={CheckPicker} data={tags}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row gutter={150} style={{marginBottom: "15px"}}>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="status">
                                            <Form.ControlLabel>Status</Form.ControlLabel>
                                            <Form.Control name="status" accepter={SelectPickerCustom} data={PostStatusList}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="trending">
                                            <Form.ControlLabel>Trending</Form.ControlLabel>
                                            <Form.Control name="trending" accepter={SelectPickerCustom} data={TrendingList}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{marginBottom: "15px"}}>
                                    <Col xs={2} md={4}>
                                        <Form.Group controlId="featureImg">
                                            <Form.ControlLabel>Feature Image</Form.ControlLabel>
                                            <Button onClick={handleSetFeatureImg}>Select</Button>
                                        </Form.Group>
                                    </Col>
                                    {action === "UPDATE" &&
                                        <Col xs={2} md={8}>
                                            <Form.Group controlId="url">
                                                <Form.ControlLabel>URL Post</Form.ControlLabel>
                                                <Form.Control name="url" accepter={InputWithCopyButton} size="md"
                                                              onClick={handleCopyURL}
                                                              placeholder={process.env.NEXT_PUBLIC_BASEPATH + "/posts/" + formValue.slug}/>
                                            </Form.Group>
                                        </Col>
                                    }
                                </Row>
                            </Grid>
                            {action === "UPDATE" && featureImg.length === 0 &&
                                <Image src={formValue.featureImg} alt="Feature image" width={100} height={100}/>}
                            {featureImg.length !== 0 &&
                                <Image src={featureImg[0]} alt="feature image" width={100} height={100}/>}
                            <Divider/>
                            <Form.Group controlId="contentImg">
                                <Form.ControlLabel>Content Image</Form.ControlLabel>
                                <Button onClick={handleSetContentImg}>Select</Button>
                            </Form.Group>
                            {urlImg && (
                                <div className="lh-1">
                                    <span className="badge bg-primary text-wrap">Insert these links to anyplace in the content</span>
                                    <p className="whitespace-pre fs-4">{urlImg}</p>
                                </div>
                            )}
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={12}>
                            <div className="rsuite-custom-tab">
                                <Tabs defaultActiveKey={"1"}>
                                    <Tabs.Tab eventKey="1" title="English">
                                        {/*<Col xs={12}>*/}
                                        <Form.Group controlId="titleEN">
                                            <Form.ControlLabel>Title</Form.ControlLabel>
                                            <Form.Control name="titleEN"/>
                                        </Form.Group>
                                        <Form.Group controlId="excerptEN">
                                            <Form.ControlLabel>Excerpt</Form.ControlLabel>
                                            <Form.Control name="excerptEN" accepter={Textarea} rows={2}/>
                                        </Form.Group>
                                        {formValue.postFormat === "quote" && <Form.Group controlId="quoteTextEN">
                                            <Form.ControlLabel>Quote</Form.ControlLabel>
                                            <Form.Control name="quoteTextEN"/>
                                        </Form.Group>}
                                        {/*</Col>*/}
                                        {/*<Col xs={12}>*/}
                                        <Form.Group controlId="contentEN">
                                            <Form.ControlLabel>Content</Form.ControlLabel>
                                            <Form.Control name="contentEN" accepter={Textarea} rows={15}/>
                                        </Form.Group>
                                        {/*</Col>*/}
                                    </Tabs.Tab>
                                    <Tabs.Tab eventKey="2" title="Vietnamese">
                                        {/*<Col xs={12}>*/}
                                        <Form.Group controlId="titleVI">
                                            <Form.ControlLabel>Title</Form.ControlLabel>
                                            <Form.Control name="titleVI"/>
                                        </Form.Group>
                                        <Form.Group controlId="excerptVI">
                                            <Form.ControlLabel>Excerpt</Form.ControlLabel>
                                            <Form.Control name="excerptVI" accepter={Textarea} rows={2}/>
                                        </Form.Group>
                                        {formValue.postFormat === "quote" && <Form.Group controlId="quoteTextVI">
                                            <Form.ControlLabel>Quote</Form.ControlLabel>
                                            <Form.Control name="quoteTextVI"/>
                                        </Form.Group>}
                                        {/*</Col>*/}
                                        {/*<Col xs={12}>*/}
                                        <Form.Group controlId="contentVI">
                                            <Form.ControlLabel>Content</Form.ControlLabel>
                                            <Form.Control name="contentVI" accepter={Textarea} rows={15}/>
                                        </Form.Group>
                                        {/*</Col>*/}
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
            </Form>
            <ModalSelectImage open={openModalImage} handleClose={handleCloseModalImage} multiple={selectMultipleImg}
                              setReturnedImg={selectMultipleImg ? setURLImg : setFeatureImg}/>
        </>
    )
        ;
};

export default FormPosts;
