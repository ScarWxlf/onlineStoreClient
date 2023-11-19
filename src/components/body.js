import React from "react";
import "./style.css";
import Item from "./item";
import Filter from "./filter";
import Pagination from "./pages";
import data from "../db/data";
//import { Auth } from "./isauth";

function Body() {
  //console.log(Auth());
  const items = [];
  for (let i = 0; i < 20; i++) {
    items.push(<Item id={data[i].id}/>);
  }

  return (
    <div className="bg-gray-950 text-white">
      <div className="bg-gray-800 flex justify-start items-center h-10 text-black">
        <input placeholder="Search" className="ms-10 px-1 rounded-lg" />
      </div>
      <div className="flex">
        <div className="bg-gray-900 container flex justify-center items-start w-60">
          <Filter />
        </div>
        <div className="mx-auto">
            <div className="container grid grid-cols-1 pl-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 break-words">
                {items}
            </div>
            <div className="flex flex-col items-center justify-center mt-1">
                <p className="ms-4 mb-2">Pages</p>
                <Pagination/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
