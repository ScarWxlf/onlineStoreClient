import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import data from "../db/data";

function Item({id}) {
  return (
    <Card className="!bg-gray-950 w-70 my-2 outline outline-1 rounded-xl">
      <CardHeader shadow={false} floated={false} className=" !bg-gray-950 h-60 m-0">
        <img
          src={data[id-1].img}
          alt="Product"
          className="h-full w-full object-cover rounded-lg rounded-b-none"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="white" className="font-medium ms-4">
            {data[id-1].title}
          </Typography>
          <Typography color="white" className="font-medium me-4">
            ${data[id-1].price}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="white"
          className="font-normal opacity-75 break-all mx-3"
        >
          Description Description Description Description Description
          Description Description Description Description Description
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-center items-center">
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
    </Card>
  );
}

export default Item;
