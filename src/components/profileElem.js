import React from "react";
import "./style.css";

function ProfileElem() {
  return (
    <div className="flex flex-grow bg-gray-950">
      {/* <div className="bg-gray-400 flex justify-center items-center h-20 ">
        Something
      </div> */}
      <div className="container flex flex-wrap flex-col text-gray-200 gap-3 items-center mt-8  mx-2">
        <img
          src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
          class="w-32 rounded-full shadow-lg"
          alt="Avatar"
        />
        <h1 className=" mt-3 mb-1 text-3xl">Profile info</h1>
        <form className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-2 text-lg me-20">
            <div className="flex flex-col gap-4 items-end mr-3">
              <div>Username</div>
              <div>Email</div>
              <div>Phone number</div>
            </div>
            <div className="flex flex-col gap-4">
              <input className="px-1 rounded-lg text-black" type="text" />
              <input className="px-1 rounded-lg text-black" type="text" />
              <input className="px-1 rounded-lg text-black" type="text" />
            </div>
          </div>
          <div>
            <p className="ms-2 mb-1">Input new image (JPG, PNG)</p>
            <div className="bg-gray-700 p-1 rounded-lg">
              <input
                type="file"
                className="text-sm rounded-lg text-stone-500 file:mr-5 file:py-1 file:px-3 file:border-[1px] file:text-xs file:font-medium file:bg-stone-50 file:text-stone-700 hover:file:cursor-pointer hover:file:bg-blue-50 hover:file:text-blue-700"
              />
            </div>
          </div>
          <button
            className="border w-1/3 border-gray-500 rounded-lg py-1 duration-300 hover:bg-gray-900 hover:text-white hover:outline-2"
            type="submit"
          >
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileElem;
