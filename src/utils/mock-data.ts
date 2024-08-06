import { Product } from "../types/types"


export const mockProduct: Product = {
    "id": 1,
    "title": "Test Product",
    "description": "Description of the test product.",
    "category": "beauty",
    "price": 9.99,
    "discountPercentage": 7.17,
    "rating": 4.94,
    "stock": 5,
    "tags": [
      "beauty",
      "mascara"
    ],
    "brand": "Test Brand",
    "sku": "RCH45Q1A",
    "weight": 2,
    "dimensions": {
      "width": 23.17,
      "height": 14.43,
      "depth": 28.01
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 month",
    "availabilityStatus": "Low Stock",
    "reviews": [
      {
        "rating": 2,
        "comment": "Very unhappy with my purchase!",
        "date": new Date("2024-05-23T08:56:21.618Z"),
        "reviewerName": "John Doe",
        "reviewerEmail": "john.doe@x.dummyjson.com"
      },
      {
        "rating": 2,
        "comment": "Not as described!",
        "date": new Date("2024-05-23T08:56:21.618Z"),
        "reviewerName": "Nolan Gonzalez",
        "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
      },
      {
        "rating": 5,
        "comment": "Very satisfied!",
        "date": new Date("2024-05-23T08:56:21.618Z"),
        "reviewerName": "Scarlett Wright",
        "reviewerEmail": "scarlett.wright@x.dummyjson.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 24,
    "meta": {
      "createdAt": new Date('2024-05-23T08:56:21.618Z'),
      "updatedAt": new Date("2024-05-23T08:56:21.618Z"),
      "barcode": "9164035109868",
      "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    },
    "thumbnail": "thumbnail.png",
    "images": ['image1.png', 'image2.png', 'image3.png']
  }

  export const mockProduct2: Product = {
    "id": 2,
    "title": "Second Test Product",
    "description": "Second product description text",
    "category": "mens-shirts",
    "price": 24.99,
    "discountPercentage": 12.6,
    "rating": 4.95,
    "stock": 64,
    "tags": [
      "clothing",
      "men's t-shirts"
    ],
    "brand": "New Test Brand",
    "sku": "QA703Y60",
    "weight": 2,
    "dimensions": {
      "width": 8.54,
      "height": 23.52,
      "depth": 5.66
    },
    "warrantyInformation": "1 month warranty",
    "shippingInformation": "Ships in 1 week",
    "availabilityStatus": "In Stock",
    "reviews": [
      {
        "rating": 4,
        "comment": "Highly recommended!",
        "date": new Date("2024-05-23T08:56:21.623Z"),
        "reviewerName": "Logan Lawson",
        "reviewerEmail": "logan.lawson@x.dummyjson.com"
      },
      {
        "rating": 4,
        "comment": "Great value for money!",
        "date": new Date("2024-05-23T08:56:21.623Z"),
        "reviewerName": "Logan Lawson",
        "reviewerEmail": "logan.lawson@x.dummyjson.com"
      },
      {
        "rating": 5,
        "comment": "Great value for money!",
        "date": new Date("2024-05-23T08:56:21.623Z"),
        "reviewerName": "Oscar Powers",
        "reviewerEmail": "oscar.powers@x.dummyjson.com"
      }
    ],
    "returnPolicy": "30 days return policy",
    "minimumOrderQuantity": 4,
    "meta": {
      "createdAt": new Date("2024-05-23T08:56:21.623Z"),
      "updatedAt": new Date("2024-05-23T08:56:21.623Z"),
      "barcode": "3072645939073",
      "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
    },
    "images": ['image1.png', 'image2.png', 'image3.png', 'image4.png'],
    "thumbnail": "thumbnail.png"
  }