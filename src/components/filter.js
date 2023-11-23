import React from "react";
import data from "../db/data";

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
        categories[i].add(value);
      }
    }
    return categories;
  }
  const categories = allFilters();

  return (
    <div className="grid grid-cols-1 gap-2 justify-center items-start mt-3">
      {Object.keys(categories).map((category) => {
        if (Array.from(categories[category]).length > 5) {
          return (
            <div className="bg-gray-900 rounded-sm">
              <div className="flex justify-center">
                <h1 className="text-2xl capitalize">{category}</h1>
              </div>
              <div className="flex flex-wrap justify-center gap-2 rounded-lg p-2">
                {Array.from(categories[category]).map((value) => {
                  return (
                    <label className="input-wrapper px-2 rounded-full border border-gray-300">
                      <input
                        className="filter me-1 accent-current"
                        type="checkbox"
                        name=""
                        onChange={() => updateCheckeds()}
                      />
                      {value}
                    </label>
                  );
                })}
              </div>
              <hr className="mt-1" />
            </div>
          );
        } else {
          return (
            <div>
              <div className="flex flex-col items-center pb-2 gap-2 bg-gray-900 rounded-lg">
                <div className="flex justify-center">
                  <h1 className="text-2xl capitalize">{category}</h1>
                </div>
                {Array.from(categories[category]).map((value) => {
                  return (
                    <label className="input-wrapper px-2 rounded-full border border-gray-300">
                      <input
                        className="filter me-1 accent-current"
                        type="checkbox"
                        name=""
                        onChange={() => updateCheckeds()}
                      />
                      {value}
                    </label>
                  );
                })}
              </div>
              <hr className="mt-1" />
            </div>
          );
        }
      }, categories)}
    </div>
  );
}

export default Filter;
