'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { CartItem } from '@/lib/types'

interface CartState {
  items: CartItem[]
  isOpen: boolean
}

type CartAction = 
  | { type: 'ADD_ITEM'; item: CartItem }
  | { type: 'REMOVE_ITEM'; itemId: string }
  | { type: 'UPDATE_QUANTITY'; itemId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }

const initialState: CartState = {
  items: [],
  isOpen: false
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => 
        item.productId === action.item.productId &&
        item.size === action.item.size &&
        item.color === action.item.color &&
        item.embroideryText === action.item.embroideryText &&
        item.embroideryDesign === action.item.embroideryDesign
      )
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...state.items]
        updatedItems[existingItemIndex].quantity += action.item.quantity
        updatedItems[existingItemIndex].totalPrice = 
          updatedItems[existingItemIndex].pricePerItem * updatedItems[existingItemIndex].quantity
        return { ...state, items: updatedItems }
      }
      
      return { 
        ...state, 
        items: [...state.items, { ...action.item, id: Date.now().toString() }] 
      }
      
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.itemId)
      }
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.itemId
            ? { 
                ...item, 
                quantity: action.quantity,
                totalPrice: item.pricePerItem * action.quantity
              }
            : item
        )
      }
      
    case 'CLEAR_CART':
      return { ...state, items: [] }
      
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
      
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}