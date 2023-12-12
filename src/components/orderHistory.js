import React from "react";

function OrderHistory() {
  function orderHistory() {
    const orders = JSON.parse(localStorage.getItem("order"));
    console.log(orders);
    const history = [];
    if (orders.user === JSON.parse(localStorage.getItem("profile")).username) {
      for (let i = 0; i < 5; i++) {
        history.push(
          <div className="flex items-center justify-around h-20 w-full bg-blue-200 rounded-xl mx-1 my-1">
            <p>items count: {Math.floor(Math.random()*5)+orders.deliveryData.length}</p>
            <p>${Math.floor(Math.random()*5)+orders.totalprice}</p>
            <p>date: {orders.date}</p>
          </div>
        );
      }
    }
    return history;
  }

  const history = orderHistory();

  return (
    <div className="flex flex-col flex-grow bg-gray-800">
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-col items-center w-full bg-gray-800 h-full rounded-lg">
          <div className="flex items-end">
            <h1 className="text-3xl text-gray-200 mt-2">Order history</h1>
          </div>
          <div className="flex flex-wrap w-full px-2 mt-2">{history}</div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
