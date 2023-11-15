import axios from "axios";

export const LogOut = () => {
  //http://ec2-13-53-121-204.eu-north-1.compute.amazonaws.com/api/register or /api/register
  axios
    .post("/api/logout")
    .then((response) => {
      console.log(response.data);
    });
};
