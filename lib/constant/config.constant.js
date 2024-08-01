export const POSTACTION = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE'
}

export const postUploadDir = './public/uploadPosts';
export const postGetDir = '/uploadPosts';
export const imageUploadDir = './public/uploadImages';
export const imageGetDir = '/uploadImages';

export const cateList = [
    { value: "News", label: "News" },
    { value: "Tools", label: "Tools" },
    { value: "Study", label: "Study" },
    { value: "Discussion", label: "Discussion" },
];

export const tagList = [
    { value: "Standard", label: "Standard" },
    { value: "Adventure", label: "Adventure" },
    { value: "Travel", label: "Travel" },
    { value: "Sports", label: "Sports" },
    { value: "Science", label: "Science" },
    { value: "Technology", label: "Technology" },
    { value: "Fashion", label: "Fashion" },
    { value: "Life Style", label: "Life Style" },
];

export const postFormatList = [
    { value: "standard", label: "Standard" },
    { value: "text", label: "Text" },
    // { value: "gallery", label: "Gallery" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "quote", label: "Quote" },
];