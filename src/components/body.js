import React, { useState, useEffect } from "react";
import "./style.css";
import Item from "./item";
import Pagination from "./pages";
import data from "../db/data";
import Filter, { updateCheckeds } from "./filter";
//import { Auth } from "./isauth";

function Body() {
  //console.log(Auth());
  
  const checked = updateCheckeds();
  const [items, setItems] = useState([]);

  const [search, setSearch] = useState("");

  const searchChange = (e) => {
    setSearch(e.target.value);
  };

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
        for (let i = 0; i < 20; i++) {
          allItems.push(<Item id={data[i].id} />);
        }
      }
    } else {
      let ids = new Set();
      for (let i = 0; i < checked.length; i++) {
        for (let j = 0; j < data.length; j++) {
          for (let k in data[j].params) {
            if (data[j].params[k] === checked[i]) {
              ids.add(data[j].id);
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
  }, [checked, search]);

  return (
    <div className="bg-gray-950 text-white flex-grow">
      <div className="bg-gray-800 flex justify-start items-center h-10 text-black">
        <input
          placeholder="Search"
          className="search ms-10 px-1 rounded-lg"
          onChange={searchChange}
        />
      </div>
      <div className="flex h-full">
        <div className="bg-gray-900 container flex justify-center items-start w-60 h-full">
          <Filter />
        </div>
        <div className="mx-auto">
          <div className="container grid grid-cols-1 pl-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 break-words">
            {items}
          </div>
          <div className="flex flex-col items-center justify-center mt-1">
            <p className="ms-4 mb-2">Pages</p>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
