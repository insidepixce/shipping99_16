import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import axios from "axios";
import { useNavigate } from "react-router";

export const Upload = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [selectedImage, setSelectedImage] = useState();
  const watchedImage = watch("image_url");
  const navigate = useNavigate();

  useEffect(() => {
    if (watchedImage?.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(watchedImage[0]);
    }
  }, [watchedImage]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("image_url", data.image_url[0]);

    axios({
      baseURL: "/",
      url: "/api/images",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        alert("upload 완료!");
        navigate(`/`, {});
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-4 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <input
          className="border-2 border-gray-300 p-2 my-2 rounded-md text-black"
          name="title"
          type="text"
          placeholder="Title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <input
          className="border-2 border-gray-300 p-2 my-2 rounded-md text-black"
          name="content"
          type="text"
          placeholder="Content"
          {...register("content", { required: "Content is required" })}
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}

        <input
          className="border-2 border-gray-300 p-2 my-2 rounded-md text-black"
          type="file"
          name="image_url"
          {...register("image_url", { required: "Image is required" })}
        />
        {errors.image_url && (
          <p className="text-red-500">{errors.image_url.message}</p>
        )}
        {selectedImage && (
          <img
            src={selectedImage}
            alt="preview"
            className="h-80 w-full object-cover rounded-lg mt-3"
          />
        )}
        <input
          type="submit"
          value="Upload"
          className="bg-blue-600 text-white p-2 my-2 rounded-md cursor-pointer hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

export default Upload;
