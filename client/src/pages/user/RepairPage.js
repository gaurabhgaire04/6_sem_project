import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RepairPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [username, setusername] = useState("");
  const [useremail, setuseremail] = useState("");

  const [photo, setPhoto] = useState("");
  const postRepair = async () => {
    console.log("ok");

    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/auth/postrepair",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            description,
            photo:
              "https://images.unsplash.com/photo-1666013943155-40fdb51f0bd0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60",
            username,
            useremail,
          }),
        }
      );
      console.log(res.status);
      console.log(res.json());
      if (res.status === 200) {
        toast.success("Post Sucessfully");
        navigate("/");
      } else {
      }
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <div>
      <Layout title={"Repair "}>
        <div className="container-fluid m-3 p-3 ">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-9">
              <h1>Repair Your Watch</h1>
              <div className="m-1 w-75">
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Watch Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={username}
                    placeholder="Your Name"
                    className="form-control"
                    onChange={(e) => setusername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={useremail}
                    placeholder="Your email"
                    className="form-control"
                    onChange={(e) => setuseremail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Watch desc.."
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      postRepair();
                    }}
                  >
                    Repair It
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default RepairPage;
