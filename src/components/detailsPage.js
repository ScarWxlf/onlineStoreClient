import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating, Typography } from "@material-tailwind/react";
import data from "../db/data";

function DetailsPage() {
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
    <div className="bg-gray-100 dark:bg-gray-800 py-4 flex flex-grow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="relative h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <div
                id="lens"
                className={`absolute border cursor-none bg-red-700 opacity-40 rounded-lg w-32 h-32 ${hid ? "collapse" : ""}`}
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
                className={`bg-black h-60 w-60 rounded-lg ms-10 top-0 absolute ${
                  hid ? "collapse" : ""
                }`}
                style={{ left: "32rem" }}
              ></div>
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {data[id - 1].title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
              ante justo. Integer euismod libero id mauris malesuada tincidunt.
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
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  S
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  M
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  L
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  XL
                </button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">
                  XXL
                </button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                ante justo. Integer euismod libero id mauris malesuada
                tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis
                dapibus augue vel ipsum pretium, et venenatis sem blandit.
                Quisque ut erat vitae nisi ultrices placerat non eget velit.
                Integer ornare mi sed ipsum lacinia, non sagittis mauris
                blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt
                mi consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
