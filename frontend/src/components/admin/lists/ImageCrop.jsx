import React, { Fragment, useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getList, updateList } from "../../../actions/listActions";
import Loader from "../../layout/Loader";
import { useAlert } from "react-alert";
import Cropper from "react-easy-crop";
import getCroppedImg from "./sub_component/cropImage";
import { Button, Modal } from "react-bootstrap";
import { uploadCropImage } from "../../../actions/listActions";
// import ImgDialog from "./sub_component/ImgDialog";

const ImageCrop = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const { isUploaded, loading, list, error } = useSelector((state) => {
    return state.listDetails;
  });

  useEffect(() => {
    if (isUploaded) {
      alert.success("Image Croped Successfully");
      navigate(`/list/${params.id}`);
    }
  }, [isUploaded]);

  useEffect(() => {
    if (list) {
      let temp = list.images.find((e) => e._id == params.image_id);
      setImage(temp);
    }
  }, [list]);

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getList(params.id));
  }, [dispatch, alert, error, params]);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [urlImage, setUrlImage] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image.url,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
      setUrlImage(croppedImage);
      setShow(true);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const handleClose = () => {
    setShow(false);
    setCroppedImage(null);
  };

  const submitHandler = (e) => {
    if (!croppedImage) {
      alert.info("Select Image");
      return false;
    }

    const formData = new FormData();
    formData.set("file", croppedImage);

    dispatch(uploadCropImage(params.id, params.image_id, formData));
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <MetaData title={"Image Crop"} />

        <div className="row">
          <div className="col-12 col-md-12">
            {loading ? (
              <Loader />
            ) : (
              <Fragment>
                <div className="container"></div>
                <br></br>
                <div className="card">
                  <div className="card-header">
                    <button
                      onClick={showCroppedImage}
                      className="btn btn-primary"
                    >
                      Crop
                    </button>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      {list ? (
                        <Fragment>
                          <div className="col-md-12"></div>
                          <div className="col-md-12">
                            {image ? (
                              <div style={{ height: "400px" }}>
                                <Cropper
                                  image={image.url}
                                  crop={crop}
                                  zoom={zoom}
                                  aspect={4 / 4}
                                  onCropChange={setCrop}
                                  onCropComplete={onCropComplete}
                                  onZoomChange={setZoom}
                                />
                              </div>
                            ) : (
                              "Loading..."
                            )}
                          </div>
                        </Fragment>
                      ) : (
                        <div className="col-12 text-center">No Package</div>
                      )}
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-12">
              <img src={urlImage} width="100%" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant="primary" onClick={submitHandler}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ImageCrop;
