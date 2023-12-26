import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyModal from "./modal";
import axios from "axios";
//import data from "../db/data";

function Cart() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get("/fakeapi/products");
      setData(response.data);
      setLoading(false);
    }

    axiosTest();
  }, []);

  const allColors = {
    red: "text-red-500",
    yellow: "text-yellow-500",
    green: "text-green-500",
    blue: "text-blue-500",
    indigo: "text-indigo-500",
    purple: "text-purple-500",
    pink: "text-pink-500",
    gray: "text-gray-500",
    white: "text-white",
    black: "text-black",
    rose: "text-rose-500",
    violet: "text-violet-500",
    orange: "text-orange-500",
    brown: "text-orange-900",
  };

  let Shipping = 0,
    Total = 0;
  let subtotal = 0;
  const [allItems, setAllItems] = useState([]);
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    async function getCart() {
      if (userID === null) {
        navigate("/sign-in");
        return;
      }
      const response = await axios.get(`/fakeapi/cart?userID=${userID}`);
      setAllItems(response.data[0].products);
    }
    getCart();
  }, [userID, navigate]);
  function checkCart() {
    if (allItems === null || allItems === undefined || allItems.length === 0) {
      return;
    }

    allItems.forEach((item) => {
      let itemPrice = data.find((el) => el.id === parseInt(item.id));
      if (itemPrice) {
        subtotal += itemPrice.price;
      }
    });
    subtotal = subtotal.toFixed(2);
    Shipping = 10;
    Total = parseFloat(subtotal) + Shipping;
    Total = Total.toFixed(2);
  }
  checkCart();

  async function redefinitionPrice(id) {
    const response = await axios.get(`/fakeapi/cart?userID=${userID}`);
    if (response.data.length > 0) {
      axios.patch(`/fakeapi/cart/${response.data[0].id}`, {
        products: [...response.data[0].products.filter((el) => el.id !== id)],
      });
      console.log(response.data[0].products);
    }
    window.location.reload();
  }

  const deleteItem = (e) => {
    let el = e.currentTarget.parentElement;
    let id = el.id;
    redefinitionPrice(id);
  };

  const updateQty = (e) => {
    e.currentTarget.previousSibling.value++;
  };

  const downdateQty = (e) => {
    e.currentTarget.nextSibling.value--;
    if (e.currentTarget.nextSibling.value < 1) {
      e.currentTarget.nextSibling.value = 1;
    }
  };

  const allRenderItems = allItems.map((item) => {
    return data.find((el) => el.id === parseInt(item.id));
  });
  return (
    <div class="flex flex-grow bg-gray-50 font-poppins dark:text-white dark:bg-gray-700 ">
      <MyModal open={isModalOpen} setOpen={setIsModalOpen} total={Total} />
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          Loading...
        </div>
      ) : (
        <div class="justify-center flex-1 px-1 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <h2 class="mb-10 text-4xl font-bold text-center ">Your Cart</h2>
          <div class="flex flex-wrap">
            <div class="w-full lg:w-8/12">
              <div class="px-10">
                {allItems === null ||
                allItems === undefined ||
                allItems.length === 0 ? (
                  <div className="flex flex-col items-center">
                    <h1 className="text-3xl">Cart is empty now -_-</h1>
                    <a href="/">
                      <button className="mt-5 rounded-lg bg-blue-800 p-2 hover:bg-blue-600">
                        Buy something
                      </button>
                    </a>
                  </div>
                ) : (
                  allRenderItems.map((item, index) => {
                    return (
                      <div
                        id={item.id}
                        class="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200 dark:border-gray-700 xl:justify-between border-opacity-40"
                      >
                        <div class="w-full mb-2 lg:mb-0 h-96 md:h-44 md:w-44">
                          <img
                            src={item.img}
                            alt=""
                            class="object-cover w-full h-full rounded-lg"
                          />
                        </div>
                        <div class="w-full px-4 mb-6 md:w-auto xl:mb-0">
                          <a
                            class="block mb-5 text-xl font-medium  hover:underline"
                            href={`/${item.id}/details`}
                          >
                            {item.title}
                          </a>
                          <div class="flex flex-wrap">
                            <p class="mr-4 text-sm font-medium">
                              <span class="">Color:</span>
                              <span
                                class={`ml-2 item-color ${
                                  allColors[allItems[index].color.toLowerCase()]
                                }`}
                              >
                                {allItems[index].color}
                              </span>
                            </p>
                            <p class="text-sm font-medium ">
                              <span>Size:</span>
                              <span class="ml-2 item-size">
                                {allItems[index].size}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div class="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                          <div class="flex items-center">
                            <h4 class="mr-4 font-medium ">Qty:</h4>
                            <div class="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 ">
                              <button
                                class="py-2 pr-2 border-r border-gray-300 dark:border-gray-600  hover:text-gray-700"
                                onClick={downdateQty}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="white"
                                  class="bi bi-dash"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                                </svg>
                              </button>
                              <input
                                type="number"
                                class="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50  md:text-right"
                                disabled="true"
                                value={1}
                              />
                              <button
                                class="py-2 pl-2 border-l border-gray-300 dark:border-gray-600 hover:text-gray-700 "
                                onClick={updateQty}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="white"
                                  class="bi bi-plus"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="w-full px-4 xl:w-auto">
                          <span class="text-xl font-medium text-blue-500  ">
                            <span class="text-sm">$</span>
                            <span>{item.price}</span>
                          </span>
                        </div>
                        <button
                          class="absolute top-0 right-0 text-gray-300 lg:mt-6 lg:-mr-4 hover:text-gray-600  dark:hover:text-gray-200"
                          onClick={deleteItem}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            class="w-6 h-6 bi bi-x-circle"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div class="w-full lg:w-4/12">
              <div class="px-6 mb-14">
                <div>
                  <h2 class="mb-6 text-3xl font-bold ">Cart totals</h2>
                  <div class="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border  dark:bg-gray-800 dark:border-gray-800 rounded-xl">
                    <span>Subtotal</span>
                    <span class="flex items-center text-xl">
                      <span class="mr-2 text-base">$</span>
                      <span>{subtotal}</span>
                    </span>
                  </div>
                  <div class="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border  dark:bg-gray-800 dark:border-gray-800 rounded-xl">
                    <span>Shipping</span>
                    <span class="flex items-center text-xl">
                      <span class="mr-2 text-base">$</span>
                      <span>{Shipping}</span>
                    </span>
                  </div>
                  <div class="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100 border  dark:bg-gray-800 dark:border-gray-800 rounded-xl">
                    <span>Total</span>
                    <span class="flex items-center text-xl text-blue-500 dark:text-blue-400">
                      <span class="mr-2 text-base">$</span>
                      <span>{Total}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    disabled={allItems.length === 0}
                    class="inline-block w-full px-6 py-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-blue-800 lg:w-auto disabled:bg-blue-900 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
