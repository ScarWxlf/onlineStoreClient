import React from "react";
import data from "../db/data";
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
  };

  return (
    <div className="flex flex-col gap-2 justify-start mt-1 w-full rounded-b-lg h-full">
      {Object.keys(categories).map((category) => {
          return (
            <div className="w-full rounded-b-lg">
              <div className="ps-5 bg-gray-900 rounded-sm w-full">
                <div className="flex w-full py-2">
                  <button
                    className="flex items-center justify-start gap-1 w-full"
                    id={ids++}
                    onClick={Show}
                  >
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className="h-4 w-4"
                    />
                    <h1 className="text-2xl capitalize">{category}</h1>
                  </button>
                </div>
                <div className="hidden">
                <div className="flex flex-wrap gap-2 rounded-lg p-2">
                  {Array.from(categories[category]).map((value) => {
                    return (
                      <label className="flex items-center input-wrapper px-2 rounded-full border border-gray-300">
                        <input
                          className="filter me-1 accent-current "
                          type="checkbox"
                          name=""
                          onChange={() => updateCheckeds()}
                        />
                        {value}
                        {category === "color" ? (
                            <div className={`ms-1 w-2 h-2 ${allColors[value.toLowerCase()]} rounded-full`}></div>
                          ):("")
                        }
                      </label>
                    );
                  })}
                </div>
                </div>
              </div>
                <hr className="mt-1" />
            </div>
          );
      }, categories)}
    </div>
  );
}

export default Filter;
