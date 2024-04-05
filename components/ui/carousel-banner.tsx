import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { CardDescription, CardHeader, CardTitle } from "./card";
import { InfoIcon } from "lucide-react";
import Link from "next/link";

export const CarouselBanner = () => {
  const plugin = useRef(Autoplay({ delay: 5000 }));
  const images = [
    "https://images.unsplash.com/photo-1620138546344-7b2c38516edf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1515355758951-b4b20ba84c1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1428790067070-0ebf4418d9d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1609692814858-f7cd2f0afa4f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full px-6"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div
              className={`flex flex-col items-center ${
                index % 2 == 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse md:text-right"
              }`}
            >
              <div className="w-full py-2 md:py-0">
                <CardHeader className="p-0">
                  <CardTitle className="md:text-5xl tracking-wide">
                    EXTERNALWEAR
                  </CardTitle>
                  <CardDescription>
                    Shop • street wear • tech • accessories
                  </CardDescription>
                </CardHeader>
              </div>
              <div className="relative w-full md:w-[384px] h-[350px] ">
                <Image
                  src={image}
                  alt="image"
                  className="w-full h-[350px] object-cover break-inside-avoid"
                  width={500}
                  height={500}
                />
                <Link
                  href={image}
                  target="_blank"
                  title="image source"
                  className="flex items-center absolute bottom-0 left-0 p-2 group z-10"
                >
                  <InfoIcon className="peer text-white" />
                  <span className="invisible peer-hover:visible pl-2 text-xs">
                    images.unsplash.com
                  </span>
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
