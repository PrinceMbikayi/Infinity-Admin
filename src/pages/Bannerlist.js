import React, { useEffect, useState } from "react";
import { Table, Modal, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {FaLink} from 'react-icons/fa'
import { Link } from "react-router-dom";

import { deleteABanner, getBanners, resetState } from "../features/banner/bannerSlice";
import CustomModal from "../components/CustomModal";
import { toast } from "react-toastify";
const Bannerlist = () => {
  const [open, setOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const dispatch = useDispatch();
  const bannerState = useSelector((state) => state.banner) || {};

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (bannerState?.isSuccess && bannerState?.deletedBanner) {
      toast.success("Banner Deleted Successfully!");
      dispatch(resetState());
      dispatch(getBanners());
      setOpen(false);
    }
    if (bannerState?.isError) {
      toast.error("Something went wrong!");
    }
  }, [bannerState?.isSuccess, bannerState?.isError, bannerState?.deletedBanner, dispatch]);

  const showModal = (id) => {
    setOpen(true);
    setBannerId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <Image
          src={image}
          alt="Banner"
          width={100}
          height={60}
          style={{ objectFit: "cover", cursor: "pointer" }}
          preview={{
            maskClassName: 'customize-mask',
            mask: <div className="ant-image-mask-info">Click to view</div>
          }}
        />
      ),
    },
    {
      title: "Link",
      dataIndex: "link",
      render: (link) => (
        <Link href={link}>
          <FaLink />
        </Link>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive) => (isActive ? "Active" : "Inactive"),
    },
    {
      title: "Tagline",
      dataIndex: "tagline",
    },
    {
      title: "Heading",
      dataIndex: "heading",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Subdescription",
      dataIndex: "subdescription",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const data = [];
  for (let i = 0; i < (bannerState?.banners?.length || 0); i++) {
    data.push({
      key: i + 1,
      title: bannerState?.banners[i].title,
      image: bannerState?.banners[i].image,
      link: bannerState?.banners[i].link,
      isActive: bannerState?.banners[i].isActive,
      tagline: bannerState?.banners[i].tagline,
      heading: bannerState?.banners[i].heading,
      description: bannerState?.banners[i].description,
      subdescription: bannerState?.banners[i].subdescription,
      action: (
        <div className="d-flex gap-3">
          <Link 
            to={`/admin/banner?bannerid=${bannerState?.banners[i]._id}`} 
            className="text-warning fs-3"
          >
            <BiEdit />
          </Link>
          <button
            className="text-danger fs-3 bg-transparent border-0"
            onClick={() => showModal(bannerState?.banners[i]._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    });
  }

  const deleteBanner = () => {
    dispatch(deleteABanner(bannerId));
  };

  return (
    <div>
      <h3 className="mb-4 title">Banners</h3>
      <div>
        {bannerState?.isLoading ? (
          <div>Loading...</div>
        ) : (
          <Table columns={columns} dataSource={data} />
        )}
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={deleteBanner}
          title="Are you sure you want to delete this banner?"
        />
      </div>
    </div>
  );
};

export default Bannerlist;
