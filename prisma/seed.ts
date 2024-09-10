import {PrismaClient} from "@prisma/client";
import categories from "./seeds/categories";
import authors from "./seeds/authors";
import tags from "./seeds/tags";
import {dataEN, dataVN} from "./seeds/posts";
import images from "./seeds/images";

const prisma = new PrismaClient();

async function main() {
    // Seed Languages
    const english = await prisma.language.create({
        data: {
            code: 'en',
            name: 'English',
        },
    });

    const vietnamese = await prisma.language.create({
        data: {
            code: 'vi',
            name: 'Vietnamese',
        },
    });

    // Seed Categories
    for (const categoryData of categories) {
        await prisma.category.create({
            data: {
                cate_slug: categoryData.cate_slug,
                cate_bg: categoryData.cate_bg,
                cate_img: categoryData.cate_img,
                translations: {
                    create: categoryData.translations.map(translation => ({
                        cate: translation.cate,
                        description: translation.description,
                        language: {connect: {code: translation.languageCode}},
                    })),
                },
            },
        });
    }

    // Seed Authors
    for (let i in authors) {
        await prisma.author.create({
            data: {
                author_slug: authors[i].author_slug,
                author_name: authors[i].author_name,
                author_img: authors[i].author_img,
                author_social: authors[i].author_social,
                translations: {
                    create: authors[i].translations.map(translation => ({
                        author_desg: translation.author_desg,
                        author_bio: translation.author_bio,
                        language: {connect: {code: translation.languageCode}}
                    })),
                },
            },
        });
    }

    // Seed Tags
    for (const i in tags) {
        await prisma.tag.create({
            data: {
                tag_slug: tags[i].tag_slug,
                translations: {
                    create: tags[i].translations.map(translation => ({
                        tag: translation.tag,
                        language: {connect: {code: translation.languageCode}}
                    })),
                }
            }
        });
    }

    // Seed Posts
    for (const i in dataEN) {
        const createdPost = await prisma.post.create({
            data: {
                postFormat: dataEN[i].postFormat,
                slug: dataEN[i].slug,
                featureImg: dataEN[i].featureImg,
                date: dataEN[i].date,
                post_views: dataEN[i].post_views,
                post_share: dataEN[i].post_share,
                videoLink: dataEN[i].videoLink ? dataEN[i].videoLink : "",
                audioLink: dataEN[i].audioLink ? dataEN[i].audioLink : "",
                gallery: [],
                story: dataEN[i].story ? dataEN[i].story : false,
                trending: dataEN[i].trending ? dataEN[i].trending : false,
                published: dataEN[i].published ? dataEN[i].published : false,
                translations: {
                    create: [{
                        title: dataEN[i].title,
                        excerpt: dataEN[i].excerpt,
                        content: dataEN[i].content,
                        language: {connect: {code: "en"}},
                    }, {
                        title: dataVN[i].title,
                        excerpt: dataVN[i].excerpt,
                        content: dataVN[i].content,
                        language: {connect: {code: "vi"}},
                    }],
                },
                author: {
                    connect: { author_slug: dataEN[i].author_slug },
                },
                category: {
                    connect: { cate_slug: dataEN[i].cate_slug },
                },
                tags: {
                    connect: [
                        {tag_slug: "gaming"},
                        {tag_slug: "technology"},
                        {tag_slug: "adventure"},
                        {tag_slug: "travel"},
                        {tag_slug: "sports"},
                        {tag_slug: "science"},
                        {tag_slug: "fashion"},
                        {tag_slug: "life-style"},
                    ]
                }
            },
        });
    }


}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
