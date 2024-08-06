import { expect, describe, test } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import ProductSection from '../pages/ProductPage/components/ProductSection/ProductSection'
import { store } from '../app/store'
import { mockProduct } from '../utils/mock-data'
import { renderWithProviders } from '../utils/test-utils'


describe('ProductSection component with Redux store', () => {
    const renderComponent = () => { 
        renderWithProviders(<ProductSection product={mockProduct}/>, { store: store },)
    }

    test('renders product title, brand, and price', () => {
        renderComponent();
    
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Brand')).toBeInTheDocument();
        expect(screen.getByText('9.99$')).toBeInTheDocument();
    });

    test('renders product images and handles image navigation', () => {
        renderComponent();
    
        const leftArrow = screen.getByLabelText('Left Image Button');
        const rightArrow = screen.getByLabelText('Right Image Button');
        const mainImage = screen.getByLabelText('Main Image') as HTMLImageElement;
    
        expect(mainImage.src).toContain('image1.png');
    
        fireEvent.click(rightArrow);
        expect(mainImage.src).toContain('image2.png');
    
        fireEvent.click(leftArrow);
        expect(mainImage.src).toContain('image1.png');
      });

      test('handles add to cart button click', () => {
        renderComponent();
    
        const addToCartButton = screen.getByLabelText('Add to Cart Button');
        fireEvent.click(addToCartButton);
    
        const state = store.getState(); 
        expect(state.cart.items[mockProduct.id]).toBe(1); 
      });
      test('renders accordion with product information', () => {
        renderComponent();
    
        expect(screen.getByText('Warranty')).toBeInTheDocument();
        expect(screen.getByText('Shipping')).toBeInTheDocument();
        expect(screen.getByText('Measurements')).toBeInTheDocument();
        expect(screen.getByText('Reviews (3)')).toBeInTheDocument();
    
        fireEvent.click(screen.getByText('Warranty'));
        expect(screen.getByText('1 month warranty')).toBeVisible();
      });
})