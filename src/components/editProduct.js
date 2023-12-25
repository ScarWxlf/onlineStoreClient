import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const navigate = useNavigate();
  let { id } = useParams();
  // const data = JSON.parse(localStorage.getItem("products"));
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("");
  const [img, setImage] = useState(null);
  const [data, setData] = useState([]);
  const [star, setStar] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState("");
  const [availability, setAvailability] = useState("");
  const [params, setParams] = useState({
    color: [],
    size: [],
    availability: "",
  });

  useEffect(() => {
    async function axiosTest() {
      let response = await axios.get(`/fakeapi/products/${id}`);
      response.data = JSON.parse(response.data);
      setImage(response.data.img);
      setTitle(response.data.title);
      setPrice(response.data.price);
      setShortDesc(response.data.shortDesc);
      setLongDesc(response.data.longDesc);
      setAvailability(response.data.params.availability);
      setParams(response.data.params);
      setStar(response.data.star);
      setReviews(response.data.reviews);
      setAuthor(response.data.author);
      setData(response.data);
    }
    axiosTest();
  },[id]);

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

  useEffect(() => {
    let inputs = document.getElementsByClassName("color");
    if (typeof params.color === "string") {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === data[id - 1].params.color) {
          inputs[i].checked = true;
        }
      }
    } else {
      for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < params.color.length; j++) {
          if (inputs[i].value === params.color[j]) {
            inputs[i].checked = true;
          }
        }
      }
    }

    let sizeInputs = document.getElementsByClassName("size");
    for (let i = 0; i < sizeInputs.length; i++) {
      for (let j = 0; j < params.size.length; j++) {
        if (sizeInputs[i].value === params.size[j]) {
          sizeInputs[i].checked = true;
        }
      }
    }

    // render propertys
    if(document.getElementById("propertys").children.length > 0) {
        return;
    }
    for (let k in params) {
      if (k === "color" || k === "size" || k === "availability") continue;
      let property = document
        .getElementById("property_template")
        .children[0].cloneNode(true);
      let propertys = document.getElementById("propertys");
      property.children[0].value = `${k}=${params[k]}`;
      property.children[1].addEventListener("click", deleteItem);
      propertys.appendChild(property);
    }
  }, [data, id, params]);

  const handleSubmit = async (e) => {
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
      id: id,
      title: e.target[1].value,
      img: img, //URL.createObjectURL(e.target[0].files[0]) ||
      star: star,
      price: parseFloat(e.target[4].value),
      params: {
        color: colors,
        //firm: data[id - 1].params.firm,
        availability: e.target[5].value,
        size: sizes,
      },
      shortDesc: e.target[3].value,
      longDesc: e.target[25].value,
      reviews: reviews,
      author: author,
    };
    const propertys = document.getElementsByClassName("property");
    for (let i = 0; i < propertys.length; i++) {
      if (propertys[i].value.length > 0) {
        let property = propertys[i].value.split("=");
        merchData.params[property[0]] = property[1];
      }
    }
    //console.log(merchData);
    if (e.target[0].files[0] === undefined) {
      await axios.patch(`/fakeapi/products/${id}`, merchData);
      navigate("/");
      return;
    }
    const image = new FileReader();
    image.readAsDataURL(e.target[0].files[0]);
    image.addEventListener("load",async () => {
      merchData.img = image.result;
      await axios.patch(`/fakeapi/products/${id}`, merchData);
      navigate("/");
    });
  };

  const deleteItem = (e) => {
    e.preventDefault();
    e.currentTarget.parentElement.remove();
  };

  const deleteProduct = async (e) => {
    e.preventDefault();
    await axios.delete(`/fakeapi/products/${id}`);
    navigate("/");
  }

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
                  src={img}
                  className="w-full h-full rounded-lg"
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
              <div className="flex">

              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex gap-1">
                Title:{" "}
                <input
                  className="rounded-lg text-black"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </h2>
              <div className="w-1/5 flex justify-end items-center">
                  
                    <button 
                    onClick={deleteProduct}
                    className="bg-red-600 rounded-full px-4 h-6"
                    >
                      Delete
                    </button>
                </div>
                </div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Short product description (max 120 symbols):
              </span>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-4 w-96">
                
                <textarea
                  maxlength="120"
                  className="rounded-lg text-black h-20 px-1 w-full"
                  value={shortDesc}
                  onChange={(e) => {
                    setShortDesc(e.target.value);
                  }}
                />
              </div>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Price:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    <input
                      className="rounded-lg text-black w-20 px-1"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Availability (In Stock) (Out of Stock):
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    <select className="rounded-lg text-black">
                      <option
                        value={availability}
                        selected
                        hidden
                      >
                        {availability}
                      </option>
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
                  Long product description (max 370 symbols):
                </span>
                <div className="text-gray-600 dark:text-gray-300 w-full text-sm mt-2">
                  <textarea
                    maxlength="370"
                    className="rounded-lg text-black w-full"
                    value={longDesc}
                    onChange={(e) => {
                      setLongDesc(e.target.value);
                    }}
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
            <p className="text-white">Propertys:</p>
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
        <div className="relative">
          <input
            className="text-center property w-32 me-1 accent-current rounded-full px-1"
            type="text"
          />
          <button class="absolute -top-7 right-3 text-gray-300 lg:mt-6 lg:-mr-4 hover:text-gray-600  dark:hover:text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              class="w-3 h-3 bi bi-x-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </template>
    </div>
  );
}

export default EditProduct;
