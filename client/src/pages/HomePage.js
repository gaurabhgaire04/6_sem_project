import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [recommdata, setrecommdata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/all-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //get all recomm product
  const getallrecomdata = async ({ userid }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/product/getsuggestedproduct/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Accept: "application/json",
          },
          body: JSON.stringify({
            userId: userid,
          }),
        }
      );

      if (response.ok) {
        // If content-type is JSON
        const data = await response.json();
        console.log(data.suggestedProducts);
        setrecommdata(data.suggestedProducts);
        // Do something with 'data', like setting state or handling it.
      } else {
        console.log("Response not OK:", response.status);
        // Log the response body for further investigation
        console.log(await response.text());
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  //get total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
      console.log(parseData.user._id);
      getallrecomdata({ userid: parseData.user._id });
    }
    console.log(recommdata);
    getAllProducts();

    getTotal();
  }, []);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${nextPage}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
      setPage(nextPage);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getallrecomdata({ userid: "647cc91429155d70494db5a0" });
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/filter-product",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Watch Nexus-Best Deals and Offers"}>
      <div className="main">
        <div className="filter ">
          <h5 className="title ">Category Filter</h5>

          <div className="items">
            {categories?.map((c) => (
              <Checkbox
                className="tt"
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                <span className="itemstitle">{c.name}</span>
              </Checkbox>
            ))}
          </div>

          {/* filter by price */}
          <h4 className="title title1">Filter By Price</h4>
          <div className="items">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div className="tt" key={p._id}>
                  <Radio className="tt" value={p.array}>
                    {p.name}
                  </Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="bhead">
            <button className="button" onClick={() => window.location.reload()}>
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="products ">
          {recommdata.length <= 0 ? (
            <div></div>
          ) : (
            <>
              <h1 className="title text-center">Frequently Order Products</h1>
              <div className="d-flex flex-row justify-content-center flex-wrap">
                {recommdata?.map((p) => (
                  <div
                    className="card"
                    style={{ width: "20rem", margin: 20 }}
                    key={p._id}
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                      className="card-img-top"
                      loading="lazy"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5 className="fs-4 fw-bold">{p.name}</h5>
                      <p className="text-muted">
                        {p.description.substring(0, 50)}
                        {p.description.length > 50 ? "..." : ""}
                      </p>
                      <p className="fw-bold">NRs {p.price}</p>
                      <div className="d-flex flex-wrap justify-content-around">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          More Details
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item add to cart successfully...");
                          }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center">
                {products && products.length < total && (
                  <button
                    className="btn btn-info text-light"
                    onClick={loadMore} // Call the loadMore function on button click
                  >
                    {loading ? "Loading ..." : "Load More"}
                  </button>
                )}
              </div>
            </>
          )}
          <h1 className="title text-center">All Products</h1>
          <div className="d-flex flex-row justify-content-center flex-wrap">
            {products?.map((p) => (
              <div
                className="card"
                style={{ width: "20rem", margin: 20 }}
                key={p._id}
              >
                <img
                  src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                  className="card-img-top"
                  loading="lazy"
                  alt={p.name}
                />

                <div className="card-body">
                  <h5 className="fs-4 fw-bold">{p.name}</h5>
                  <p className="text-muted">
                    {p.description.substring(0, 50)}
                    {p.description.length > 50 ? "..." : ""}
                  </p>
                  <p className="fw-bold">NRs {p.price}</p>
                  <div className="d-flex flex-wrap justify-content-around">
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item add to cart successfully...");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            {products && products.length < total && (
              <button
                className="btn btn-info text-light"
                onClick={loadMore} // Call the loadMore function on button click
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
