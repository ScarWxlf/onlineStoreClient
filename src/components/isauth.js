import axios from "axios";

export const Auth = () => {
  //http://ec2-13-53-121-204.eu-north-1.compute.amazonaws.com/api/register or /api/register
  axios
    .get("/")
    .then((response) => {
      console.log(response);
    });
};
