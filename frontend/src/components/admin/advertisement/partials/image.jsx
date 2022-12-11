import React, { Fragment, useEffect, useState } from "react";

const ImageSelector = ({ adImage, imageSize, setImage, setValidImage }) => {
  const [size, setSize] = useState(null);
  const [message, setMessage] = useState("");
  //   const [image, setImage] = useState("");

  useEffect(() => {
    if (size && imageSize) {
      if (size.width != imageSize.width || size.height != imageSize.height) {
        setMessage(
          `Invalid Size, required size is ${imageSize.width}x${imageSize.height}`
        );
        setValidImage(false);
      } else {
        setMessage("");
        setValidImage(true);
      }
    }
  }, [size, imageSize]);

  const onChange = (e) => {
    if (e.target.name === "file") {
      const reader = new FileReader();

      reader.onload = (file) => {
        if (reader.readyState === 2) {
          const image = new Image();
          image.src = file.target.result;
          image.onload = () => {
            setSize({ width: image.width, height: image.height });
          };

          setImagePreview(reader.result);
          setImage(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      //setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const [imagePreview, setImagePreview] = useState(
    `${process.env.PUBLIC_URL}/images/noimage.png`
  );

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="form-group">
            <div className="d-flex align-items-center">
              <div>
                <figure className="avatar mr-3 item-rtl">
                  <img
                    src={imagePreview}
                    className=""
                    width={200}
                    alt="Image Preview"
                  />
                </figure>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="customFile"
                  accept="image/*"
                  onChange={onChange}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Choose Image
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="error">{message}</div>
        </div>
        <div className="col-12">
          {adImage != null ? (
            <img
              src={adImage.image.url}
              width="150"
              className="rounded-circle"
              alt="Image Preview"
            />
          ) : (
            "No Image"
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ImageSelector;
