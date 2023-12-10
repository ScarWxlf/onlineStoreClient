import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
//import data from "../db/data";

function Item({ id }) {
  const data = JSON.parse(localStorage.getItem("products"));

  return (
    <Card className="!bg-gray-950 w-70 my-2 outline outline-1 rounded-xl !inline" style={{height: "23rem"}}>
      <CardHeader
        shadow={false}
        floated={false}
        className="!bg-gray-950 h-4/6 m-0"
      >
        <img
          src={data[id - 1].img}
          alt="Product"
          className="h-full w-full object-cover rounded-lg rounded-b-none"
        />
      </CardHeader>
      <div className="flex flex-col justify-end h-2/6">
        <CardBody className="h-4/6">
          <div className="flex items-center justify-between">
            <Typography color="white" className="font-medium ms-4">
              {data[id - 1].title}
            </Typography>
            <Typography color="white" className="font-medium me-4">
              ${data[id - 1].price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="white"
            className="font-normal opacity-75 break-all mx-3"
          >
            {data[id - 1].shortDesc.length > 100
              ? data[id - 1].shortDesc.substring(0, 100) + "..."
              : data[id - 1].shortDesc}
          </Typography>
        </CardBody>
        <CardFooter className="pt-1 flex justify-center items-center">
          <a className="flex flex-auto justify-center" href={`/${id}/details`}>
            <Button
              ripple={false}
              fullWidth={true}
              className="bg-gray-700 w-2/5 flex my-2 items-center justify-center opacity-75 hover:opacity-100 text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
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
