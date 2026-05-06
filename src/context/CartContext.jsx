import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'speedtouch_cart_v1'

function cartReducer(items, action) {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload
    case 'ADD': {
      const { product, quantity = 1 } = action.payload
      const existing = items.find((i) => i.id === product.id)
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [
        ...items,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          original: product.original,
          quantity,
        },
      ]
    }
    case 'REMOVE':
      return items.filter((i) => i.id !== action.payload)
    case 'SET_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) return items.filter((i) => i.id !== id)
      return items.map((i) => (i.id === id ? { ...i, quantity } : i))
    }
    case 'CLEAR':
      return []
    default:
      return items
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, [])
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
    } catch {
      // ignore parse errors
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const showToast = useCallback((message) => {
    setToast({ message, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const addItem = useCallback(
    (product, quantity = 1, { openDrawer = false } = {}) => {
      dispatch({ type: 'ADD', payload: { product, quantity } })
      showToast(`${product.name} added to cart`)
      if (openDrawer) setDrawerOpen(true)
    },
    [showToast],
  )

  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE', payload: id }), [])
  const setQuantity = useCallback(
    (id, quantity) => dispatch({ type: 'SET_QUANTITY', payload: { id, quantity } }),
    [],
  )
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const value = {
    items,
    count,
    subtotal,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    toast,
    dismissToast: () => setToast(null),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
