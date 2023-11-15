import React from "react";

function CategoryFilter(){
    return(
        <div className="grid grid-cols-1 gap-2 justify-center items-center  pe-5 mt-3">
            <h1 className="text-2xl ">Categories</h1>
            <label className="ms-5">
                <input className="me-1" type="radio" name=""/>Maika
            </label>
            <label className="ms-5">
                <input className="me-1" type="radio" name=""/>Rukavica
            </label>
            <label className="ms-5">
                <input className="me-1" type="radio" name=""/>Nosok
            </label>
            <label className="ms-5">
                <input className="me-1" type="radio" name=""/>Kepka
            </label>
            <label className="ms-5">
                <input className="me-1" type="radio" name=""/>Obuv
            </label>
        </div>
    );
}

export default CategoryFilter;