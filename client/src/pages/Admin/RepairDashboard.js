import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function RepairDashboard() {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/getallrepair"
      );
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting all products");
    }
  };
  useEffect(() => {
    getAllProducts();
    console.log(products);
  }, []);

  return (
    <div>
      <Layout title={"Repair "}>
        <div className="container-fluid m-3 p-3 ">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-9">
              <h1 className="text-center text-white">To Be Repair</h1>
              <div className="m-1 w-75"></div>
              <div className="d-flex flex-wrap">
                {products?.map((p) => {
                  return (
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <div className="card-body">
                        <img
                          src={`http://localhost:8080/images/${p.photo}`} // Replace with the correct path
                          className="card-img-top"
                          alt={p.name}
                        />

                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                        <p className="card-text">{p.username}</p>
                        <p className="card-text">{p.useremail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
