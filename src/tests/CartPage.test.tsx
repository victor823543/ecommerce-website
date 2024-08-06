import { setupServer } from "msw/node"
import { HttpResponse, http, delay } from "msw"
import { mockProduct, mockProduct2 } from "../utils/mock-data"
import { Product, ProductSelection } from "../types/types"
import { renderWithProviders } from "../utils/test-utils"
import CartPage from "../pages/CartPage/CartPage"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, test, expect, beforeEach } from "vitest"

const mockProducts: ProductSelection = {
  products: [mockProduct, mockProduct2],
  limit: 0,
  skip: 0,
  total: 2,
}

const initialCartState = { "1": 1, "2": 1 }

export const handlers = [
  http.get("https://dummyjson.com/products?limit=0", async () => {
    await delay(150)
    return HttpResponse.json(mockProducts)
  }),
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test("renders the CartItems and Summary correctly", async () => {
  renderWithProviders(<CartPage />, {
    preloadedState: { cart: { items: initialCartState } },
  })

  // Verify loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument()

  // Wait for data to be loaded
  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
  )

  // Check rendered components
  expect(screen.getByText("Shoppingbag")).toBeInTheDocument()
  expect(screen.getByText("2 products | 34.98 $")).toBeInTheDocument()

  // Check CartItems
  expect(screen.getByText("Test Product")).toBeInTheDocument()
  expect(screen.getByText("Second Test Product")).toBeInTheDocument()
})

test("updates amount of product in cart", async () => {
  const { store } = renderWithProviders(<CartPage />, {
    preloadedState: { cart: { items: { "1": 1 } } },
  })

  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
  )

  const selectAmount = screen.getByLabelText(
    "Select Product Amount",
  ) as HTMLSelectElement
  expect(selectAmount.value).toBe("1")
  fireEvent.change(selectAmount, { target: { value: "4" } })

  const state = store.getState()
  expect(state.cart.items["1"]).toBe(4)
  expect(selectAmount.value).toBe("4")
})

test("deletes item from cart correctly", async () => {
  const { store } = renderWithProviders(<CartPage />, {
    preloadedState: { cart: { items: initialCartState } },
  })

  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
  )

  const deleteButton = screen.getByLabelText("Remove id: 1 Button")

  fireEvent.click(deleteButton)

  await waitFor(() => {
    const state = store.getState()
    expect(state.cart).not.toHaveProperty("1")
    expect(state.cart.items["2"]).toBe(1)
  })

  expect(screen.getByText("Second Test Product")).toBeInTheDocument()
  expect(screen.queryByText("Test Product")).not.toBeInTheDocument()
})

test("set item in cart to amount 0 removes from cart", async () => {
  const { store } = renderWithProviders(<CartPage />, {
    preloadedState: { cart: { items: {'1': 2} } },
  })

  await waitFor(() =>
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument(),
  )

  const selectAmount = screen.getByLabelText(
    "Select Product Amount",
  ) as HTMLSelectElement
  expect(selectAmount.value).toBe("2")
  fireEvent.change(selectAmount, { target: { value: "0" } })

  await waitFor(() => {
    const state = store.getState()
    expect(state.cart).not.toHaveProperty("1")
  })

  expect(screen.queryByText("Test Product")).not.toBeInTheDocument()

})
