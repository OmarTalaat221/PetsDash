import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  console.log("image", file);
  formData.append("image", file);
  const uploadReq = await axios.post(
    "https://camp-coding.site/petsimages/file_update.php",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  try {
    return uploadReq;
  } catch (err) {
    console.log(err);
  }
};
