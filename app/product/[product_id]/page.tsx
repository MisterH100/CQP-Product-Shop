import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search } from "@/components/ui/search_field";
import exampleImage from "@/public/men.jpg";
import Image from "next/image";

const ProductPage = ({
  params: { product_id },
}: {
  params: { product_id: string };
}) => {
  return (
    <section className="min-h-screen px-4 md:px-10">
      <div className="py-6">
        <Search />
      </div>
      <div className="flex justify-center mt-4">
        <Card className="md:w-2/3 overflow-hidden">
          <Image
            src={exampleImage}
            alt="men.jpg"
            className="w-full h-[500px] object-cover"
            width={736}
            height={981}
          />
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>product {product_id}</CardTitle>
              <CardTitle>R200</CardTitle>
            </div>
            <CardDescription>item description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
              enim provident tempora ea voluptatum! Numquam ae?
            </p>
          </CardContent>
          <CardFooter>
            <Button className="ml-auto" variant="secondary">
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};

export default ProductPage;
