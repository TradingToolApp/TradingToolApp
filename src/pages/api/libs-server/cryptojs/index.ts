import AES from 'crypto-js/aes';
import CryptoJS from 'crypto-js';

export const generateSecretKey = (): string => {
    const keyLength = 32; // 32 bytes = 256 bits (AES-256)
    const buffer = new Uint8Array(keyLength);
    crypto.getRandomValues(buffer);
    return Array.from(buffer, (byte) =>
        byte.toString(16).padStart(2, '0')
    ).join('');
};

export const encryptData = (data: any, secretKey: string): string => {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    
    // mã hoá với mode ECB và padding Pkcs7
    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(data),
        key,
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
        }
    );
    // trả về dạng base64
    return encrypted.toString();

    // const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
    // return encryptedData;
};

export const decryptData = (encryptedData: string, secretKey: string): any => {
    const key = CryptoJS.enc.Utf8.parse(secretKey);

    const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);

    // const decryptedData = AES.decrypt(encryptedData.toString(), secretKey).toString(CryptoJS.enc.Utf8);
    // return decryptedData;
    // return JSON.parse(decryptedData);
};