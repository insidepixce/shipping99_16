import { useCallback, useRef } from "react";
import axios from "axios";

export const Upload = () => {
  const inputRef = useRef(null);
  const onUploadImage = useCallback((e) => {
    if (!e.target.files) {
      return;
    }

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    axios({
      baseURL: "http://localhost:8001/",
      url: "/api/images",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <div>
      <input type="file" accept="image/*" name="thumbnail" ref={inputRef} />
      <button label="이미지 업로드" />
      <button type="submit" onClick={onUploadImageButtonClick}>
        hi
      </button>
      {/* <button label="이미지 제거" onClick={onDeleteImage} /> */}
    </div>
  );
};
