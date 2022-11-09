// interface IProduct {
//     id: number;
//     fullname: string;
//     email: string;
//     gender: string;
//     phone: string;
//     address: string;
//     products: [ {
//         name: string;
//         image: number;
//         brand: string;
//         category: string;
//         description: string;
//         price: number;
//         countInStock: number;
//         rating: number;
//         numReviews: number;
// }];
// }

interface IProduct {
    id: number;
    name: string;
    image: number;
    brand: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

interface InewProduct {
    id: number;
    name: string;
    image: number;
    brand: string;
    category: string;
    description: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

interface IupdateProduct {
    id: number;
    name?: string;
    image?: number;
    brand?: string;
    category?: string;
    description?: string;
    price?: number;
    countInStock?: number;
    rating?: number;
    numReviews?: number;
}

// interface IProduct extends InewProduct {
//     _id: string;
// }

interface IProductReview {
    name: string;
    rating: number;
    comment: string;
}


interface Iuser{
    id: string,
    fullname: string,
    email: string,
    password: string
    gender: string,
    phone: string,
    address: string,
  }

  declare namespace Express {
    interface Request {
      user?: Iuser;
    }
  }