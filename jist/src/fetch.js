import axios from "axios";

const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File upload success:", response.data);
  } catch (error) {
    console.error("File upload error: ", error);
  }
};

export default uploadFile