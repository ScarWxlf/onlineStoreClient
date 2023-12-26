import React, { useState, useEffect } from "react";
import {
  Button
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";
import "./style.css";
import axios from "axios";

function ProfileElem() {
  const navigate = useNavigate();
  //const profile = JSON.parse(localStorage.getItem("profile"));
  const userID = JSON.parse(localStorage.getItem("userID"));
  const [img, setImg] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    async function axiosTest() {
      if(userID === null){
        navigate("/sign-in");
        return;
      }
      const response = await axios.get(`/fakeapi/users/${userID}`);
      setImg(response.data.img);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setNumber(response.data.phonenumber);
    }

    axiosTest();
  }, [userID, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      img: img || null,
      username: username,
      email: email,
      phonenumber: number,
    };
    if(e.target[3].files[0] === undefined){
      axios
      .patch(
        `/fakeapi/users/${userID}`, userData
      )
      .then((response) => {
        console.log(response.data);
        
      });
    }
    else{
    const image = new FileReader();
    image.readAsDataURL(e.target[3].files[0]);
    image.addEventListener("load",() => {
      userData.img = image.result;
      axios
      .patch(
        `/fakeapi/users/${userID}`, userData
      )
      .then((response) => {
        console.log(response.data);
        
      });
    })}
    alert("Changes saved");
    window.location.reload();
  }

  const LogOut = () => {
    localStorage.removeItem("userID");
    navigate("/");
    window.location.reload();
  }

  return (
    <div className="flex flex-grow justify-center bg-gray-950">
      {/* <div className="bg-gray-400 flex justify-center items-center h-20 ">
        Something
      </div> */}
      <div className="container flex flex-wrap flex-col text-gray-200 gap-3 items-center mt-8  mx-2">
        {!img ? (<div className="h-32 w-32 bg-gray-500 rounded-full flex justify-center items-center">Your image</div>) : (
        <img
          src={img}
          class="w-32 h-32 rounded-full shadow-lg object-cover"
          alt="Avatar"
        />)
        }
        <a href="order-history">
        <button className="h-8 w-32 bg-blue-800 rounded-lg hover:bg-blue-700">Order history</button>
        </a>
        <h1 className="mb-1 text-3xl">Profile info</h1>
        <form className="flex flex-col items-center gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 text-lg me-20">
            <div className="flex flex-col gap-4 items-end mr-3">
              <div>Username</div>
              <div>Email</div>
              <div>Phone number</div>
            </div>
            <div className="flex flex-col gap-4">
              <input
                className="px-1 rounded-lg text-black"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="px-1 rounded-lg text-black"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="px-1 rounded-lg text-black"
                type="text"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          </div>
          <div>
            <p className="ms-2 mb-1">Input new image (JPG, PNG)</p>
            <div className="bg-gray-700 p-1 rounded-lg">
              <input
                onChange={(e) => {setImg(URL.createObjectURL(e.target.files[0]))}}
                type="file"
                className="text-sm rounded-lg text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
              />
            </div>
          </div>
          <button
            className="border w-1/3 border-gray-500 bg-blue-800 rounded-lg py-1 duration-300 hover:bg-blue-700 hover:text-white hover:outline-2"
            type="submit"
          >
            Save changes
          </button>
        </form>
        <Button
                variant="gradient"
                size="sm"
                className=" bg-red-700 lg:inline-block"
                onClick={LogOut}
              >
                <span>Log out</span>
              </Button>
      </div>
    </div>
  );
}

export default ProfileElem;
