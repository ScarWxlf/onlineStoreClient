import React, { useState, useEffect } from "react";
import "./style.css";
import Item from "./item";
//import dataInitial from "../db/data";
import Filter, { updateCheckeds } from "./filter";
import coolImage from "../images/c41a0b93-4561-4fe2-93ee-62493bc9807a.jpg";
import axios from "axios";
//import { Auth } from "./isauth";


function Body() {
  //const isAuth = Auth();
  // if (!localStorage.getItem("products")) {
  //   localStorage.setItem("products", JSON.stringify(dataInitial));
  // }

  const [data, setData] = useState([]);
  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get("/fakeapi/products");
      setData(JSON.parse(response.data));
      setLoading(false);
    }

    axiosTest();
  }, []);

  // if (!localStorage.getItem("profile")) {
  //   const profile = {
  //     img: "https://mdbcdn.b-cdn.net/img/new/avatars/1.webp",
  //     username: "David",
  //     email: "example@gmail.com",
  //     number: "+381234567890",
  //   };
  //   localStorage.setItem("profile", JSON.stringify(profile));
  // }

  const checked = updateCheckeds();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / 20); i++) {
    pages.push(i);
  }

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

  if (localStorage.getItem("page") === null) {
    localStorage.setItem("page", 1);
  }

  const changePage = (e) => {
    localStorage.setItem("page", e.currentTarget.textContent);
    console.log(localStorage.getItem("page") * 20);
  };

  let toProducts = localStorage.getItem("page") * 20;
  const fromProducts = toProducts - 20;
  if (toProducts > data.length) {
    toProducts = data.length;
  }

  useEffect(() => {
    if (items.length > 0) {
      document
        .getElementById(`page${localStorage.getItem("page")}`)
        .classList.add("bg-gray-700");
    }

    let allItems = [];
    if (checked.length === 0) {
      if (search.length > 0) {
        for (let i = fromProducts; i < toProducts; i++) {
          if (data[i].title.toLowerCase().includes(search.toLowerCase())) {
            allItems.push(<Item id={data[i].id} data={data} />);
          }
        }
      } else {
        for (let i = fromProducts; i < toProducts; i++) {
          allItems.push(<Item id={data[i].id} data={data} />);
        }
      }
    } else {
      for (let j = fromProducts; j < toProducts; j++) {
        let hasAllCheckedParams = true;
        for (let i = 0; i < checked.length; i++) {
          let paramFound = false;
          for (let k in data[j].params) {
            if (typeof data[j].params[k] === "object") {
              for (let l = 0; l < data[j].params[k].length; l++) {
                if (data[j].params[k][l] === checked[i]) {
                  paramFound = true;
                  break;
                }
              }
            } else {
              if (data[j].params[k] === checked[i]) {
                paramFound = true;
                break;
              }
            }
          }
          if (!paramFound) {
            hasAllCheckedParams = false;
            break;
          }
        }
        if (hasAllCheckedParams) {
          if (search.length > 0) {
            if (data[j].title.toLowerCase().includes(search.toLowerCase())) {
              allItems.push(<Item id={data[j].id} data={data} />);
            }
          } else {
            allItems.push(<Item id={data[j].id} data={data}/>);
          }
        }
      }
    }
    setItems(allItems);
  }, [checked, search, fromProducts, toProducts, data, items]);

  return (
    <div className="bg-gray-950 text-white flex-grow">
      <div className="flex flex-col">
        <div className="relative flex justify-center">
          <img
            className="object-cover h-72 w-full opacity-75"
            src={coolImage}
            alt="Welcome"
          />
          <div className="absolute w-10/12 flex flex-col items-center top-16 text-center drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
            <h1 className="text-5xl font-bold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
              Welcome to our store
            </h1>
            <p className="text-2xl font-semibold text-white drop-shadow-[0_10px_10px_rgba(0,0,0,1)]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
            </p>
            <a href="/merch-editor">
              <button className="bg-gray-900 h-12 w-44 mt-5 rounded-xl text-2xl hover:bg-gray-600">
                Constructor
              </button>
            </a>
          </div>
        </div>
        <div className="bg-gray-900 flex justify-start items-center h-10 text-black">
          <input
            placeholder="Search"
            className="search ms-5 px-1 rounded-lg"
            onChange={searchChange}
          />
        </div>
        <div className="flex h-full">
          <div className="bg-gray-950 container flex justify-start items-start w-40 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-60">
            <Filter />
          </div>
          <div className="mx-10 flex flex-col flex-grow ">
            {loading ? (
              <div className="flex justify-center mt-3">Loading...</div>
            ) : (
              <>
                <div className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 break-words">
                  {items}
                </div>
                {items.length > 0 ? (
                  <div className="flex flex-col items-center justify-end h-full mt-1">
                    <p className="ms-4 mb-2">Pages</p>

                    <nav aria-label="Page navigation example">
                      <ul class="list-style-none mb-6 flex">
                        {pages.map((page) => {
                          return (
                            <li>
                              <a
                                class="relative block rounded px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-gray-500 dark:hover:text-white"
                                href="/"
                                onClick={changePage}
                                id={`page${page}`}
                              >
                                {page}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                ) : (
                  <div className="w-full flex justify-center">
                    <h1 className="text-4xl text-center mt-10">
                      No items found 😟
                    </h1>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
