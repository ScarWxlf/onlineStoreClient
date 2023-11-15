import React from "react"; 
import "./style.css"
import Item from "./item";
//import { Auth } from "./isauth";

function Body(){
    //console.log(Auth());
    let ss = [];
    for(let i=0;i<20;i++){
        ss.push(`https://picsum.photos/1100/${1200-i}`)
    }
    const items = [];
    for (let i=0;i<20;i++){
        items.push(<Item img={ss[i]}/>)
    }
    return(
        <div className="bg-red-950 text-white">
            <div className="bg-gray-400 flex justify-center items-center h-20 ">Something</div>
            <div className="flex">
                <div className="bg-red-900 container flex justify-center items-start w-96">
                    <div className="mt-10">Filters</div>
                </div>
                <div className="container grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 mx-2 break-words">
                    {items}
                </div>
            </div>
        </div>
    )
}

export default Body;