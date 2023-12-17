import axios from "axios";

export const Auth = () => {
  //http://ec2-13-53-121-204.eu-north-1.compute.amazonaws.com/api/register or /api/register
  return axios
    .get("http://ec2-13-53-121-204.eu-north-1.compute.amazonaws.com/api/check-auth")
    .then((response) => {
      return response.data; // Return the response data
    });
};