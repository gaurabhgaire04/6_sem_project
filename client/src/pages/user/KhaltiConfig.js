import axios from "axios";
import myKey from "./myKey";
import CartPage from "../CartPage";
// import Order from "../pages/users/order";

const KhaltiConfig = async (orderId, _totalAmount, product_name) => {
  const key = "4e2da8b987ea428aa0f21f4b2f0ed915";
  const url = "https://a.khalti.com/api/v2/epayment/initiate/";

  const payload = {
    return_url: `http://localhost:3000/dashboard/user/orders`,
    website_url: "http://localhost:3000",
    // eslint-disable-next-line no-undef
    amount: _totalAmount * 100,
    purchase_order_id: orderId,
    purchase_order_name: product_name,
    customer_info: {
      name: "user_name",
      phone: "9811496763",
      address: "Address 3 Main Street",
    },
  };

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `key ${myKey.secretKey}`,
    },
  };

  try {
    const response = await axios.post(url, payload, config);

    console.log("Response  is", response);

    if (response.status === 200) {
      const data = response.data;
      console.log({ data });

      window.location.href = data.payment_url;

      console.log({ data });
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};

export default KhaltiConfig;
