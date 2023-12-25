import React, { useEffect } from "react";
//import data from "../db/data";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function Checkeds() {
  const checkeds = document.querySelectorAll(".filter");
  let checked = [];
  for (let i = 0; i < checkeds.length; i++) {
    if (checkeds[i].checked) {
      checked.push(checkeds[i].parentElement.innerText);
    }
  }
  return checked;
}

export function updateCheckeds() {
  return Checkeds();
} 

function Filter() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3004/products");
      const data = await response.json();
      setData(data);
    }
    fetchData();
  }, []);

  function allFilters() {
    const categories = {};
    for (let item of data) {
      for (let i in item.params) {
        let value = item.params[i];
        if (categories[i] === undefined) {
          categories[i] = new Set();
        }
        if (typeof value === "object") {
          for (let j = 0; j < value.length; j++) {
            categories[i].add(value[j]);
          }
        } else {
          categories[i].add(value);
        }
      }
    }
    return categories;
  }
  const categories = allFilters();

  const allColors = {
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
    white: "bg-white",
    black: "bg-black",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
    orange: "bg-orange-500",
    brown: "bg-orange-900",
  };

  let ids = 0;
  const Show = (e) => {
    e.currentTarget.parentElement.nextElementSibling.classList.toggle("hidden");
    e.currentTarget.firstElementChild.classList.toggle("rotate-180");

    e.currentTarget.classList.toggle("rounded-full");
    e.currentTarget.classList.toggle("rounded-t-2xl");
    e.currentTarget.classList.toggle("border-b-0");
  };

  return (
    <div className="flex flex-col justify-start w-full rounded-b-lg h-full">
      {Object.keys(categories).map((category) => {
          return (
            <div className="w-full rounded-b-lg">
              <div className="bg-gray-950 rounded-sm w-full flex flex-col items-center">
                <div className="flex justify-center w-full pt-2">
                  <button
                    className="flex relative items-center justify-start gap-1 w-11/12 bg-sky-950 border border-white/50 border-b-0 rounded-t-2xl hover:bg-sky-800"
                    id={ids++}
                    onClick={Show}
                  >
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className="ms-3 h-4 w-4 z-10"
                    />
                    <h1 pointer-events="none" className="text-2xl capitalize z-10"
                    >{category}</h1>
                  </button>
                </div>
                <div className="bg-sky-950 rounded-b-3xl  border border-white/50 border-t-0 w-11/12">
                <div className="ps-4 flex flex-wrap gap-2 rounded-lg  p-2">
                  {Array.from(categories[category]).map((value) => {
                    return (
                      <label className="flex items-center input-wrapper px-2 rounded-full hover:bg-sky-800">
                        <input
                          className="filter me-1 accent-green-500"
                          type="checkbox"
                          name=""
                          onChange={() => updateCheckeds()}
                        />
                        {value}
                        {category === "color" ? (
                            <div className={`ms-1 mt-0.5 w-2 h-2 ${allColors[value.toLowerCase()]} rounded-full`}></div>
                          ):("")
                        }
                      </label>
                    );
                  })}
                </div>
                </div>
              </div>
                {/* <hr className="mt-1 opacity-25" /> */}
            </div>
          );
      }, categories)}
    </div>
  );
}

export default Filter;
