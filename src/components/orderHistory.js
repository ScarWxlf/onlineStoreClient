import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    async function orderHistory() {
      const userID = localStorage.getItem("userID");
      async function getOrders(){
        const response = await axios.get(`/fakeapi/orders?userID=${userID}`);
        return response.data;
      }
      const orders = await getOrders();
      const history = [];
      if (orders.length > 0) {
        for (let i = 0; i < orders.length; i++) {
          let allimg = [];
          for(let j =0; j < orders[i].products.length && j<3; j++){
            const img = await axios.get(`/fakeapi/products/${orders[i].products[j].id}`);
            allimg.push(
              <img
              src={img.data.img}
              alt="Product"
              className="h-16 w-16 object-cover rounded-lg"
            />
              );
          }
          history.push(
            <div className="flex items-center justify-around h-20 w-full bg-blue-200 rounded-xl mx-1 my-1">
              <div className="flex items-center justify-start w-52 gap-1">
                {allimg}
              </div>
              <p>${orders[i].total}</p>
              <p>date: {orders[i].date}</p>
              <p>status: {orders[i].status}</p>
            </div>
          );
        }
      }
      setOrders(history);
    }
    orderHistory();
  }, []);

  return (
    <div className="flex flex-col flex-grow bg-gray-800">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center w-full bg-gray-800 h-full rounded-lg">
          <div className="flex items-end">
            <h1 className="text-3xl text-gray-200 mt-2">Order history</h1>
          </div>
          <div className="flex flex-wrap w-full px-2 mt-2">{orders.length === 0 ? (<div className="flex text-white justify-center w-full h-full items-center">History is empty now</div>) : (orders)}</div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
