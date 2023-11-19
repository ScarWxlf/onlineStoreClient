import React from "react";
import data from "../db/data";

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
  console.log(categories);

  return (
    <div className="grid grid-cols-1 gap-7 justify-center items-start mt-3">
      {Object.keys(categories).map((category) => {
        if (Array.from(categories[category]).length > 5) {
          return (
            <div>
              <div className="flex justify-center">
                <h1 className="text-2xl capitalize">{category}</h1>
              </div>
              <div className="grid grid-cols-2 gap-1">
                {Array.from(categories[category]).map((value) => {
                  return (
                    <label>
                      <input className="me-1" type="checkbox" name="" />
                      {value}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-col gap-1">
              <div className="flex justify-center">
                <h1 className="text-2xl capitalize">{category}</h1>
              </div>
              {Array.from(categories[category]).map((value) => {
                return (
                  <label>
                    <input className="me-1" type="checkbox" name="" />
                    {value}
                  </label>
                );
              })}
            </div>
          );
        }
      }, categories)}
      <section>
        {/* <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Categories</h1>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          Maika
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          Rukavica
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          Nosok
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          Kepka
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          Obuv
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl ">Price</h1>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          $0-10
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          $10-20
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          $20-50
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          $50-100
        </label>
        <label className="">
          <input className="me-1" type="checkbox" name="" />
          $100-300
        </label>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <h1 className="text-2xl ">Color</h1>
        <div className="grid grid-cols-2 gap-2">
          <label className="">
            <input className="me-1 accent-white" type="checkbox" name="" />
            White
          </label>
          <label className="">
            <input className="me-1 accent-black" type="checkbox" name="" />
            Black
          </label>
          <label className="">
            <input className="me-1 accent-red-600" type="checkbox" name="" />
            Red
          </label>
          <label className="">
            <input className="me-1 accent-yellow-600" type="checkbox" name="" />
            Orange
          </label>
          <label className="">
            <input className="me-1 accent-yellow-400" type="checkbox" name="" />
            Yellow
          </label>
          <label className="">
            <input className="me-1 accent-green-600" type="checkbox" name="" />
            Green
          </label>
          <label className="">
            <input className="me-1 accent-blue-600" type="checkbox" name="" />
            Blue
          </label>
          <label className="">
            <input className="me-1 accent-purple-600" type="checkbox" name="" />
            Purple
          </label>
          <label className="">
            <input className="me-1 accent-pink-600" type="checkbox" name="" />
            Pink
          </label>
        </div>
      </div> */}
      </section>
    </div>
  );
}

export default Filter;
