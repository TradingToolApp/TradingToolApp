import multer from "multer";
import matter from 'gray-matter'
import path from "path";
import { sql } from "@vercel/postgres";
import { SUCCESS_CODE, ERROR_CODE, SUCCESS_MESSAGE } from "@/lib/constant";
import { postUploadDir } from "@/lib/constant";


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
        const posts = getAllPosts([
            'slug',
            'title',
            'excerpt',
            'postFormat',
            'featureImg',
            'date',
            'cate',
            'cate_img',
            'cate_bg',
            'content',
            'author_name',
            'author_img',
            'story',
            'trending',
            'post_views',
            'post_share'
        ])

        ////get from vercel DB
        // await sql`SELECT * FROM tradingToolApp_posts;`
        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: posts });
    } catch (error) {
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const createPost = async (req, res) => {
    try {
        const { fileName, mdxContent, data } = req.body;

        //write markdown file to server
        fs.writeFile(`./public/uploadPosts/${fileName}.md`, mdxContent, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        })

        ////save data to vercel DB
        // await sql`INSERT INTO tradingToolApp_posts (slug, title, excerpt, postFormat, featureImg, date, cate, cate_img, cate_bg, tags, content, author_name, author_desg, author_img, author_bio, author_social, story, trending, post_views, post_share) VALUES (
        //     ${data.slug},
        //     ${data.title},
        //     ${data.excerpt},
        //     ${data.postFormat},
        //     ${data.featureImg},
        //     ${data.date},
        //     ${data.cate},
        //     ${data.cate_img},
        //     ${data.cate_bg},
        //     ${data.tags},
        //     ${data.content},
        //     ${data.author_name},
        //     ${data.author_desg},
        //     ${data.author_img},
        //     ${data.author_bio},
        //     ${data.author_social},
        //     ${data.story},
        //     ${data.trending},
        //     ${data.post_views},
        //     ${data.post_share}
        // )`;

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data });
    } catch (error) {
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const updatePost = async (req, res) => {
    try {
        const { fileName, mdxContent, data } = req.body;

        // deletePost(fileName);
        fs.writeFile(`./public/uploadPosts/${fileName}.md`, mdxContent, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        })

        // //update to vercel DB
        // await sql`UPDATE tradingToolApp_posts SET 
        //         title = ${data.title},
        //         excerpt = ${data.excerpt},
        //         postFormat = ${data.postFormat},
        //         featureImg = ${data.featureImg},
        //         date = ${data.date},
        //         cate = ${data.cate},
        //         cate_img = ${data.cate_img},
        //         cate_bg = ${data.cate_bg},
        //         tags = ${data.tags},
        //         content = ${data.content},
        //         author_name = ${data.author_name},
        //         author_desg = ${data.author_desg},
        //         author_img = ${data.author_img},
        //         author_bio = ${data.author_bio},
        //         author_social = ${data.author_social},
        //         story = ${data.story},
        //         trending = ${data.trending},
        //         post_views = ${data.post_views},
        //         post_share = ${data.post_share}
        //         WHERE slug = ${data.slug};`


        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data });
    } catch (error) {
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

const deletePost = async (req, res) => {
    try {
        const { fileName } = req.body;
        fs.unlink(`./public/uploadPosts/${fileName}.md`, function (err) {
            if (err) throw err;
            console.log('File is deleted successfully.');
        })

        // //delete from vercel DB
        // sql`DELETE FROM tradingToolApp_posts WHERE slug = ${fileName};`

        res.status(200).json({ success: true, code: SUCCESS_CODE, message: SUCCESS_MESSAGE, data: fileName });
    } catch (error) {
        res.status(500).json({ success: true, code: ERROR_CODE, message: error, data: [] });
    }
}

export default postHandler;