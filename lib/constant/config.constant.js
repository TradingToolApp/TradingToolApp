export const ACTION = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

export const postUploadDir = './public/uploadPosts';
export const postGetDir = '/uploadPosts';
export const imageUploadDir = './public/uploadImages';
export const imageGetDir = '/uploadImages';

export const cateList = [
    { value: "news", label: "News" },
    { value: "tools", label: "Tools" },
    { value: "study", label: "Study" },
    { value: "discussion", label: "Discussion" },
];
export const authorList = [
    { value: "hoan-nguyen", label: "Hoan Nguyen" },
    { value: "amachea-jajah", label: "Amachea Jajah" },
    { value: "ashley-graham", label: "Ashley Graham" },
    { value: "ahmad-nazeri", label: "Ahmad Nazeri" },
    { value: "xu-jianhong", label: "Xu Jianhong" },
    { value: "sergio-pliego", label: "Sergio Pliego" },
    { value: "david-brown", label: "David Brown" },
    { value: "nayah-tantoh", label: "Nayah Tantoh" },
];

export const tagList = [
    { value: "gaming", label: "Gaming" },
    { value: "technology", label: "Technology" },
    { value: "adventure", label: "Adventure" },
    { value: "travel", label: "Travel" },
    { value: "sports", label: "Sports" },
    { value: "science", label: "Science" },
    { value: "fashion", label: "Fashion" },
    { value: "life-style", label: "Life Style" },
];

export const postFormatList = [
    { value: "standard", label: "Standard" },
    { value: "text", label: "Text" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "quote", label: "Quote" },
    // { value: "gallery", label: "Gallery" },
];

export const initialFormValue = {
    author_slug: "hoan-nguyen",
    cate_slug: "news",
    postFormat: "standard",
    slug: "",
    featureImg: `/images/defaultPostImage.jpg`,
    date: new Date().toISOString().slice(0, 10),
    content: "",
    videoLink: "",
    audioLink: "",
    gallery: [],
    quoteText: "",
    tags: [],
    post_views: "1000",
    post_share: "0",
    story: false,
    trending: false,
    published: true,
    titleEN: "",
    excerptEN: "",
    contentEN: "",
    quoteTextEN: "",
    titleVI: "",
    excerptVI: "",
    contentVI: "",
    quoteTextVI: "",
};