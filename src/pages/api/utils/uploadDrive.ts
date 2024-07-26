import { GoogleDriveService } from "./googleDriveService";

const uploadToGgDrive = async ({ fileName, folderName, fileData, fileMimeType, ...rest }: any) => {
  const driveClientId = process.env.GOOGLE_CLIENT_ID || "";
  const driveClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
  const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";

  const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

  let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
    console.error(error);
    return null;
  });

  if (!folder) {
    folder = await googleDriveService.createFolder(folderName);
  }

  const res = await googleDriveService.saveFile(fileName, fileData, fileMimeType, folder.id).catch((error: any) => {
    console.error(error);
  });
  console.info("Image uploaded successfully!");

  return res.data;
};

export default uploadToGgDrive;