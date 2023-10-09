'use client'
import Image from 'next/image';
import { useState } from 'react';
import { IImages } from '../interfaces/CarouselImageInterface';


export const Carousel = ({image_one,image_two,image_three}: IImages)=>{
    const [imageUrl, setImageUrl] = useState(image_one)

    return(
        <div className="relative w-full h-full">
            <Image
                className="object-cover w-full h-full marker:rounded-t-lg md:rounded-none md:rounded-l-lg"
                src={imageUrl}
                alt={imageUrl}
                width={300}
                height={500}
            />
            <div className="w-full h-1/4 absolute top-0 left-0 flex justify-center items-center gap-2 pt-2">
                <Image
                    className="object-cover w-[30%] h-full"
                    src={image_one}
                    alt={image_one}
                    width={300}
                    height={500}
                    onClick={()=> setImageUrl(image_one)}
                />
                <Image
                    className="object-cover w-[30%] h-full"
                    src={image_two}
                    alt={image_two}
                    width={300}
                    height={500}
                    onClick={()=> setImageUrl(image_two)}
                />
                <Image
                    className="object-cover w-[30%] h-full"
                    src={image_three}
                    alt={image_three}
                    width={300}
                    height={500}
                    onClick={()=> setImageUrl(image_three)}
                />
            </div>
        </div>
         

           

    )
}