export const getValueByLanguage = (obj, language) => {
    if (typeof obj === 'undefined') return {};
    const element = obj.filter(translation => translation.languageCode === language);
    return element[0];
}

export const translatePosts = (posts, language) => {
    return posts.map(post => {
        return {
            slug: post.slug,
            featureImg: post.featureImg,
            post_views: post.post_views,
            title: getValueByLanguage(post.translations, language).title,
            excerpt: getValueByLanguage(post.translations, language).excerpt,
            date: post.createdAt.slice(0, 10),
            cate_slug: post.category.cate_slug,
            cate: getValueByLanguage(post.category.translations, language).cate,
            cate_img: post.category.cate_img,
            read_time: 0, //this is not correct, but I don't have the correct data
            author_slug: post.author.author_slug,
            author_name: post.author.author_name,
            author_social: post.author.author_social,
        };
    });
}

export const translateOnePost = (post, language) => {
    return {
        slug: post.slug,
        postFormat: post.postFormat,
        featureImg: post.featureImg,
        title: getValueByLanguage(post.translations, language).title,
        excerpt: getValueByLanguage(post.translations, language).excerpt,
        date: post.createdAt.slice(0, 10),
        content: getValueByLanguage(post.translations, language).content,
        videoLink: post.videoLink,
        audioLink: post.audioLink,
        quoteText: getValueByLanguage(post.translations, language).quoteText,
        cate_slug: post.category.cate_slug,
        cate: getValueByLanguage(post.category.translations, language).cate,
        cate_bg: post.category.cate_bg,
        cate_img: post.category.cate_img,
        author_slug: post.author.author_slug,
        author_name: post.author.author_name,
        author_social: post.author.author_social,
        author_img: post.author.author_img,
        author_bio: post.author.author_bio,
        post_views: post.post_views,
        post_share: post.post_share,
    };
}

export const formatPosts = (posts, language) => {
    return posts.map(post => {
        return {
            id: post.id,
            slug: post.slug,
            postFormat: post.postFormat,
            featureImg: post.featureImg,
            date: post.createdAt.slice(0, 10),
            createdAt: post.createdAt.slice(0, 10),
            updatedAt: post.updatedAt.slice(0, 10),
            status: post.status,
            trending: post.trending,
            videoLink: post.videoLink,
            audioLink: post.audioLink,
            cate_slug: post.category.cate_slug,
            cate: getValueByLanguage(post.category.translations, language).cate,
            cate_img: post.category.cate_img,
            cate_bg: post.category.cate_bg,
            author_slug: post.author.author_slug,
            author_name: post.author.author_name,
            author_img: post.author.author_img,
            author_social: post.author.author_social,
            author_desg: getValueByLanguage(post.author.translations, language).author_desg,
            author_bio: getValueByLanguage(post.author.translations, language).author_bio,
            tags: post.tags.map(tag => tag.tag_slug),
            comments: post.post_share, //this is not correct, but I don't have the correct dat || "a
            title: getValueByLanguage(post.translations, language).title,
            excerpt: getValueByLanguage(post.translations, language).excerpt,
            content: getValueByLanguage(post.translations, language).content,
            quoteText: getValueByLanguage(post.translations, language).quoteText,
            titleEN: getValueByLanguage(post.translations, "en").title,
            excerptEN: getValueByLanguage(post.translations, "en").excerpt,
            contentEN: getValueByLanguage(post.translations, "en").content,
            quoteTextEN: getValueByLanguage(post.translations, "en").quoteText,
            titleVI: getValueByLanguage(post.translations, "vi").title,
            excerptVI: getValueByLanguage(post.translations, "vi").excerpt,
            contentVI: getValueByLanguage(post.translations, "vi").content,
            quoteTextVI: getValueByLanguage(post.translations, "vi").quoteText,
        };
    });
}

export const formatAuthors = (authors, language) => {
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

export const formatCategories = (categories, language) => {
    if (categories.length === 0) return [];
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

export const formatTags = (tags, language) => {
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

export const formatComments = (comments, language) => {
    return comments.map(comment => {
        return {
            ...comment,
            title: getValueByLanguage(comment.post.translations, language).title,
            updatedAt: comment.updatedAt.slice(0, 10),
        }
    });
}

export const formatProducts = (products, language) => {
    return products.map(product => {
        return {
            id: product.id,
            image: product.image,
            url: product.url,
            name: getValueByLanguage(product.translations, language).name,
            description: getValueByLanguage(product.translations, language).description,
            name_EN: getValueByLanguage(product.translations, "en").name,
            description_EN: getValueByLanguage(product.translations, "en").description,
            name_VI: getValueByLanguage(product.translations, "vi").name,
            description_VI: getValueByLanguage(product.translations, "vi").description,
            active: product.active,
        }
    })
}