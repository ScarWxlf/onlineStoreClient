import React, { useState } from "react";
import data from "../db/data";
//import { Rating, Typography } from "@material-tailwind/react";

const MerchEditor = () => {
  const [img, setImage] = useState("https://yt3.googleusercontent.com/ytc/APkrFKb_WQOhfq4ZQeTGiHzX7ROY3202bwR23zfE7-Bxnw=s900-c-k-c0x00ffffff-no-rj");
  const allColors = [
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
    "gray",
    "white",
    "black",
    "rose",
    "violet",
    "orange",
    "brown",
  ];
  const ChangeImage = (e) => {
    setImage(URL.createObjectURL(e.currentTarget.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let colors = [];
    let chekeds = document.getElementsByClassName("color");
    for (let i = 0; i < chekeds.length; i++) {
      if (chekeds[i].checked) {
        colors.push(chekeds[i].value);
      }
    }
    let sizes = [];
    let sizeCheckeds = document.getElementsByClassName("size");
    for (let i = 0; i < sizeCheckeds.length; i++) {
      if (sizeCheckeds[i].checked) {
        sizes.push(sizeCheckeds[i].value);
      }
    }
    const merchData = {
      id: data.length + 1,
      image: URL.createObjectURL(e.target[0].files[0]),
      title: e.target[1].value,
      shortDesc: e.target[2].value,
      price: e.target[3].value,
      availability: e.target[4].value,
      longDesc: e.target[e.target.length - 2].value,
      colors: colors,
      sizes: sizes,
    };
    alert(JSON.stringify(merchData));
  };
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-4 flex flex-col flex-grow">
      <form onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="relative h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  id="image"
                  className="w-full h-full rounded-lg"
                  src={img}
                  alt="Product"
                />
              </div>
              <div>
                <h1 className="text-white mb-1">Load Image(s):</h1>
                <input
                  type="file"
                  multiple={true}
                  onChange={ChangeImage}
                  name="file-input"
                  id="file-input"
                  class="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 file:border-0 file:bg-gray-100 file:me-4 file:py-3 file:px-4 dark:file:bg-gray-700 dark:file:text-gray-400"
                />
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Title: <input className="rounded-lg text-black" />
              </h2>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Short product description:
              </span>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 w-96">
                <textarea className="rounded-lg text-black h-20 px-1 w-full" />
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    <input className="rounded-lg text-black w-20 px-1" />
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability (In Stock) (Out of Stock):
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    <input className="rounded-lg text-black w-24 px-1" />
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Color:
                </span>
                <div className="flex flex-wrap gap-2 items-center mt-2 text-white">
                  {allColors.map((color) => {
                    return (
                      <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300 bg-gray-700 hover:bg-gray-600">
                        <input
                          className="color me-1 accent-current "
                          type="checkbox"
                          name=""
                          value={color}
                        />
                        {color}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Select Size:
                </span>
                <div className="flex gap-3 items-center mt-2">
                  <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300 text-white py-2 bg-gray-700 hover:bg-gray-600">
                    S
                    <input
                      className="size mx-1 accent-current"
                      style={{ marginTop: "3px" }}
                      type="checkbox"
                      name=""
                      value="S"
                    />
                  </label>
                  <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300 text-white py-2 bg-gray-700 hover:bg-gray-600">
                    M
                    <input
                      className="size mx-1 accent-current"
                      style={{ marginTop: "3px" }}
                      type="checkbox"
                      name=""
                      value="M"
                    />
                  </label>
                  <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300 text-white py-2 bg-gray-700 hover:bg-gray-600">
                    L
                    <input
                      className="size mx-1 accent-current"
                      style={{ marginTop: "3px" }}
                      type="checkbox"
                      name=""
                      value="L"
                    />
                  </label>
                  <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300 text-white py-2 bg-gray-700 hover:bg-gray-600">
                    XL
                    <input
                      className="size mx-1 accent-current"
                      style={{ marginTop: "3px" }}
                      type="checkbox"
                      name=""
                      value="XL"
                    />
                  </label>
                  <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300 text-white py-2 bg-gray-700 hover:bg-gray-600">
                    XXL
                    <input
                      className="size mx-1 accent-current"
                      style={{ marginTop: "3px" }}
                      type="checkbox"
                      name=""
                      value="XXL"
                    />
                  </label>
                </div>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Long product description (if needed):
                </span>
                <div className="text-gray-600 dark:text-gray-300 w-full text-sm mt-2">
                  <textarea className="rounded-lg text-black w-full" />
                </div>
              </div>
            </div>
          </div>
          <button
            className="bg-gray-900 h-12 w-44 mt-5 border text-white border-gray-300 rounded-xl text-2xl hover:bg-gray-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MerchEditor;
