"use client";

import React, {useRef, useContext, useState} from "react";
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
    Divider,
} from "rsuite";
import Image from "next/image";
import {toast} from 'react-toastify';
import ModalSelectImage from "@/components/modal/images/ModalSelectImage";
import {AppContext} from "@/providers/app.provider";
import {AuthorContext} from "@/providers/author.provider";
import {CategoryContext} from "@/providers/category.provider";
import {TagContext} from "@/providers/tag.provider";
import {initialFormValue, toastConfig, postFormatList} from "@/lib/constant";
import postAPI from "@/services/posts-api";
import {Textarea, SelectPickerCustom, InputWithCopyButton} from "./customElement";

const PostStatusList = [
    {label: "Public", value: "public"},
    {label: "Private", value: "private"},
];

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
    const {language, allDataPosts, setAllDataPosts} = useContext(AppContext);
    const {authors} = useContext(AuthorContext);
    const {categories} = useContext(CategoryContext);
    const {tags} = useContext(TagContext);
    const [, setFormError] = React.useState({});
    const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
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
                // slug: action === "CREATE" ? slugify(formValue.titleEN, {lower: true}) : formValue.slug,
                // postFormatLabel: postFormatList.filter((format: any) => format.value === formValue.postFormat)[0].label,
                // title: language === "en" ? formValue.titleEN : formValue.titleVI,
                // content: language === "en" ? formValue.contentEN : formValue.contentVI,
                // cate: categories.filter((cate: any) => cate.cate_slug === formValue.cate_slug)[0].label,
                // cate_bg: categories.filter((cate: any) => cate.cate_slug === formValue.cate_slug)[0].cate_bg,
                // cate_img: categories.filter((cate: any) => cate.cate_slug === formValue.cate_slug)[0].cate_img,
                // author_name: authors.filter((author: any) => author.author_slug === formValue.author_slug)[0].author_name,
                // author_img: authors.filter((author: any) => author.author_slug === formValue.author_slug)[0].author_img,
                // author_social: authors.filter((author: any) => author.author_slug === formValue.author_slug)[0].author_social,
                // featureImg: featureImg.length !== 0 ? featureImg[0] : formValue.featureImg,
                // updatedAt: action === "CREATE" ? formValue.date : formValue.updatedAt,
            };
            console.log(newPost)

            switch (action) {
                case "CREATE":
                    const resCreate = await postAPI.createPost(newPost);
                    if (!resCreate.success) {
                        return toast.error(resCreate.message, toastConfig.error as any);
                    }
                    setAllDataPosts([...allDataPosts, resCreate.data]);
                    break;
                case "UPDATE":
                    const resUpdate = await postAPI.updatePost(newPost);
                    if (!resUpdate.success) {
                        return toast.error(resUpdate.message, toastConfig.error as any);
                    }

                    const updatedPosts: any[] = allDataPosts.map((post: any) => {
                        if (post.id === formValue.id) {
                            return resUpdate.data;
                        }
                        return post;
                    });
                    setAllDataPosts(updatedPosts);
                    break;
                default:
                    break;
            }
            setFormValue(initialFormValue);
            handleClose();
        } catch (error: any) {
            console.error(error);
        }
    };

    const renderPostFormat = () => {
        if (hasFormValue)
            switch (formValue.postFormat) {
                case "video":
                    return (
                        <Form.Group controlId="videoLink">
                            <Form.ControlLabel>Video Link</Form.ControlLabel>
                            <Form.Control name="videoLink"/>
                        </Form.Group>
                    );
                case "audio":
                    return (
                        <Form.Group controlId="audioLink">
                            <Form.ControlLabel>Audio Link</Form.ControlLabel>
                            <Form.Control name="audioLink"/>
                        </Form.Group>
                    );
                default:
                    return null;
            }
    };

    return (
        <>
            <Form style={{all: "unset"}} fluid ref={formRef} model={model} onCheck={setFormError}
                  onChange={setFormValue} formValue={formValue} {...rests}>
                <Row>
                    <PanelGroup accordion bordered>
                        <Panel header="General" defaultExpanded>
                            <Grid fluid>
                                <Row style={{marginBottom: "20px"}}>
                                    <Col xs={2} md={4}
                                         style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="postFormat">
                                            <Form.ControlLabel>Post Type</Form.ControlLabel>
                                            <Form.Control name="postFormat" accepter={SelectPicker} data={postFormatList}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="cate_slug">
                                            <Form.ControlLabel>Category</Form.ControlLabel>
                                            <Form.Control name="cate_slug" accepter={SelectPicker} data={categories}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="author_slug">
                                            <Form.ControlLabel>Author</Form.ControlLabel>
                                            <Form.Control name="author_slug" accepter={SelectPicker} data={authors}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="tags">
                                            <Form.ControlLabel>Tags</Form.ControlLabel>
                                            <Form.Control name="tags" accepter={CheckPicker} data={tags}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={2} md={4}>
                                        <Form.Group controlId="featureImg">
                                            <Form.ControlLabel>Feature Image</Form.ControlLabel>
                                            <Button onClick={handleSetFeatureImg}>Select</Button>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={2} md={4} style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                        <Form.Group controlId="status">
                                            <Form.ControlLabel>Status</Form.ControlLabel>
                                            <Form.Control name="status" accepter={SelectPickerCustom} data={PostStatusList}
                                                          defaultValue={"public"}/>
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
                            {formValue && renderPostFormat()}
                            {urlImg && (
                                <div className="lh-1">
                                    <span className="badge bg-primary text-wrap">Insert these links to anyplace in the content</span>
                                    <p className="whitespace-pre fs-4">{urlImg}</p>
                                </div>
                            )}
                        </Panel>
                        <Panel header="English Content">
                            <Col xs={12}>
                                <Form.Group controlId="titleEN">
                                    <Form.ControlLabel>Title</Form.ControlLabel>
                                    <Form.Control name="titleEN"/>
                                </Form.Group>
                                <Form.Group controlId="excerptEN">
                                    <Form.ControlLabel>Excerpt</Form.ControlLabel>
                                    <Form.Control name="excerptEN" accepter={Textarea} rows={3}/>
                                </Form.Group>
                                {formValue.postFormat === "quote" && <Form.Group controlId="quoteTextEN">
                                    <Form.ControlLabel>Quote</Form.ControlLabel>
                                    <Form.Control name="quoteTextEN"/>
                                </Form.Group>}
                            </Col>
                            <Col xs={12}>
                                <Form.Group controlId="contentEN">
                                    <Form.ControlLabel>Content</Form.ControlLabel>
                                    <Form.Control name="contentEN" accepter={Textarea} rows={10}/>
                                </Form.Group>
                            </Col>
                        </Panel>
                        <Panel header="Vietnamese Content">
                            <Col xs={12}>
                                <Form.Group controlId="titleVI">
                                    <Form.ControlLabel>Title</Form.ControlLabel>
                                    <Form.Control name="titleVI"/>
                                </Form.Group>
                                <Form.Group controlId="excerptVI">
                                    <Form.ControlLabel>Excerpt</Form.ControlLabel>
                                    <Form.Control name="excerptVI" accepter={Textarea} rows={3}/>
                                </Form.Group>
                                {formValue.postFormat === "quote" && <Form.Group controlId="quoteTextVI">
                                    <Form.ControlLabel>Quote</Form.ControlLabel>
                                    <Form.Control name="quoteTextVI"/>
                                </Form.Group>}
                            </Col>
                            <Col xs={12}>
                                <Form.Group controlId="contentVI">
                                    <Form.ControlLabel>Content</Form.ControlLabel>
                                    <Form.Control name="contentVI" accepter={Textarea} rows={10}/>
                                </Form.Group>
                            </Col>
                        </Panel>
                    </PanelGroup>
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
            <ModalSelectImage open={openModalImage} handleClose={handleCloseModalImage} multiple={selectMultipleImg}
                              setReturnedImg={selectMultipleImg ? setURLImg : setFeatureImg}/>
        </>
    )
        ;
};

export default FormPosts;
