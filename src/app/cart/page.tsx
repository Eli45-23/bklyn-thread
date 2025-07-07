'use client'

import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/stripe'
import { useCart } from '@/contexts/CartContext'
import Header from '@/components/Header'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      dispatch({ type: 'REMOVE_ITEM', itemId: id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', itemId: id, quantity: newQuantity })
    }
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', itemId: id })
  }

  const subtotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/customize" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft size={20} className="mr-1" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart ({state.items.length} {state.items.length === 1 ? 'item' : 'items'})
          </h1>
        </div>

        {state.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <a href="/customize" className="btn-primary">
              Start Designing
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="card">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-xs text-gray-500">
                        {item.productType.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} • Color: {item.color}
                      </p>
                      <p className="text-sm text-gray-600">
                        Placement: {item.embroideryPlacement}
                      </p>
                      {item.embroideryText && (
                        <p className="text-sm text-gray-600">
                          Text: &ldquo;{item.embroideryText}&rdquo;
                        </p>
                      )}
                      {item.embroideryDesign && (
                        <p className="text-sm text-gray-600">
                          Design: {item.embroideryDesign}
                        </p>
                      )}
                      {item.logoSize && (
                        <p className="text-sm text-gray-600">
                          Logo Size: {item.logoSize}
                        </p>
                      )}
                      {item.threadColors && item.threadColors.length > 0 && (
                        <p className="text-sm text-gray-600">
                          Thread Colors: {item.threadColors.join(', ')}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatPrice(item.totalPrice)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
              
              <Link href="/checkout" className="w-full btn-primary mt-6 text-center block">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}