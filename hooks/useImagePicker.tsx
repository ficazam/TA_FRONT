import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const useImagePicker = (imagePath: string) => {
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | unknown>("");

  const openImageTray = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({});

    try {
      setUploadingImage(true);

      if (!pickerResult.canceled) {
        await uploadImageAsync(pickerResult.assets[0]);
      }
    } catch (error) {
      setImageError(error);
      console.error(error);
    } finally {
      setUploadingImage(false);
    }
  };

  const uploadImageAsync = async (imageAsset: ImagePicker.ImagePickerAsset) => {
    if (imageAsset.fileName === null) {
      return;
    }

    const blob: Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageAsset.uri, true);
      xhr.send(null);
    });

    const storage = getStorage();
    const fileRef = ref(storage, `${imagePath}/${imageAsset.fileName}`);

    await uploadBytes(fileRef, blob);
    const fileUrl = await getDownloadURL(fileRef);

    setImages([...images, fileUrl]);
  };

  return { images, uploadingImage, openImageTray };
};
