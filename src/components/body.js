import React, { useState, useEffect } from "react";
import "./style.css";
import Item from "./item";
import data from "../db/data";
import Filter, { updateCheckeds } from "./filter";
import coolImage from "../images/c41a0b93-4561-4fe2-93ee-62493bc9807a.jpg";
//import { Auth } from "./isauth";

function Body() {
  //console.log(Auth());

  const checked = updateCheckeds();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const pages = [];
  for (let i = 0; i < data.length / 20; i++) {
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
    console.log(localStorage.getItem("page")*20);
  };

  const toProducts = localStorage.getItem("page")*20;
  const fromProducts = toProducts - 20;

  useEffect(() => {
    let allItems = [];
    if (checked.length === 0) {
      if (search.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].title.toLowerCase().includes(search.toLowerCase())) {
            allItems.push(<Item id={data[i].id} />);
          }
        }
      } else {
        for (let i = fromProducts; i < toProducts; i++) {
          allItems.push(<Item id={data[i].id} />);
        }
      }
    } else {
      let ids = new Set();
      for (let i = 0; i < checked.length; i++) {
        for (let j = fromProducts; j < toProducts; j++) {
          for (let k in data[j].params) {
            if (typeof data[j].params[k] === "object") {
              for (let l = 0; l < data[j].params[k].length; l++) {
                if (data[j].params[k][l] === checked[i]) {
                  ids.add(data[j].id);
                }
              }
            } else {
              if (data[j].params[k] === checked[i]) {
                ids.add(data[j].id);
              }
            }
          }
        }
      }
      ids.forEach((id) => {
        if (search.length > 0) {
          if (data[id - 1].title.toLowerCase().includes(search.toLowerCase())) {
            allItems.push(<Item id={id} />);
          }
        } else {
          allItems.push(<Item id={id} />);
        }
      });
    }
    setItems(allItems);
  }, [checked, search, fromProducts, toProducts]);

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
            <button className="bg-gray-900 h-12 w-44 mt-5 border border-gray-300 rounded-xl text-2xl hover:bg-gray-600">
              Constructor
            </button>
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
          <div className="bg-gray-900 container flex justify-start items-start w-40 sm:w-40 md:w-44 lg:w-48 xl:w-52 2xl:w-60">
            <Filter />
          </div>
          <div className="mx-10">
            <div className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 break-words">
              {items}
            </div>
            <div className="flex flex-col items-center justify-center mt-1">
              <p className="ms-4 mb-2">Pages</p>

              <nav aria-label="Page navigation example">
                <ul class="list-style-none mb-6 flex">
                  {pages.map((page) => {
                    return (
                      <li>
                        <a
                          class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                          href="/"
                          onClick={changePage}
                        >
                          {page + 1}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
