import React from "react";

import Login from "../components/log-in";
import Navbar from "../components/navbar";

function LoginPage(){
    return(
        <div>
            <Navbar/>
            <Login/>
        </div>
    );
}

export default LoginPage;