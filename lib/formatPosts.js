const getValueByLanguage = (obj, language) => {
    const element = obj.filter(translation => translation.languageCode === language);
    return element[0];
}

const formatPosts = (posts, language) => {
    const formatedPosts = posts.map(post => {
        const obj = {
            id: post.id,
            cate_slug: post.cate_slug,
            author_slug: post.author.author_slug,
            slug: post.slug,
            title: getValueByLanguage(post.translations, language).title,
            excerpt: getValueByLanguage(post.translations, language).excerpt,
            postFormat: post.postFormat,
            featureImg: post.featureImg,
            date: post.date,
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
        }
        return obj;
    })
    return formatedPosts;
}
export default formatPosts;