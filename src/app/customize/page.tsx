'use client'

import { useState, useCallback } from 'react'
import ProductSelector from '@/components/ProductSelector'
import CustomizationPanel from '@/components/CustomizationPanel'
import PricingDisplay from '@/components/PricingDisplay'
import ProductPreview from '@/components/ProductPreview'
import Header from '@/components/Header'
import { CartItem } from '@/lib/types'
import { useCart } from '@/contexts/CartContext'

export default function CustomizePage() {
  const { dispatch } = useCart()
  const [currentItem, setCurrentItem] = useState<Partial<CartItem>>({
    productId: '',
    productName: '',
    productType: '',
    quantity: 1,
    size: '',
    color: '',
    embroideryPlacement: 'Left Chest',
    threadColors: [],
    pricePerItem: 0,
    totalPrice: 0,
    embroideryText: '',
    embroideryDesign: null,
    logoSize: 'Medium'
  })

  const [showSuccess, setShowSuccess] = useState(false)

  const handleItemChange = useCallback((updatedItem: Partial<CartItem>) => {
    setCurrentItem(updatedItem)
  }, [])

  const handleAddToCart = () => {
    if (currentItem.productId && currentItem.size && currentItem.color && 
        (currentItem.embroideryText || currentItem.embroideryDesign)) {
      const cartItem: CartItem = {
        id: Date.now().toString(),
        productId: currentItem.productId!,
        productName: currentItem.productName!,
        productType: currentItem.productType!,
        quantity: currentItem.quantity!,
        size: currentItem.size!,
        color: currentItem.color!,
        embroideryText: currentItem.embroideryText,
        embroideryDesign: currentItem.embroideryDesign,
        embroideryPlacement: currentItem.embroideryPlacement!,
        threadColors: currentItem.threadColors!,
        pricePerItem: currentItem.pricePerItem!,
        totalPrice: currentItem.totalPrice!,
        logoSize: currentItem.logoSize || 'Medium'
      }
      
      dispatch({ type: 'ADD_ITEM', item: cartItem })
      
      // Show success message
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      
      // Reset form for next item
      setCurrentItem({
        productId: '',
        productName: '',
        productType: '',
        quantity: 1,
        size: '',
        color: '',
        embroideryPlacement: 'Left Chest',
        threadColors: [],
        pricePerItem: 0,
        totalPrice: 0,
        embroideryText: '',
        embroideryDesign: null,
        logoSize: 'Medium'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ Item added to cart successfully!
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Customize Your Order
          </h1>
          <p className="text-gray-600">
            Design your perfect embroidered apparel with our easy-to-use customization tool
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Selection & Customization */}
          <div className="lg:col-span-2 space-y-6">
            <ProductSelector
              selectedProduct={currentItem}
              onProductChange={handleItemChange}
            />
            
            <CustomizationPanel
              item={currentItem}
              onItemChange={handleItemChange}
            />
          </div>

          {/* Right Column - Preview & Pricing */}
          <div className="space-y-6">
            <ProductPreview item={currentItem} />
            
            <PricingDisplay
              item={currentItem}
              onAddToCart={handleAddToCart}
              onItemChange={handleItemChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}