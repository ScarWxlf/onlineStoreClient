import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
 
function Item({img}) {
  return (
    <Card className="w-70 my-2 outline outline-1 rounded-lg">
      <CardHeader shadow={false} floated={false} className="h-60 m-0">
        <img
          src={img}
          alt="Product"
          className="h-full w-full object-cover rounded-lg rounded-b-none"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium ms-4">
            Merch
          </Typography>
          <Typography color="blue-gray" className="font-medium me-4">
            $100.00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 break-all mx-3"
        >
          Description Description Description Description Description Description Description Description Description Description
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex justify-center items-center">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-gray-500 w-2/5 h-1/2 flex items-center justify-center opacity-75 hover:opacity-100 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Details
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Item;