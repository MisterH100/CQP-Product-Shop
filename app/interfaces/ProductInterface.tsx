interface IProductImages{
    data: any;
    image_url: string;
    contentType: string;
}

export interface IProducts{
    _id: number;
    name: string;
    brand: string;
    description: string;
    price: number;
    quantity: number;
    category: [string];
    gender: string;
    type: string;
    footsize: [];
    clothingsize: [];
    productImages: {
        image_one: IProductImages,
        image_two:IProductImages,
        image_three:IProductImages,
    };
    createdAt: Date;
}
  