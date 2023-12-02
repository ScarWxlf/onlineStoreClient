import React from "react";
import data from "../db/data";

function Cart() {
  let allItems = JSON.parse(localStorage.getItem("cart"));
  let cartItems = allItems.split(" ");

  let Subtotal = 0;
  cartItems.forEach((item) => {
    Subtotal += data[item - 1].price;
  }); 
  Subtotal = Subtotal.toFixed(2);  
  let Shipping = 10;
  let Total = parseFloat(Subtotal) + Shipping;
  Total = Total.toFixed(2);

  function redefinitionPrice(id) { 
    console.log(cartItems)
    let change = (JSON.parse(localStorage.getItem("cart")));
    change = change.split(" ");
    let newChange = change.filter((item) => item !== id);
    newChange = newChange.join(" ");
    console.log(newChange);
    localStorage.setItem("cart", JSON.stringify(newChange));
    window.location.reload();
  }

  const deleteItem = (e) => {
    let id = e.currentTarget.parentElement.id;
    e.currentTarget.parentElement.remove();
    redefinitionPrice(id);
  };

  const updateQty = (e) => {
    e.currentTarget.previousSibling.value++;
  }

  const downdateQty = (e) => {
    e.currentTarget.nextSibling.value--;
    if(e.currentTarget.nextSibling.value < 1){
      e.currentTarget.nextSibling.value = 1;
    }
  }
  return (
    <div class="flex flex-grow items-center bg-gray-50 font-poppins dark:text-white dark:bg-gray-700 ">
      <div class="justify-center flex-1 px-1 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <h2 class="mb-10 text-4xl font-bold text-center ">Your Cart</h2>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-8/12">
            <div class="px-10">
              {cartItems.map((item) => {
                return (
                  <div
                    id={data[item - 1].id}
                    class="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200 dark:border-gray-700 xl:justify-between border-opacity-40"
                  >
                    <div class="w-full mb-2 lg:mb-0 h-96 md:h-44 md:w-44">
                      <img
                        src={data[item - 1].img}
                        alt=""
                        class="object-cover w-full h-full rounded-lg"
                      />
                    </div>
                    <div class="w-full px-4 mb-6 md:w-auto xl:mb-0">
                      <a
                        class="block mb-5 text-xl font-medium  hover:underline"
                        href="/"
                      >
                        {data[item - 1].title}
                      </a>
                      <div class="flex flex-wrap">
                        <p class="mr-4 text-sm font-medium">
                          <span class="">Color:</span>
                          <span class="ml-2  ">
                            {data[item - 1].params.color}
                          </span>
                        </p>
                        <p class="text-sm font-medium ">
                          <span>Size:</span>
                          <span class="ml-2 ">38</span>
                        </p>
                      </div>
                    </div>
                    <div class="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                      <div class="flex items-center">
                        <h4 class="mr-4 font-medium ">Qty:</h4>
                        <div class="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 ">
                          <button class="py-2 pr-2 border-r border-gray-300 dark:border-gray-600  hover:text-gray-700" onClick={downdateQty}>
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
                          <button class="py-2 pl-2 border-l border-gray-300 dark:border-gray-600 hover:text-gray-700 "
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
                        <span>{data[item - 1].price}</span>
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
              })}
            </div>
          </div>
          <div class="w-full lg:w-4/12">
            <div class="px-6 mb-14">
              <div class="mb-10">
                <span class="mb-6 text-3xl font-bold text-gray-700 ">
                  Apply Coupon
                </span>
                <input
                  type="text"
                  class="flex-1 w-full px-8 py-4 mt-4 font-normal placeholder-gray-400 border dark:bg-gray-800 rounded-xl dark:border-gray-700 dark:placeholder-gray-500 md:flex-none md:mr-6 "
                  placeholder="x304k45"
                  required=""
                />
                <a
                  class="inline-block w-full px-6 py-4 mt-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-blue-500 lg:w-auto hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  href="/"
                >
                  Apply
                </a>
              </div>
              <div>
                <h2 class="mb-6 text-3xl font-bold ">Cart totals</h2>
                <div class="flex items-center justify-between px-10 py-4 mb-3 font-medium leading-8 bg-gray-100 bg-opacity-50 border  dark:bg-gray-800 dark:border-gray-800 rounded-xl">
                  <span>Subtotal</span>
                  <span class="flex items-center text-xl">
                    <span class="mr-2 text-base">$</span>
                    <span>{Subtotal}</span>
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
                <a
                  class="inline-block w-full px-6 py-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-blue-500 lg:w-auto hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                  href="/"
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
