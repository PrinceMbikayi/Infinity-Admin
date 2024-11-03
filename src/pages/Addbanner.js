import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { createBanner, getBanner, updateBanner, resetState } from "../features/banner/bannerSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  link: yup.string().required("Link is Required"),
  isActive: yup.boolean(),
  tagline: yup.string().required("Tagline is Required"),
  heading: yup.string().required("Heading is Required"),
  description: yup.string().required("Description is Required"),
  subdescription: yup.string().required("Subdescription is Required"),
});

const Addbanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBannerId = new URLSearchParams(location.search).get('bannerid');
  const imgState = useSelector((state) => state.upload.images);
  const uploadState = useSelector((state) => state.upload);
  const bannerState = useSelector((state) => state.banner) || {};
  const { isSuccess = false, isError = false, isLoading = false, createdBanner = null, banner = {} } = bannerState;
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (getBannerId) {
      dispatch(getBanner(getBannerId));
    } else {
      dispatch(resetState());
    }
  }, [getBannerId]);

  useEffect(() => {
    if (isSuccess && createdBanner) {
      toast.success("Banner Added Successfully!");
      navigate("/admin/banner-list");
      dispatch(resetState());
      dispatch(delImg(imgState[0]?.public_id)); // Reset image after creation/update
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: banner?.title || "",
      image: banner?.image || "",
      link: banner?.link || "",
      isActive: banner?.isActive ?? true,
      tagline: banner?.tagline || "",
      heading: banner?.heading || "",
      description: banner?.description || "",
      subdescription: banner?.subdescription || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (!imgState?.[0]?.url && !banner?.image) {
        toast.error("Image is required");
        return;
      }
      values.image = imgState?.[0]?.url || banner?.image;
      if (getBannerId) {
        const data = { bannerId: getBannerId, bannerData: values };
        dispatch(updateBanner(data)).then(() => {
          toast.success("Banner Updated Successfully!");
          navigate("/admin/banner-list");
          
          dispatch(resetState());
          dispatch(delImg(imgState[0]?.public_id)); // Reset image after creation/update
        });
      } else {
        dispatch(createBanner(values));
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4">{getBannerId  ? "Edit" : "Add"} Banner</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Banner Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          <CustomInput
            type="text"
            label="Enter Banner Link"
            name="link"
            onChng={formik.handleChange("link")}
            onBlr={formik.handleBlur("link")}
            val={formik.values.link}
          />
          <div className="error">
            {formik.touched.link && formik.errors.link}
          </div>

          <div className="mt-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isActive"
                checked={formik.values.isActive}
                onChange={formik.handleChange}
                id="isActive"
              />
              <label className="form-check-label" htmlFor="isActive">
                Is Active
              </label>
            </div>
          </div>

          <CustomInput
            type="text"
            label="Enter Tagline"
            name="tagline"
            onChng={formik.handleChange("tagline")}
            onBlr={formik.handleBlur("tagline")}
            val={formik.values.tagline}
          />
          <div className="error">
            {formik.touched.tagline && formik.errors.tagline}
          </div>

          <CustomInput
            type="text"
            label="Enter Heading"
            name="heading"
            onChng={formik.handleChange("heading")}
            onBlr={formik.handleBlur("heading")}
            val={formik.values.heading}
          />
          <div className="error">
            {formik.touched.heading && formik.errors.heading}
          </div>

          <CustomInput
            type="text"
            label="Enter Description"
            name="description"
            onChng={formik.handleChange("description")}
            onBlr={formik.handleBlur("description")}
            val={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <CustomInput
            type="text"
            label="Enter Sub description"
            name="subdescription"
            onChng={formik.handleChange("subdescription")}
            onBlr={formik.handleBlur("subdescription")}
            val={formik.values.subdescription}
          />
          <div className="error">
            {formik.touched.subdescription && formik.errors.subdescription}
          </div>

          <div className="bg-white border-1 p-5 text-center mt-3">
            <Dropzone
              onDrop={async (acceptedFiles) => {
                if (acceptedFiles.length > 1) {
                  toast.error("Only one image allowed");
                  return;
                }
                setIsUploading(true);
                await dispatch(uploadImg(acceptedFiles));
                setIsUploading(false);
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      {isUploading ? "Uploading..." : "Drag 'n' drop an image here, or click to select a file"}
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3 mt-3">
            {banner?.image && getBannerId  && !imgState?.[0] &&  (
              <div className="position-relative">
                <img src={banner?.image} alt="" width={200} height={200} />
              </div>
            )}
            {imgState?.[0] && (
              <div className="position-relative">
                <button
                  type="button"
                  onClick={() => dispatch(delImg(imgState[0].public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "10px", right: "10px" }}
                ></button>
                <img src={imgState[0].url} alt="" width={200} height={200} />
              </div>
            )}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : (getBannerId ? "Edit" : "Add")} Banner
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbanner;