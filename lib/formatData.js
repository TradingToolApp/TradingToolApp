import { postFormatList } from "./constant/config.constant";

const getValueByLanguage = (obj, language) => {
    const element = obj.filter(translation => translation.languageCode === language);
    return element[0];
}

export const formatData = ( posts, language) => {
    return posts.map(post => {
        return {
            id: post.id,
            cate_slug: post.cate_slug,
            author_slug: post.author.author_slug,
            slug: post.slug,
            title: getValueByLanguage(post.translations, language).title,
            excerpt: getValueByLanguage(post.translations, language).excerpt,
            postFormat: post.postFormat,
            postFormatLabel: post.postFormat !== "gallery" && postFormatList.filter(format => format.value === post.postFormat)[0].label,
            featureImg: post.featureImg,
            date: post.date,
            updatedAt: post.updatedAt.slice(0, 10),
            cate: getValueByLanguage(post.category.translations, language).cate,
            cate_img: post.category.cate_img,
            cate_bg: post.category.cate_bg,
            content: getValueByLanguage(post.translations, language).content,
            videoLink: post.videoLink,
            audioLink: post.audioLink,
            gallery: post.gallery,
            quoteText: getValueByLanguage(post.translations, language).quoteText,
            tags: post.tags.map(tag => tag.tag_slug),
            author_name: post.author.author_name,
            author_img: post.author.author_img,
            author_social: post.author.author_social,
            author_desg: getValueByLanguage(post.author.translations, language).author_desg,
            author_bio: getValueByLanguage(post.author.translations, language).author_bio,
            post_views: post.post_views,
            post_share: post.post_share,
            titleEN: getValueByLanguage(post.translations, "en").title,
            excerptEN: getValueByLanguage(post.translations, "en").excerpt,
            contentEN: getValueByLanguage(post.translations, "en").content,
            quoteTextEN: getValueByLanguage(post.translations, "en").quoteText,
            titleVI: getValueByLanguage(post.translations, "vi").title,
            excerptVI: getValueByLanguage(post.translations, "vi").excerpt,
            contentVI: getValueByLanguage(post.translations, "vi").content,
            quoteTextVI: getValueByLanguage(post.translations, "vi").quoteText,
        };
    })
}

export const formatAuthors = ( authors, language) => {
    return authors.map(author => {
        return {
            id: author.id,
            value: author.author_slug,
            label: author.author_name,
            author_slug: author.author_slug,
            author_name: author.author_name,
            author_img: author.author_img,
            author_social: author.author_social,
            author_desgEN: getValueByLanguage(author.translations, "en").author_desg,
            author_bioEN: getValueByLanguage(author.translations, "en").author_bio,
            author_desgVI: getValueByLanguage(author.translations, "vi").author_desg,
            author_bioVI: getValueByLanguage(author.translations, "vi").author_bio,
        }
    });
}

export const formatCategories = ( categories, language) => {
    return categories.map(category => {
        return {
            id: category.id,
            value: category.cate_slug,
            label: getValueByLanguage(category.translations, language).cate,
            cate_slug: category.cate_slug,
            cate_bg: category.cate_bg,
            cate_img: category.cate_img,
            cateEN: getValueByLanguage(category.translations, "en").cate,
            descriptionEN: getValueByLanguage(category.translations, "en").description,
            cateVI: getValueByLanguage(category.translations, "vi").cate,
            descriptionVI: getValueByLanguage(category.translations, "vi").description,
        }
    });
}

export const formatTags = ( tags, language) => {
    return tags.map(tag => {
        return {
            id: tag.id,
            value: tag.tag_slug,
            label: getValueByLanguage(tag.translations, language).tag,
            tag_slug: tag.tag_slug,
            tagEN: getValueByLanguage(tag.translations, "en").tag,
            tagVI: getValueByLanguage(tag.translations, "vi").tag,
        }
    });
}