import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import data from "../db/data";
//import { Rating, Typography } from "@material-tailwind/react";

const MerchEditor = () => {
  //const [data, setData] = useState([]);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function axiosTest() {
      // const response = await axios.get("/fakeapi/products");
      // setData(response.data);
      const userID = JSON.parse(localStorage.getItem("userID"));
      if(!userID){
        navigate("/sign-up");
        return;
      }
      const response = await axios.get(`/fakeapi/users/${userID}`);
      setUserName(JSON.parse(response.data.username));
    }

    axiosTest();
  }, [navigate]);

  const [img, setImage] = useState(
    "https://yt3.googleusercontent.com/ytc/APkrFKb_WQOhfq4ZQeTGiHzX7ROY3202bwR23zfE7-Bxnw=s900-c-k-c0x00ffffff-no-rj"
  );
  const allColors = [
    "Red",
    "Yellow",
    "Green",
    "Blue",
    "Indigo",
    "Purple",
    "Pink",
    "Gray",
    "White",
    "Black",
    "Rose",
    "Violet",
    "Orange",
    "Brown",
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
      id: Math.floor(Math.random() * 1000000000),
      title: e.target[1].value,
      img: "", //`https://picsum.photos/id/${data.length+1}/1200/1200`,//URL.createObjectURL(e.target[0].files[0])
      star: 0,
      price: parseFloat(e.target[3].value),
      params: {
        color: colors,
        availability: e.target[4].value,
        size: sizes,
      },
      shortDesc: e.target[2].value,
      longDesc: e.target[24].value,
      reviews: [],
      author: userName,
    };
    const propertys = document.getElementById("propertys").children;
    for (let i = 0; i < propertys.length; i++) {
      const property = propertys[i].value.split("=");
      merchData.params[property[0]] = property[1];
    }
    const image = new FileReader();
    image.readAsDataURL(e.target[0].files[0]);
    image.addEventListener("load", () => {
      merchData.img = image.result;
      const newData = Array.from(JSON.parse(localStorage.getItem("products")));
      newData.push(merchData);
      try {
        axios.post("/fakeapi/products", merchData);
      } catch (e) {
        console.log(e.message);
      }
      //navigate("/");
    });
  };

  const addProperty = (e) => {
    e.preventDefault();
    const property = document
      .getElementById("property_template")
      .children[0].cloneNode(true);
    const propertys = document.getElementById("propertys");
    propertys.appendChild(property);
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
                Short product description (120 symb max):
              </span>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 w-96">
                <textarea
                  maxlength="120"
                  className="rounded-lg text-black h-20 px-1 w-full"
                />
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
                    Availability:
                  </span>
                  <span className="text-black">
                    {" "}
                    <select className="rounded-lg">
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
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
                  Long product description (370 symb max):
                </span>
                <div className="text-gray-600 dark:text-gray-300 w-full text-sm mt-2">
                  <textarea
                    maxlength="370"
                    className="rounded-lg text-black w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <button
              className="bg-green-700 mt-2 p-1 rounded-full w-32 hover:bg-green-500"
              onClick={addProperty}
            >
              Add property
            </button>
            <div className="flex gap-1 text-white">
              <p>Example:</p>
              <div className="bg-white rounded-full w-24 flex justify-center text-black">
                firm=Puma
              </div>
              <div className="bg-white rounded-full w-32 flex justify-center text-black">
                category=T shirt
              </div>
            </div>
            <div id="propertys" className="flex gap-2 w-full"></div>
          </div>
          <button
            className="bg-gray-900 h-12 w-44 mt-5 border text-white border-gray-300 rounded-xl text-2xl hover:bg-gray-600"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <template id="property_template">
        <input
          className="text-center property w-32 me-1 accent-current rounded-full px-1"
          type="text"
        />
      </template>
    </div>
  );
};

export default MerchEditor;
