import React from "react";
import "./style.css";

function ProfileElem() {
  return (
    <div className="bg-green-950">
      <div className="bg-gray-400 flex justify-center items-center h-20 ">
        Something
      </div>
      <div className="flex">
        <div className="bg-red-900 container flex justify-center items-start w-96">
          Side bar
        </div>
        <div className="bg-orange-900 container flex flex-wrap flex-col gap-3 items-center mx-2 h-screen">
          <h1 className="text-3xl">Profile info</h1>
            <form className="flex flex-col gap-3 text-lg">
              <div className="flex flex-col">
                Username:
              <input className="px-1 rounded-lg" type='text'/>
              </div>
            <div className="flex flex-col">
              Email:
              <input className="px-1 rounded-lg" type='text'/>
            </div>
            <div className="flex flex-col">
              Phone number:
              <input className="px-1 rounded-lg" type='text'/>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileElem;
