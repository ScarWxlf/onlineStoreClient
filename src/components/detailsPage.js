import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating, Typography } from "@material-tailwind/react";
//import data from "../db/data";
import Item from "./item";

function DetailsPage() {
  const data = JSON.parse(localStorage.getItem("products"));

  const user = localStorage.getItem("user");
  const [rated, setRated] = React.useState(4);
  let { id } = useParams();
  const [color] = React.useState(data[id - 1].params.color);
  let colorButtons = [];
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

  if (typeof color === "string") {
    colorButtons.push(
      <button
        className={`w-6 h-6 rounded-full border border-black ${
          allColors[color.toLowerCase()]
        } mr-2`}
      ></button>
    );
  } else {
    for (let i = 0; i < color.length; i++) {
      colorButtons.push(
        <button
          className={`w-6 h-6 rounded-full border border-black ${
            allColors[color[i].toLowerCase()]
          } mr-2`}
        ></button>
      );
    }
  }

  const [hid, setHid] = React.useState(true);
  const divVis = () => {
    setHid(false);
  };
  const divInvis = () => {
    setHid(true);
  };

  const addToCart = () => {
    let items = JSON.parse(localStorage.getItem("cart"));
    if (items === null) {
      localStorage.setItem("cart", JSON.stringify(id));
    } else {
      if (items === "") {
        localStorage.setItem("cart", JSON.stringify(id));
      } else {
        localStorage.setItem("cart", JSON.stringify(id + " " + items));
      }
    }
  };

  function getSimilar() {
    let similar = [];
    let ids = new Set();
    for (let i = 0; i < data.length; i++) {
      for (let k in data[i].params) {
        if (k === "color" || k === "availability") continue;
        if (
          data[i].params[k] === data[id - 1].params[k] &&
          data[i].id !== parseInt(id)
        ) {
          ids.add(data[i].id);
        }
      }
    }
    ids.forEach((id) => {
      similar.push(<Item id={id} />);
    });
    return similar;
  }
  let similar = getSimilar(); 

  useEffect(() => {
    const image = document.getElementById("image");
    const result = document.getElementById("result");
    const lens = document.getElementById("lens");
    // let zoom = 3;

    result.style.backgroundImage = `url(${image.src})`;
    // let bw=3;
    let cx = result.offsetWidth / lens.offsetWidth;
    let cy = result.offsetHeight / lens.offsetHeight;
    //240 180 1.875
    result.style.backgroundSize =
      image.width * cx + "px " + image.height * cy + "px";

    result.addEventListener("mousemove", moveLens);
    image.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);
    /*and also for touch screens:*/
    result.addEventListener("touchmove", moveLens);
    image.addEventListener("touchmove", moveLens);

    function moveLens(e) {
      let pos, x, y;
      e.preventDefault();
      pos = imageSee(e);
      x = pos.x - lens.offsetWidth / 2;
      y = pos.y - lens.offsetHeight / 2;
      /*prevent the magnifier glass from being positioned outside the image:*/
      if (x > image.width - lens.offsetWidth) {
        x = image.width - lens.offsetWidth;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > image.height - lens.offsetHeight) {
        y = image.height - lens.offsetHeight;
      }
      if (y < 0) {
        y = 0;
      }
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
    }

    function imageSee(e) {
      const bb = image.getBoundingClientRect();
      let x = e.pageX - bb.left;
      let y = e.pageY - bb.top;
      x = x - window.scrollX;
      y = y - window.scrollY;

      return { x: x, y: y };
    }
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-4 flex flex-col flex-grow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col w-full md:flex-row -mx-4">
          <div className="w-1/2 px-4">
            <div className="relative h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 w-full">
              <div
                id="lens"
                className={`absolute border cursor-none bg-red-700 opacity-40 rounded-lg w-32 h-32 ${
                  hid ? "collapse" : ""
                }`}
                onMouseOut={divInvis}
              ></div>
              <img
                id="image"
                className="w-full h-full rounded-lg"
                src={data[id - 1].img}
                alt="Product"
                onMouseEnter={divVis}
              />
              <div
                id="result"
                className={`bg-black h-60 w-60 rounded-lg -ms-96 top-100 md:ms-10 md:top-0 absolute ${
                  hid ? "collapse" : ""
                }`}
                style={{ left: "32rem" }}
              ></div>
            </div>
            <div className="flex -mx-2 mb-4 justify-center">
              <div className="w-1/2 px-2">
                <button
                  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={addToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-4">
            <div className="flex">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {data[id - 1].title}
              </h2>
              {user === data[id - 1].author ? (
                <div className="w-3/5 flex justify-end items-center">
                  <a href={`/${id}/details/edit`}>
                    <button className="bg-orange-500 rounded-full px-4 h-6">
                      Edit
                    </button>
                  </a>
                </div>
              ) : (
                ""
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 break-words">
              {data[id - 1].shortDesc}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  {data[id - 1].price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  {data[id - 1].params.availability}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 font-bold text-gray-400 mb-5">
              {rated}.0
              <Rating
                className="flex text-yellow-400"
                value={4}
                onChange={(value) => setRated(value)}
              />
              <Typography
                color="blue-gray"
                className="font-medium text-gray-400"
              >
                Based on 134 Reviews
              </Typography>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Color:
              </span>
              <div className="flex items-center mt-2">{colorButtons}</div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Size:
              </span>
              <div className="flex items-center mt-2">
                {Array.from(data[id - 1].params.size).map((size) => {
                  return( 
                  <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                    {size}
                  </button>
                  );
                })}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 break-words">
                {data[id - 1].longDesc}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-14">
          {Array.from(data[id - 1].reviews).map((review) => {
            return (
              <div className="flex flex-col gap-4 bg-gray-700 p-4 rounded-lg text-white">
                <div className="flex justify justify-between">
                  <div className="flex gap-2">
                    <div className="w-7 h-7 text-center rounded-full bg-green-700">
                      {review.name[0]}
                    </div>
                    <span>{review.name}</span>
                  </div>
                  <div className="flex flex-row items-center gap-2 font-bold text-gray-400 mb-5">
                    <Rating
                      className="flex text-yellow-400"
                      value={review.rating}
                      readonly
                    />
                  </div>
                </div>

                <div>{review.comment}</div>

                <div className="flex justify-between">
                  <span>{review.date}</span>
                  <button className="p-1 px-2 bg-gray-600 hover:bg-gray-500 border border-gray-950 bg-opacity-60 rounded-lg">
                    Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center mt-5 mx-7">
        <h1 className="text-3xl mb-2 text-white">Similar products</h1>
        <div className={`inline-flex overflow-x-scroll snap-mandatory scroll-smooth no-scrollbar gap-2 bg-gray-600 flex-grow ${similar.length>=6 ? "w-full" : "px-2"} rounded-lg`}>
          { similar.length >=6 ? (
            <div
            className="relative bg-gray-900 text-white w-full text-4xl flex items-center justify-center pr-2"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {"scrcll"}
            <div className="absolute ml-7 mt-12" style={{ paddingTop: "4px" }}>
              {">"}
            </div>
          </div>):("")}
          {similar.map((item) => {
            return <div className="flex flex-none">{item}</div>;
          })}
          {similar.length >=6 ? (
          <div
            className="relative bg-gray-900 text-white w-full pr-1 text-4xl flex items-center justify-center pl-2"
            style={{ writingMode: "vertical-lr", textOrientation: "upright" }}
          >
            {"scr ll"}
            <div className="absolute mr-7 mt-12" style={{ paddingTop: "4px" }}>
              {"<"}
            </div>
            <div className="absolute mt-16 pb-2 rotate-180">{"c"}</div>
          </div>):("")}
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
