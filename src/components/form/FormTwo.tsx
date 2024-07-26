"use client";

import React, { useRef, useContext, useState } from "react";
import { Form, Schema, CheckPicker, SelectPicker, Input, Uploader, ButtonToolbar, Button, Grid, Row, Col, Divider } from "rsuite";
import slugify from "slugify";
import ModalImage from "./members/ModalImage";
import { PostContext } from "@/contextProvider/postContext";
import standardPostTemplate from "./standardPostTemplate";
import { imageGetDir } from "@/lib/constant";
import Image from "next/image";
import postAPI from "@/services/posts-api";

const Textarea = React.forwardRef<HTMLInputElement, any>((props, ref) => <Input {...props} as="textarea" ref={ref} />);
Textarea.displayName = "Textarea";

const { StringType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired("This field is required."),
  postFormat: StringType().isRequired("This field is required."),
  featureImg: StringType().isRequired("This field is required."),
  cate: StringType().isRequired("This field is required."),
  content: StringType().isRequired("This field is required."),
});

const initialFormValue = {
  id: Date.now().toString(),
  slug: "",
  title: "",
  excerpt: "",
  postFormat: "standard",
  featureImg: `${imageGetDir}/default.jpg`,
  date: new Date().toString().split(" ").splice(1, 3).join(" "),
  cate: "News",
  cate_img: "/images/category/category-1.jpg",
  cate_bg: "",
  tags: [],
  content: "",
  quoteText: "",
  videoLink: "",
  audioLink: "",
  gallery: [],
  author_name: "Admin",
  author_desg: "Publisher",
  author_img: "/images/author/amachea_jajah.png",
  author_bio: "Admin bio",
  author_social: [
    { icon: "fab fa-facebook-f", url: "https://facebook.com/" },
    { icon: "fab fa-linkedin-in", url: "https://linkedin.com" },
  ],
  story: false,
  trending: false,
  published: false,
  postView: 0,
  postShare: 0
};

const postFormatList = [
  { value: "standard", label: "Standard" },
  { value: "text", label: "Text" },
  // { value: "gallery", label: "Gallery" },
  { value: "video", label: "Video" },
  { value: "audio", label: "Audio" },
  { value: "quote", label: "Quote" },
];

const tagList = [
  { value: "Standard", label: "Standard" },
  { value: "Adventure", label: "Adventure" },
  { value: "Travel", label: "Travel" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Technology", label: "Technology" },
  { value: "Fashion", label: "Fashion" },
  { value: "Life Style", label: "Life Style" },
];

const cateList = [
  { value: "News", label: "News" },
  { value: "Tools", label: "Tools" },
  { value: "Study", label: "Study" },
  { value: "Discussion", label: "Discussion" },
];
//This component do 2 jobs, create new post and edit post
const FormTwo = ({ formData, handleClose, action, ...rests }: any) => {
  const { posts, setPosts, language } = useContext(PostContext);
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = useState<any>(formData || initialFormValue);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [typeSelectImg, setTypeSelectImg] = useState("featureImg");
  const [featureImg, setFeatureImg] = useState<any>([]);
  const [urlImg, setURLImg] = useState("");

  const formRef: any = useRef(initialFormValue);
  const hasFormValue = Boolean(formValue);

  const handleOpenModalImage = () => setOpenModalImage(true);
  const handleCloseModalImage = () => setOpenModalImage(false);

  const handleSetFeatureImg = () => {
    setTypeSelectImg("featureImg");
    handleOpenModalImage();
  }

  const handleSetContentImg = () => {
    setTypeSelectImg("contentImg");
    handleOpenModalImage();
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // if (!formRef.current.check()) {
    //   console.error("Form error");
    //   return;
    // }

    const mdxContent = standardPostTemplate(formValue);
    //on create => generate new slug(fileName), else use the old one
    let newPost = { ...formValue, content: formValue.content, slug: formValue.slug !== "" ? formValue.slug : slugify(formValue.title) };
    if (featureImg.length !== 0) {
      newPost = { ...newPost, featureImg: featureImg };
    }

    switch (action) {
      case "CREATE":
        await postAPI.createPost(newPost.slug, mdxContent, newPost, language);
        setPosts([...posts, newPost]);
        break;
      case "UPDATE":
        await postAPI.updatePost(newPost.slug, mdxContent, newPost, language);
        const updatedPosts: any[] = posts.filter((post: any) => post.slug !== formValue.slug);
        const index = posts.findIndex((post: any) => post.slug === formValue.slug);
        updatedPosts.splice(index, 0, newPost);
        setPosts(updatedPosts);
        break;
      default:
        break;
    }

    setFormValue(initialFormValue);
    handleClose();

  };

  const renderPostFormat = () => {
    if (hasFormValue)
      switch (formValue.postFormat) {
        case "quote":
          return (
            <Form.Group controlId="quoteText">
              <Form.ControlLabel>Quote Text</Form.ControlLabel>
              <Form.Control name="quoteText" />
            </Form.Group>
          );
        case "video":
          return (
            <Form.Group controlId="videoLink">
              <Form.ControlLabel>Video Link</Form.ControlLabel>
              <Form.Control name="videoLink" />
            </Form.Group>
          );
        case "audio":
          return (
            <Form.Group controlId="audioLink">
              <Form.ControlLabel>Audio Link</Form.ControlLabel>
              <Form.Control name="audioLink" />
            </Form.Group>
          );
        // case "gallery":
        //   return (
        //     <Form.Group controlId="gallery">
        //       <Form.ControlLabel>Gallery Images</Form.ControlLabel>
        //       <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
        //         <div
        //           style={{
        //             height: 100,
        //             display: "flex",
        //             alignItems: "center",
        //             justifyContent: "center",
        //           }}
        //         >
        //           <span>Click or Drag files to this area to upload</span>
        //         </div>
        //       </Uploader>
        //     </Form.Group>
        //   );
        default:
          return null;
      }
  };

  return (
    <>
      <Form style={{ all: "unset" }} fluid ref={formRef} model={model} onCheck={setFormError} onChange={setFormValue} formValue={formValue} {...rests}>
        <Grid fluid>

          <Row style={{ display: "flex", flexDirection: "row", height: "100%" }}>
            <Col
              style={{
                width: "40%",
                margin: "0 20px",
              }}
            >
              <Row>
                <Form.Group controlId="title">
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.Control
                    name="title"
                    readOnly={action === "UPDATE" ? true : false}
                    style={{ backgroundColor: action === "UPDATE" ? "#f5f5f5" : "white" }}
                  />
                </Form.Group>

                <Form.Group controlId="postFormat">
                  <Form.ControlLabel>Post Type</Form.ControlLabel>
                  <Form.Control name="postFormat" accepter={SelectPicker} data={postFormatList} />
                </Form.Group>

                <Form.Group controlId="cate">
                  <Form.ControlLabel>Category</Form.ControlLabel>
                  <Form.Control name="cate" accepter={SelectPicker} data={cateList} />
                </Form.Group>

                <Form.Group controlId="tags">
                  <Form.ControlLabel>Tags</Form.ControlLabel>
                  <Form.Control name="tags" accepter={CheckPicker} data={tagList} />
                </Form.Group>

                <br />
                <Form.Group controlId="featureImg">
                  <Form.ControlLabel>Feature Image</Form.ControlLabel>
                  <Button onClick={handleSetFeatureImg}>Select</Button>
                </Form.Group>
                {featureImg.length !== 0 && <Image src={featureImg} alt="feature image" width={100} height={100} />}
                <Divider />
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
              </Row>
                <ButtonToolbar style={{ marginTop: "20px", marginLeft: "-5px" }}>
                  <Button appearance="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                  <Button appearance="default" onClick={handleClose}>
                    Cancel
                  </Button>
                </ButtonToolbar>
            </Col>

            <Col style={{ flexGrow: "1" }}>
              <Form.Group controlId="content">
                <Form.ControlLabel>Content</Form.ControlLabel>
                <Form.Control name="content" accepter={Textarea} rows={28} />
              </Form.Group>
            </Col>
          </Row>
        </Grid>
      </Form>
      <ModalImage open={openModalImage} handleClose={handleCloseModalImage} typeSelectImg={typeSelectImg} setURLImg={setURLImg} setFeatureImg={setFeatureImg} />
    </>
  );
};

export default FormTwo;
