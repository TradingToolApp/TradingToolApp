import multer from "multer";
import matter from 'gray-matter'
import path from "path";
import { sql } from "@vercel/postgres";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import { postUploadDir } from "@/lib/constant";
import prisma from "@/lib/prisma";
import uploadToGgDrive from "./utils/uploadDrive";

const fs = require('fs');

const postHandler = async (req, res) => {
    switch (req.method) {
        case "GET":
            return getPosts(req, res);
        case "POST":
            return createPost(req, res);
        case "PUT":
            return updatePost(req, res);
        case "DELETE":
            return deletePost(req, res);
    }
};

export function getPostSlugs() {
    return fs.readdirSync(postUploadDir)
}

export function getPostBySlug(slug, fields = []) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = path.join(postUploadDir, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }
        if (field === 'content') {
            items[field] = content
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field]
        }
    })
    return items
}

export function getAllPosts(fields = []) {
    // slugs is fileName of posts
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))

    return posts
}

// Get Markdown File Content 

export function getFileContentBySlug(fileName, postsPath) {

    const postFilePath = path.join(postsPath, `${fileName}.md`)
    const fileContents = fs.readFileSync(postFilePath, 'utf8')

    const { data, content } = matter(fileContents)

    return {
        data,
        content
    }
}

const getPosts = async (req, res) => {
    try {
        ////get from local DB(Markdown)
        // const posts = getAllPosts([
        //     'slug',
        //     'title',
        //     'excerpt',
        //     'postFormat',
        //     'featureImg',
        //     'date',
        //     'cate',
        //     'cate_img',
        //     'cate_bg',
        //     'content',
        //     'author_name',
        //     'author_img',
        //     'author_social',
        //     'author_bio',
        //     'story',
        //     'trending',
        //     'post_views',
        //     'post_share'
        // ])

        ////get from vercel DB

        let posts;
        posts = await prisma.postEnglish.findMany();
        switch (req.query.language) {
            case "EN":
                posts = await prisma.postEnglish.findMany({});
                break;
            case "VN":
                posts = await prisma.postVietnamese.findMany({});
                break;
            default:
                posts = await prisma.postEnglish.findMany({});
                break;
        }

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: posts });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const createPost = async (req, res) => {
    try {
        const { fileName, mdxContent, data, language } = req.body;
        let newPost;
        let result; 
        console.log(newPost)
        switch (language) {
            case "EN":
                //save data to database
                newPost = await prisma.postEnglish.create({
                    data: {
                        slug: data.slug,
                        title: data.title,
                        excerpt: data.excerpt,
                        postFormat: data.postFormat,
                        featureImg: data.featureImg,
                        date: data.date,
                        content: data.content,
                        quoteText: data.quoteText,
                        videoLink: data.videoLink,
                        audioLink: data.audioLink,
                        gallery: data.gallery,
                        cate: data.cate,
                        cate_img: data.cate_img,
                        cate_bg: data.cate_bg,
                        author_name: data.author_name,
                        author_desg: data.author_desg,
                        author_img: data.author_img,
                        author_bio: data.author_bio,
                        tags: data.tags,
                        post_views: data.post_views,
                        post_share: data.post_share,
                        author_social: data.author_social,
                        story: data.story,
                        trending: data.trending,
                        published: data.published,
                    }
                })
                // // Upload MDX to GG Drive
                // result = await uploadToGgDrive({
                //     fileName: fileName,
                //     folderName: 'TradingToolApp/posts/EN',
                //     fileData: Buffer.from(mdxContent),
                //     fileMimeType: "text/markdown",
                // });

                // //write markdown file to server
                // fs.writeFile(`./public/uploadPosts/EN/${fileName}.md`, mdxContent, function (err) {
                //     if (err) throw err;
                //     console.log('File is created successfully.');
                // })
                break;
            case "VN":
                newPost = await prisma.postVietnamese.create({
                    data: {
                        slug: data.slug,
                        title: data.title,
                        excerpt: data.excerpt,
                        postFormat: data.postFormat,
                        featureImg: data.featureImg,
                        date: data.date,
                        content: data.content,
                        quoteText: data.quoteText,
                        videoLink: data.videoLink,
                        audioLink: data.audioLink,
                        gallery: data.gallery,
                        cate: data.cate,
                        cate_img: data.cate_img,
                        cate_bg: data.cate_bg,
                        author_name: data.author_name,
                        author_desg: data.author_desg,
                        author_img: data.author_img,
                        author_bio: data.author_bio,
                        tags: data.tags,
                        post_views: data.post_views,
                        post_share: data.post_share,
                        author_social: data.author_social,
                        story: data.story,
                        trending: data.trending,
                        published: data.published,
                    }
                })
                // // Upload MDX to GG Drive
                // result = await uploadToGgDrive({
                //     fileName: fileName,
                //     folderName: 'TradingToolApp/posts/VN',
                //     fileData: Buffer.from(mdxContent),
                //     fileMimeType: "text/markdown",
                // });

                // //write markdown file to server
                // fs.writeFile(`./public/uploadPosts/VN/${fileName}.md`, mdxContent, function (err) {
                //     if (err) throw err;
                //     console.log('File is created successfully.');
                // })
                break;
            default:
                break;
        }
        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: newPost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const updatePost = async (req, res) => {
    try {
        const { fileName, mdxContent, data, language } = req.body;
        let updatedPost;
        // // deletePost(fileName);
        // fs.writeFile(`./public/uploadPosts/${fileName}.md`, mdxContent, function (err) {
        //     if (err) throw err;
        //     console.log('File is created successfully.');
        // })

        switch (language) {
            case "EN":
                //save data to database
                updatedPost = await prisma.postEnglish.update({
                    where: {
                        slug: fileName,
                    },
                    data: {
                        title: data.title,
                        excerpt: data.excerpt,
                        postFormat: data.postFormat,
                        featureImg: data.featureImg,
                        date: data.date,
                        cate: data.cate,
                        cate_img: data.cate_img,
                        cate_bg: data.cate_bg,
                        tags: data.tags,
                        content: data.content,
                        quoteText: data.quoteText,
                        videoLink: data.videoLink,
                        audioLink: data.audioLink,
                        gallery: data.gallery,
                        author_name: data.author_name,
                        author_desg: data.author_desg,
                        author_img: data.author_img,
                        author_bio: data.author_bio,
                        author_social: data.author_social,
                        story: data.story,
                        trending: data.trending,
                        post_views: data.post_views,
                        post_share: data.post_share,
                        published: data.published,
                    }
                })
                break;
            case "VN":
                //save data to database
                updatedPost = await prisma.postVietnamese.update({
                    where: {
                        slug: fileName,
                    },
                    data: {
                        title: data.title,
                        excerpt: data.excerpt,
                        postFormat: data.postFormat,
                        featureImg: data.featureImg,
                        date: data.date,
                        cate: data.cate,
                        cate_img: data.cate_img,
                        cate_bg: data.cate_bg,
                        tags: data.tags,
                        content: data.content,
                        quoteText: data.quoteText,
                        videoLink: data.videoLink,
                        audioLink: data.audioLink,
                        gallery: data.gallery,
                        author_name: data.author_name,
                        author_desg: data.author_desg,
                        author_img: data.author_img,
                        author_bio: data.author_bio,
                        author_social: data.author_social,
                        story: data.story,
                        trending: data.trending,
                        post_views: data.post_views,
                        post_share: data.post_share,
                        published: data.published,
                    }
                })
                break;
        }

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: updatedPost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

const deletePost = async (req, res) => {
    try {
        const { fileName, language } = req.body;
        let deletedPost;
        console.log(fileName, language)
        
        switch (language) {
            case "EN":
                //delete from local DB
                deletedPost = await prisma.postEnglish.delete({
                    where: {
                        slug: fileName,
                    },
                })
                // //delete from local DB
                // fs.unlink(`./public/uploadPosts/EN/${fileName}.md`, function (err) {
                //     if (err) throw err;
                //     console.log('File is deleted successfully.');
                // })
                break;
            case "VN":
                //delete from local DB
                deletedPost = await prisma.postVietnamese.delete({
                    where: {
                        slug: fileName,
                    },
                })
                // //delete from local DB
                // fs.unlink(`./public/uploadPosts/VN/${fileName}.md`, function (err) {
                //     if (err) throw err;
                //     console.log('File is deleted successfully.');
                // })
                break;
        }

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: deletedPost });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, code: ERROR_CODE, message: error, data: [] });
    }
}

export default postHandler;