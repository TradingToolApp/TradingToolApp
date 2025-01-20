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
    const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
    return encryptedData;
};

export const decryptData = (encryptedData: string, secretKey: string): any => {
    const decryptedData = AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
};