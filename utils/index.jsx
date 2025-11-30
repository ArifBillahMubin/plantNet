import axios from "axios";

export const imageUpload = async imageData => {
    const fromData = new FormData();
    fromData.append('image', imageData);

    const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_API_key}`,
        fromData)

    return data?.data?.display_url
}