import React, {useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
//import data from "../db/data";

function Item({ id}) {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  useEffect(() => {
    async function axiosTest() {
      const response = await axios.get(`/fakeapi/products/${id}`);
      setImg(response.data.img);
      setTitle(response.data.title);
      setPrice(response.data.price);
      setShortDesc(response.data.shortDesc);
    }
    axiosTest();
  }, [id]);
  return (
    <Card className="!bg-gray-950 w-70 my-2 outline outline-1 outline-gray-50/10 rounded-xl !inline" style={{height: "23rem"}}>
      <CardHeader
        shadow={false}
        floated={false}
        className="!bg-gray-950 h-4/6 m-0 !rounded-b-none"
      >
        <img
          src={img}
          alt="Product"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <div className="flex flex-col justify-end h-2/6">
        <CardBody className="h-4/6">
          <div className="flex items-center justify-between">
            <Typography color="white" className="font-medium ms-4">
              {title}
            </Typography>
            <Typography color="white" className="font-medium me-4">
              ${price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="white"
            className="font-normal break-all mx-3"
          >
            {shortDesc.length > 100
              ? shortDesc.substring(0, 100) + "..."
              : shortDesc}
          </Typography>
        </CardBody>
        <CardFooter className="pt-1 flex justify-center items-center">
          <a className="flex flex-auto justify-center text-white" href={`/${id}/details`}>
            <Button
              ripple={false}
              fullWidth={true}
              className="!py-0.5 text-white bg-sky-950 w-2/7 flex my-2 items-center justify-center hover:bg-sky-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
            >
              Details
            </Button>
          </a>
        </CardFooter>
      </div>
    </Card>
  );
}

export default Item;
