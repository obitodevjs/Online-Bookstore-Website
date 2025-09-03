const uploadImage = async (image) => {
    const cloudName = "dkr4eqfgx"; // CLOUDINARY_URL
    const uploadPreset = "book-shop"; // phải tạo preset này trước trong Cloudinary

    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Upload failed");
        }

        return data; // Trả về object chứa url, public_id,...
    } catch (error) {
        console.error("Upload error:", error.message);
        return null;
    }
};

export default uploadImage;
