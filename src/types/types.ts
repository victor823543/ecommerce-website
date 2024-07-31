import { ReactNode } from "react";

export interface Product {
    id:                   number;
    title:                string;
    description:          string;
    category:             string;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand:                string;
    sku:                  string;
    weight:               number;
    dimensions:           Dimensions;
    warrantyInformation:  string;
    shippingInformation:  string;
    availabilityStatus:   string;
    reviews:              Review[];
    returnPolicy:         string;
    minimumOrderQuantity: number;
    meta:                 Meta;
    images:               string[];
    thumbnail:            string;
}

export interface Dimensions {
    width:  number;
    height: number;
    depth:  number;
}

export interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode:   string;
    qrCode:    string;
}

export interface Review {
    rating:        number;
    comment:       string;
    date:          Date;
    reviewerName:  string;
    reviewerEmail: string;
}

export interface ProductSelection {
    products: Product[],
    total: number,
    limit: number,
    skip: number,
}


export interface SubCategory {
    name: string;
    link: string;
}

export interface Category {
    name: string;
    link: string;
    subcategories: SubCategory[]
}

export type SortingOption = 'Price (Asc)'|'Price (Desc)'|'Name'|'Rating'|null

export interface AccordionContent {
    title: string;
    content: ReactNode;
}