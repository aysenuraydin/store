import { Product } from "../models/product";

export class ProductRepository {
  private products: Product[];

  constructor() {
      this.products = new Array<Product>(
          {
            id:1,
            name: 'Earthen Bottle 1',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 1,

            viewCount:1
          },
          {
            id:2,
            name: 'Earthen Bottle 2',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 2,

            viewCount:2
          },
          {
            id:3,
            name: 'Earthen Bottle 3',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 3,

            viewCount:3
          },
          {
            id:4,
            name: 'Earthen Bottle 4',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 4,

            viewCount:4
          },
          {
            id:5,
            name: 'Earthen Bottle 5',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 5,

            viewCount:0
          },
          {
            id:6,
            name: 'Earthen Bottle 6',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 6,

            viewCount:0
          },
          {
            id:7,
            name: 'Earthen Bottle 7',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 7,

            viewCount:0
          },
          {
            id:8,
            name: 'Earthen Bottle 8',
            price: 48.80,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 8,

            viewCount:0
          },
          {
            id:9,
            name: 'Earthen Bottle 9',
            price: 48.90,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 9,

            viewCount:0
          },
          {
            id:10,
            name: 'Earthen Bottle 10',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 10,

            viewCount:0
          },
          {
            id:11,
            name: 'Earthen Bottle 11',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 11,

            viewCount:0
          },
          {
            id:12,
            name: 'Earthen Bottle 12',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 12,

            viewCount:0
          },
          {
            id:13,
            name: 'Earthen Bottle 13',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 13,

            viewCount:0
          },
          {
            id:14,
            name: 'Earthen Bottle 14',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 14,

            viewCount:0
          },
          {
            id:15,
            name: 'Earthen Bottle 15',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 15,

            viewCount:0
          },
          {
            id:16,
            name: 'Earthen Bottle 16',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 16,

            viewCount:0
          },

          {
            id:17,
            name: 'Earthen Bottle 17',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:`lorem`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 17,

            viewCount:0
          },
          {
            id:18,
            name: 'Earthen Bottle 18',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:` The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 18,

            viewCount:0
          },
          {
            id:1,
            name: 'Earthen Bottle 1',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 1,

            viewCount:1
          },
          {
            id:2,
            name: 'Earthen Bottle 2',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 2,

            viewCount:2
          },
          {
            id:3,
            name: 'Earthen Bottle 3',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 3,

            viewCount:3
          },
          {
            id:4,
            name: 'Earthen Bottle 4',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 4,

            viewCount:4
          },
          {
            id:5,
            name: 'Earthen Bottle 5',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 5,

            viewCount:0
          },
          {
            id:6,
            name: 'Earthen Bottle 6',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 6,

            viewCount:0
          },
          {
            id:7,
            name: 'Earthen Bottle 7',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 7,

            viewCount:0
          },
          {
            id:8,
            name: 'Earthen Bottle 8',
            price: 48.80,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 8,

            viewCount:0
          },
          {
            id:9,
            name: 'Earthen Bottle 9',
            price: 48.90,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 9,

            viewCount:0
          },
          {
            id:10,
            name: 'Earthen Bottle 10',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 10,

            viewCount:0
          },
          {
            id:11,
            name: 'Earthen Bottle 11',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 11,

            viewCount:0
          },
          {
            id:12,
            name: 'Earthen Bottle 12',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 12,

            viewCount:0
          },
          {
            id:13,
            name: 'Earthen Bottle 13',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 13,

            viewCount:0
          },
          {
            id:14,
            name: 'Earthen Bottle 14',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 14,

            viewCount:0
          },
          {
            id:15,
            name: 'Earthen Bottle 15',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 15,

            viewCount:0
          },
          {
            id:16,
            name: 'Earthen Bottle 16',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 16,

            viewCount:0
          },

          {
            id:17,
            name: 'Earthen Bottle 17',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:`lorem`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 17,

            viewCount:0
          },
          {
            id:18,
            name: 'Earthen Bottle 18',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:` The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 18,

            viewCount:0
          },
          {
            id:1,
            name: 'Earthen Bottle 1',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 1,

            viewCount:1
          },
          {
            id:2,
            name: 'Earthen Bottle 2',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 2,

            viewCount:2
          },
          {
            id:3,
            name: 'Earthen Bottle 3',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 3,

            viewCount:3
          },
          {
            id:4,
            name: 'Earthen Bottle 4',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 4,

            viewCount:4
          },
          {
            id:5,
            name: 'Earthen Bottle 5',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 5,

            viewCount:0
          },
          {
            id:6,
            name: 'Earthen Bottle 6',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 6,

            viewCount:0
          },
          {
            id:7,
            name: 'Earthen Bottle 7',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 7,

            viewCount:0
          },
          {
            id:8,
            name: 'Earthen Bottle 8',
            price: 48.80,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 8,

            viewCount:0
          },
          {
            id:9,
            name: 'Earthen Bottle 9',
            price: 48.90,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 9,

            viewCount:0
          },
          {
            id:10,
            name: 'Earthen Bottle 10',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 10,

            viewCount:0
          },
          {
            id:11,
            name: 'Earthen Bottle 11',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 11,

            viewCount:0
          },
          {
            id:12,
            name: 'Earthen Bottle 12',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 12,

            viewCount:0
          },
          {
            id:13,
            name: 'Earthen Bottle 13',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 13,

            viewCount:0
          },
          {
            id:14,
            name: 'Earthen Bottle 14',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 14,

            viewCount:0
          },
          {
            id:15,
            name: 'Earthen Bottle 15',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 15,

            viewCount:0
          },
          {
            id:16,
            name: 'Earthen Bottle 16',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 16,

            viewCount:0
          },

          {
            id:17,
            name: 'Earthen Bottle 17',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:`lorem`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 17,

            viewCount:0
          },
          {
            id:18,
            name: 'Earthen Bottle 18',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:` The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 18,

            viewCount:0
          },
          {
            id:1,
            name: 'Earthen Bottle 1',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 1,

            viewCount:1
          },
          {
            id:2,
            name: 'Earthen Bottle 2',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 2,

            viewCount:2
          },
          {
            id:3,
            name: 'Earthen Bottle 3',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 3,

            viewCount:3
          },
          {
            id:4,
            name: 'Earthen Bottle 4',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 4,

            viewCount:4
          },
          {
            id:5,
            name: 'Earthen Bottle 5',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 5,

            viewCount:0
          },
          {
            id:6,
            name: 'Earthen Bottle 6',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 6,

            viewCount:0
          },
          {
            id:7,
            name: 'Earthen Bottle 7',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 7,

            viewCount:0
          },
          {
            id:8,
            name: 'Earthen Bottle 8',
            price: 48.80,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 8,

            viewCount:0
          },
          {
            id:9,
            name: 'Earthen Bottle 9',
            price: 48.90,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 9,

            viewCount:0
          },
          {
            id:10,
            name: 'Earthen Bottle 10',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 10,

            viewCount:0
          },
          {
            id:11,
            name: 'Earthen Bottle 11',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 11,

            viewCount:0
          },
          {
            id:12,
            name: 'Earthen Bottle 12',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 12,

            viewCount:0
          },
          {
            id:13,
            name: 'Earthen Bottle 13',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 13,

            viewCount:0
          },
          {
            id:14,
            name: 'Earthen Bottle 14',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 14,

            viewCount:0
          },
          {
            id:15,
            name: 'Earthen Bottle 15',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 15,

            viewCount:0
          },
          {
            id:16,
            name: 'Earthen Bottle 16',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 16,

            viewCount:0
          },

          {
            id:17,
            name: 'Earthen Bottle 17',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:`lorem`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 17,

            viewCount:0
          },
          {
            id:18,
            name: 'Earthen Bottle 18',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:` The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 18,

            viewCount:0
          },
          {
            id:1,
            name: 'Earthen Bottle 1',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 1,

            viewCount:1
          },
          {
            id:2,
            name: 'Earthen Bottle 2',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 2,

            viewCount:2
          },
          {
            id:3,
            name: 'Earthen Bottle 3',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 3,

            viewCount:3
          },
          {
            id:4,
            name: 'Earthen Bottle 4',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 4,

            viewCount:4
          },
          {
            id:5,
            name: 'Earthen Bottle 5',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 5,

            viewCount:0
          },
          {
            id:6,
            name: 'Earthen Bottle 6',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 6,

            viewCount:0
          },
          {
            id:7,
            name: 'Earthen Bottle 7',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 7,

            viewCount:0
          },
          {
            id:8,
            name: 'Earthen Bottle 8',
            price: 48.80,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 8,

            viewCount:0
          },
          {
            id:9,
            name: 'Earthen Bottle 9',
            price: 48.90,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:'lorem',
            categoryId:1,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 9,

            viewCount:0
          },
          {
            id:10,
            name: 'Earthen Bottle 10',
            price: 48.10,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:'lorem',
            categoryId:2,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 10,

            viewCount:0
          },
          {
            id:11,
            name: 'Earthen Bottle 11',
            price: 48.20,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-03.jpg',
            description:'lorem',
            categoryId:3,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 11,

            viewCount:0
          },
          {
            id:12,
            name: 'Earthen Bottle 12',
            price: 48.30,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-04.jpg',
            description:'lorem',
            categoryId:4,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 12,

            viewCount:0
          },
          {
            id:13,
            name: 'Earthen Bottle 13',
            price: 48.40,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-05.jpg',
            description:'lorem',
            categoryId:5,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 13,

            viewCount:0
          },
          {
            id:14,
            name: 'Earthen Bottle 14',
            price: 48.50,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-06.jpg',
            description:'lorem',
            categoryId:6,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 14,

            viewCount:0
          },
          {
            id:15,
            name: 'Earthen Bottle 15',
            price: 48.60,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-07.jpg',
            description:'lorem',
            categoryId:7,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 15,

            viewCount:0
          },
          {
            id:16,
            name: 'Earthen Bottle 16',
            price: 48.70,
            imgUrl:'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-08.jpg',
            description:'lorem',
            categoryId:8,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 16,

            viewCount:0
          },

          {
            id:17,
            name: 'Earthen Bottle 17',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-01.jpg',
            description:`lorem`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: false,
            details:'lorem 18',
            stockAmount: 17,

            viewCount:0
          },
          {
            id:18,
            name: 'Earthen Bottle 18',
            price: 48.10,
            imgUrl: 'https://tailwindui.com/plus/img/ecommerce-images/category-page-04-image-card-02.jpg',
            description:` The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.`,
            categoryId:0,
            createdAt:new Date(),
            isConfirmed: true,
            details:'lorem 18',
            stockAmount: 18,

            viewCount:0
          },
      );
  }
  getProducts(): Product[] {
    return this.products;
}
}
