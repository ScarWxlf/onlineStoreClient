import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating, Typography, Button } from "@material-tailwind/react";
import Item from "./item";
import axios from "axios";

function DetailsPage() {
  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [params, setParams] = useState({
    size: [],
    color: [],
    availability: "",
  });
  const [reviews, setReviews] = useState([]);
  const [author, setAuthor] = useState("");
  const [rated, setRated] = useState(null);
  const [color, setColor] = useState(params.color);

  let { id } = useParams();
  const [similar, setSimilar] = useState([]);
  const userID = localStorage.getItem("userID");
  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`/fakeapi/products/${id}`);
      setAuthor(response.data.author);
      setImg(response.data.img);
      setTitle(response.data.title);
      setShortDesc(response.data.shortDesc);
      setLongDesc(response.data.longDesc);
      setPrice(response.data.price);
      setParams(response.data.params);
      setReviews(response.data.reviews);
      setRated(response.data.star);
      setColor(response.data.params.color);

      if (userID) {
        const userResp = await axios.get(
          `/fakeapi/users/${userID}`
        );
        setUser(userResp.data.username);
      }

      let allResponses = [];
      for (let k in response.data.params) {
        if (k === "color" || k === "availability" || k === "size") continue;
        const response2 = await axios.get(
          `/fakeapi/products?params.${k}=${response.data.params[k]}`
        );
        allResponses.push(response2.data);
      }
      let similar = [];
      let ids = new Set();
      allResponses = allResponses.flat();
      for (let j = 0; j < allResponses.length; j++) {
        if (allResponses[j].id !== parseInt(id)) {
          ids.add(allResponses[j].id);
        }
      }
      ids.forEach((id) => {
        similar.push(<Item id={id} />);
      });
      setSimilar(similar);
    }

    axiosTest();
  }, [id, userID]);

  const [reviewRating, setReviewRating] = React.useState(0);
  const currentDate = new Date();

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
      <label
        className={`w-8 h-8 rounded-full input-color border border-black hover:outline-dashed hover:outline-2 hover:outline-white ${
          allColors[color.toLowerCase()]
        }`}
      >
        <input
          type="radio"
          name="color"
          className="color hidden"
          value={color}
        />
      </label>
    );
  } else {
    for (let i = 0; i < color.length; i++) {
      colorButtons.push(
        <label
          className={`w-8 h-8 rounded-full input-color border border-black hover:outline-dashed hover:outline-2 hover:outline-white ${
            allColors[color[i].toLowerCase()]
          }`}
        >
          <input
            type="radio"
            name="color"
            className="color hidden"
            value={color[i]}
          />
        </label>
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
    const size = document.querySelector(".size:checked");
    const color = document.querySelector(".color:checked");
    if (size === null || color === null) {
      let alert = document.getElementById("error-alert");
      alert.classList.remove("hidden");
      setTimeout(() => {
        alert.classList.remove("opacity-0");
      }, 100);
      setTimeout(() => {
        alert.classList.add("opacity-0");
        setTimeout(() => {
          alert.classList.add("hidden");
        }, 700);
      }, 2000);
      return;
    }

    let alert = document.getElementById("succes-alert");
    alert.classList.remove("hidden");
    setTimeout(() => {
      alert.classList.remove("opacity-0");
    }, 100);
    setTimeout(() => {
      alert.classList.add("opacity-0");
      setTimeout(() => {
        alert.classList.add("hidden");
      }, 700);
    }, 2000);

    const data = {
      id: id,
      size: size.value,
      color: color.value,
    };
    const userID = localStorage.getItem("userID");
    async function checkCart() {
      const response = await axios.get(
        `/fakeapi/cart?userID=${userID}`
      );
      if (response.data.length > 0) {
        axios.patch(`/fakeapi/cart/${response.data[0].id}`, {
          products: [...response.data[0].products, data],
        });
      } else {
        axios.post("/fakeapi/cart", {
          userID: userID,
          id: Math.floor(Math.random() * 100000),
          products: [data],
        });
      }
    }
    checkCart();
  };

  useEffect(() => {
    const image = document.getElementById("image");
    const result = document.getElementById("result");
    const lens = document.getElementById("lens");

    result.style.backgroundImage = `url(${img})`;
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
    lens.addEventListener("touchmove", moveLens);

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
  }, [img]);

  const submitReview = () => {
    const comment = document.querySelector(".text-review");
    const name = document.querySelector(".user-name-review");
    const date = document.querySelector(".date-review");
    const newreview = {
      id: Math.floor(Math.random() * 100000000),
      rating: reviewRating,
      comment: comment.value,
      name: name.textContent,
      date: date.textContent,
    };
    const newReviews = [...reviews, newreview];
    let star = 0;
    newReviews.forEach((review) => {
      star += review.rating;
    });
    star /= newReviews.length;
    axios.patch(`/fakeapi/products/${id}`, {
      star: star,
      reviews: newReviews,
    });
    window.location.reload();
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-4 flex flex-col flex-grow">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col w-full md:flex-row -mx-4">
          <div className="w-1/2 px-2 relative">
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
                src={img}
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
                  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold disabled:opacity-70 disabled:bg-gray-700 disabled:hover:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-500"
                  onClick={addToCart}
                  disabled={
                    params.availability === "Out of Stock"
                      ? true
                      : !user
                      ? true
                      : false
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div
              id="succes-alert"
              class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute left-52 bottom-20 transition-opacity ease-in duration-700 opacity-0 hidden animate-bounce"
              role="alert"
            >
              <div class="flex items-center">
                <div class="py-1">
                  <svg
                    class="fill-current h-6 w-6 text-teal-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p class="font-bold">Success</p>
                </div>
              </div>
            </div>
            <div
              id="error-alert"
              role="alert"
              className="absolute left-32 bottom-20 transition-opacity ease-in duration-700 opacity-0 hidden animate-bounce"
            >
              <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Error
              </div>
              <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>You haven't chosen a color or size.</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <div className="flex">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {title}
              </h2>
              {user === author ? (
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
              {shortDesc}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Price:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  {price}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Availability:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {" "}
                  {params.availability}
                </span>
              </div>
            </div>
            {rated ? (
              <div className="flex flex-row items-center gap-2 font-bold text-gray-400 mb-5">
                {rated}
                <Rating
                  className="flex text-yellow-400"
                  value={parseInt(rated)}
                  readonly
                />
                <Typography
                  color="blue-gray"
                  className="font-medium text-gray-400"
                >
                  Based on {reviews.length} Reviews
                </Typography>
              </div>
            ) : (
              ""
            )}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Color:
              </span>
              <div className="flex items-center gap-1 mt-2">{colorButtons}</div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Select Size:
              </span>
              <div className="flex items-center mt-2">
                {Array.from(params.size).map((size) => {
                  return (
                    <label className="input-wrapper dark:bg-gray-600 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-500">
                      {size}
                      <input
                        className="size mx-1 accent-current hidden"
                        style={{ marginTop: "3px" }}
                        type="radio"
                        name="size"
                        value={size}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">
                Product Description:
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 break-words">
                {longDesc}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          <h1 className="text-3xl text-white">Reviews</h1>
          {reviews.length > 0 ? (
            Array.from(reviews).map((review) => {
              return (
                <div className="flex flex-col gap-3 bg-gray-700 p-4 rounded-lg text-white">
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 text-center rounded-full bg-green-700">
                        {review.name[0]}
                      </div>
                      <span>{review.name}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 font-bold text-gray-400">
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
                    {/* <button className="p-1 px-2 bg-gray-600 hover:bg-gray-500 border border-gray-950 bg-opacity-60 rounded-lg">
                      Share
                    </button> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="w-full flex justify-center">
              <p className="text-2xl text-white">No reviews yet</p>
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-3xl mb-2 text-white mt-4">Leave a review</h1>
            <div className="flex flex-col bg-gray-700 p-4 rounded-lg text-white">
              {user ? (
                <>
                  <div className="flex justify justify-between">
                    <div className="flex gap-2">
                      <div className="w-7 h-7 text-center rounded-full bg-green-700">
                        {user ? user[0] : ""}
                      </div>
                      <span className="user-name-review">{user}</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 font-bold text-gray-400 mb-5">
                      <Rating
                        className="flex text-yellow-400 star-review"
                        value={reviewRating}
                        onChange={(value) => {
                          setReviewRating(value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="h-24 mb-5">
                    <textarea
                      className="text-review resize-none text-black px-1 rounded-xl bg-gray-300 h-full w-full"
                      maxLength={400}
                    ></textarea>
                  </div>

                  <div className="flex justify-between">
                    <span className="date-review">{`${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`}</span>
                    <button
                      className="p-1 px-2 bg-gray-600 hover:bg-gray-500 border border-gray-950 bg-opacity-60 rounded-lg"
                      onClick={submitReview}
                    >
                      Submit
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <h1>Log in to leave a review</h1>
                  <a href="/sign-in">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="bg-green-700 lg:inline-block"
                    >
                      <span>Log in</span>
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center mt-5 mx-7 w-9/12">
          <h1 className="text-3xl mb-2 text-white">Similar products</h1>
          <div
            className={`inline-flex overflow-x-scroll snap-mandatory scroll-smooth no-scrollbar gap-2 px-1 bg-gray-600 flex-grow ${
              similar.length >= 4 ? "w-11/12" : "px-2"
            } rounded-lg`}
          >
            {similar.length === 0 ? (
              <div className="flex justify-center w-64 h-10 opacity-70 items-center">
                <p className="text-white text-2xl">No similar products yet</p>
              </div>
            ) : (
              similar.map((item) => {
                return <div className="flex flex-none">{item}</div>;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
