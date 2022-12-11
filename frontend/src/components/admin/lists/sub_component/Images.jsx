import React, { useState, Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uploadImages, deleteImage } from "../../../../actions/listActions";
import { LIST_DETAILS_SUCCESS } from "../../../../constants/listConstants";

const Images = ({ list_id, images: imagesData }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(true);
  const [image, setImage] = useState("");
  const [images, setImages] = useState("");
  const [imagePreview, setImagePreview] = useState(
    `${process.env.PUBLIC_URL}/images/noimage.png`
  );
  const { error, loading, list } = useSelector((state) => state.listDetails);

  useEffect(() => {
    setImages(imagesData);
  }, [imagesData]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [error]);

  const handleDeleteImage = (image) => {
    dispatch(deleteImage(list_id, image._id));
    dispatch({ type: LIST_DETAILS_SUCCESS });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      alert.info("Select Image");
      return false;
    }

    setShowProgress(false);
    const formData = new FormData();
    formData.set("file", image);

    //dispatch(uploadImage(list_id, formData));
    const data = await uploadImages(list_id, formData, {
      onUploadProgress: function (progressEvent) {
        const percent = (progressEvent.loaded / progressEvent.total) * 100;
        setProgress(percent);
      },
    });
    console.log(data["data"]["images"]);
    setImages(data["data"]["images"]);
  };

  const onChange = (e) => {
    if (e.target.name === "file") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreview(reader.result);
          setImage(reader.result);
          //console.log(reader.result);
        }
      };
      // console.log("File Load");
      // console.log(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    } else {
      //setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <br />
      </div>
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4>Images</h4>
          </div>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <form onSubmit={submitHandler} encType="multipart/form-data">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <div className="d-flex align-items-center">
                          <div>
                            <figure className="avatar mr-3 item-rtl">
                              <img
                                src={imagePreview}
                                className=""
                                alt="Image Preview"
                                width={"150px"}
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
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              Choose Image
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12" hidden={showProgress}>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-primary"
                        disabled={loading ? true : false}
                      >
                        <i className="fa fa-upload"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row">
                {images
                  ? images.map((image) => (
                      <Fragment key={image.public_id}>
                        <div className="col-3">
                          <figure className="figure image-container">
                            <Link
                              to={`/list/${list._id}/${image._id}`}
                              className="btn btn-default btn-edit"
                            >
                              <i className="fa fa-edit"></i>
                            </Link>
                            <button
                              className="btn btn-default btn-trash"
                              onClick={() => handleDeleteImage(image)}
                            >
                              <i className="fa fa-trash"></i>
                            </button>
                            <img
                              src={image.url}
                              className="figure-img img-fluid rounded"
                              alt="Listing"
                            />
                            <figcaption className="figure-caption text-right"></figcaption>
                          </figure>
                        </div>
                      </Fragment>
                    ))
                  : "No Image"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Images;
