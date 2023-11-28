/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import Modal from "@material-ui/core/Modal";
import KhaltiConfig from "./user/KhaltiConfig";
// import KhaltiCheckout from "khalti-checkout-web";
import { Navigate } from "react-router-dom";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false); // State to control the visibility of payment options
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [paymentmethod, setpaymentmethod] = useState("");
  const [mobile, setmobile] = useState("");
  // const [transactionipin, settransactionipin] = useState("");
  // let config = {
  //   publicKey: "test_public_key_965faff207714b1cab2dc1e8131a6141",
  //   productIdentity: "1234567890",
  //   productName: "Drogon",
  //   productUrl: "http://gameofthrones.com/buy/Dragons",
  //   eventHandler: {
  //     onSuccess(payload) {
  //       postorders("khaltiPayment");
  //       console.log(payload);
  //     },
  //     // onError handler is optional
  //     onError(error) {
  //       // handle errors
  //       console.log(error);
  //     },
  //   },
  //   paymentPreference: [
  //     "MOBILE_BANKING",
  //     "KHALTI",
  //     "EBANKING",
  //     "CONNECT_IPS",
  //     "SCT",
  //   ],
  // };
  // let checkout = new KhaltiCheckout(config);
  const postorders = async (payment) => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/postorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          products: cart,
          buyer: auth["user"]["_id"],
          status: "Not Process",
          payment: payment,
          totalprice: totalPrice(),
        }),
      });
      console.log(res.body);
      if (res.status === 200) {
        toast.success("Order sucessfully");
        navigate("/dashboard/user/orders");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(cart);
  // console.log(auth["user"]["_id"]);
  // const sendotp = async () => {
  //   try {
  //     const res = await fetch(
  //       "https://a.khalti.com/api/v2/epayment/initiate/",
  //       {
  //         mode: "no-cors",
  //         method: "POST",
  //         // headers: {
  //         //   "Content-Type": "application/json",
  //         // },
  //         body: JSON.stringify({
  //           public_key: "test_public_key_965faff207714b1cab2dc1e8131a6141",
  //           mobile: mobile,
  //           transaction_pin: transactionipin,
  //           amount: totalPrice(),
  //           product_identity: "book/id-120",
  //           product_name: "A Song of Ice and Fire",
  //           product_url: "http://bookexample.com",
  //         }),
  //       }
  //     );
  //     console.log(res.status);
  //     if (res.status === 200) {
  //       console.log(res.json());
  //     }
  //   } catch (error) {}
  // };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  };

  //delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle "Make Payment" button click
  const handleMakePayment = () => {
    // eslint-disable-next-line no-undef
    setShowPaymentOptions(true); // Show payment options when the button is clicked
  };

  return (
    <Layout>
      <div className="cart-page text-light">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7 p-0 m-0">
              {cart?.map((p) => (
                <div className="card my-4" key={p._id}>
                  <div className="d-flex flex-row align-items-center">
                    <div className="row">
                      <div className="col-sm-3">
                        <img
                          src={`http://localhost:8080/api/v1/product/get-image/${p._id}`}
                          alt={p.name}
                          style={{ width: "75%", height: "75%" }}
                        />
                      </div>
                      <div className="col-sm-7">
                        <div className="card-body">
                          <p className="fw-bold fs-5">{p.name}</p>
                          <p className="text-muted">
                            {p.description.substring(0, 30)}
                          </p>
                          <p className="text-bold">Price : NPR {p.price}</p>
                        </div>
                      </div>
                      <div className="col-sm-2 d-flex align-items-center">
                        <button
                          className="btn btn-danger"
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary mt-4">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : Nrs {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>

                    <div className="mt-2">
                      <button
                        className="btn btn-success"
                        onClick={handleMakePayment} // Call the handleMakePayment function on button click
                      >
                        Make Payment
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Please Login to checkout
                    </button>
                  )}
                </div>
                // eslint-disable-next-line react/jsx-no-comment-textnodes
              )}
              {/* // eslint-disable-next-line no-undef */}
              {showPaymentOptions && ( // Render payment options when showPaymentOptions is true
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <h3>Payment Options</h3>
                  <div
                    style={{
                      justifyContent: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <label
                        htmlFor="cashOnDelivery"
                        onClick={() => {
                          setpaymentmethod("cashOnDelivery");
                        }}
                      >
                        <input
                          type="radio"
                          id="cashOnDelivery"
                          name="paymentOption"
                          className="form-check-input"
                        />
                        <span className="mt-3" style={{ color: "aqua" }}>
                          Cash on Delivery
                        </span>
                      </label>
                    </div>
                    <div>
                      <label
                        htmlFor="khaltiPayment"
                        onClick={() => {
                          setpaymentmethod("khaltiPayment");
                        }}
                      >
                        <input
                          type="radio"
                          id="khaltiPayment"
                          name="paymentOption"
                          className="form-check-input"
                        />
                        <span className="mt-2" style={{ color: "aqua" }}>
                          {" "}
                          Khalti Payment
                        </span>
                        <Modal
                          onClose={handleClose}
                          open={open}
                          style={{
                            position: "absolute",
                            border: "2px solid #000",
                            backgroundColor: "white",
                            boxShadow: "2px solid black",
                            height: 500,
                            width: 1000,
                            margin: "auto",
                          }}
                        >
                          <div className="p-4">
                            <h2 className="text-center">khalti Payment</h2>
                            <div className="mb-3 w-[100]">
                              <input
                                type="text"
                                value={mobile}
                                placeholder="Your Number"
                                className="form-control"
                                onChange={(e) => setmobile(e.target.value)}
                              />
                            </div>
                            {/* <div className="mb-3">
                              <input
                                type="text"
                                value={transactionipin}
                                placeholder="Your Tansaction pin"
                                className="form-control"
                                onChange={(e) =>
                                  settransactionipin(e.target.value)
                                }
                              />
                            </div> */}
                            {/* <button
                              className="btn btn-primary col-sm-3 mt-4"
                              style={{
                                alignItems: "center",
                                display: "flex",
                                justifyContent: "center",
                              }}
                              onClick={() => {
                                sendotp();
                              }}
                            >
                              {" "}
                              Send Otp
                            </button> */}
                          </div>
                        </Modal>
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-danger col-sm-3 mt-4"
                    onClick={() => {
                      console.log(totalPrice());
                      if (paymentmethod === "khaltiPayment") {
                        KhaltiConfig(1, 500, "product_name").show({
                          amount: totalPrice() * 100,
                        });
                      } else if (paymentmethod === "cashOnDelivery") {
                        console.log("cashOnDelivery");
                        postorders("cashOnDelivery");
                      } else {
                        toast.error("Choose the payment method");
                      }
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
