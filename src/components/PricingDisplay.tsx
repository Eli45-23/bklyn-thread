'use client'

import { CartItem } from '@/lib/types'
import { formatPrice } from '@/lib/stripe'

interface PricingDisplayProps {
  item: Partial<CartItem>
  onAddToCart: () => void
}

export default function PricingDisplay({ item, onAddToCart }: PricingDisplayProps) {
  const calculatePricing = () => {
    const basePrice = item.pricePerItem || 0
    const quantity = item.quantity || 1
    
    // Embroidery costs
    let embroideryPrice = 0
    if (item.embroideryText) {
      embroideryPrice = 3.00 // Text embroidery
    } else if (item.embroideryDesign) {
      embroideryPrice = 5.00 // Design embroidery
    }
    
    // Logo size surcharge
    let logoSizePrice = 0
    if (item.logoSize) {
      if (item.logoSize.includes('Large')) logoSizePrice = 2.00
      else if (item.logoSize.includes('X-Large')) logoSizePrice = 4.00
    }
    
    // Thread color surcharge (additional colors beyond the first)
    const threadColors = item.threadColors || []
    const additionalColors = Math.max(0, threadColors.length - 1)
    const threadColorPrice = additionalColors * 0.50
    
    // Size surcharge
    let sizePrice = 0
    if (item.size && ['2XL', '3XL', '4XL', '5XL'].includes(item.size)) {
      sizePrice = 2.00
    }
    
    const itemTotal = basePrice + embroideryPrice + logoSizePrice + threadColorPrice + sizePrice
    
    // Quantity discounts
    let discount = 0
    if (quantity >= 100) discount = 0.20
    else if (quantity >= 50) discount = 0.15
    else if (quantity >= 25) discount = 0.10
    else if (quantity >= 10) discount = 0.05
    
    const discountAmount = itemTotal * quantity * discount
    const subtotal = itemTotal * quantity - discountAmount
    
    // Update the item's pricing
    const updatedItem = {
      ...item,
      pricePerItem: itemTotal,
      totalPrice: subtotal
    }
    
    if (JSON.stringify(updatedItem) !== JSON.stringify(item)) {
      onItemChange && onItemChange(updatedItem)
    }
    
    return {
      basePrice: basePrice * quantity,
      embroideryPrice: embroideryPrice * quantity,
      logoSizePrice: logoSizePrice * quantity,
      threadColorPrice: threadColorPrice * quantity,
      sizePrice: sizePrice * quantity,
      subtotal: itemTotal * quantity,
      discount: discountAmount,
      total: subtotal
    }
  }

  const pricing = calculatePricing()
  const isComplete = item.productId && item.size && item.color && (item.embroideryText || item.embroideryDesign)

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Pricing Breakdown
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base Price × {item.quantity || 1}</span>
          <span>{formatPrice(pricing.basePrice)}</span>
        </div>
        
        {pricing.embroideryPrice > 0 && (
          <div className="flex justify-between">
            <span>Embroidery × {item.quantity || 1}</span>
            <span>{formatPrice(pricing.embroideryPrice)}</span>
          </div>
        )}
        
        {pricing.threadColorPrice > 0 && (
          <div className="flex justify-between">
            <span>Additional Thread Colors</span>
            <span>{formatPrice(pricing.threadColorPrice)}</span>
          </div>
        )}
        
        {pricing.logoSizePrice > 0 && (
          <div className="flex justify-between">
            <span>Logo Size Surcharge</span>
            <span>{formatPrice(pricing.logoSizePrice)}</span>
          </div>
        )}
        
        {pricing.sizePrice > 0 && (
          <div className="flex justify-between">
            <span>Size Surcharge</span>
            <span>{formatPrice(pricing.sizePrice)}</span>
          </div>
        )}
        
        {pricing.discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Quantity Discount</span>
            <span>-{formatPrice(pricing.discount)}</span>
          </div>
        )}
        
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{formatPrice(pricing.total)}</span>
          </div>
        </div>
      </div>

      {/* Production Time */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-1">Production Time:</h4>
        <p className="text-sm text-blue-700">
          {(item.quantity || 1) > 50 ? '7-10 business days' : '5-7 business days'}
        </p>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={onAddToCart}
        disabled={!isComplete}
        className={`w-full mt-6 py-3 rounded-lg font-medium transition-all ${
          isComplete
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Add to Cart
      </button>

      {!isComplete && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Complete all selections to add to cart
        </p>
      )}

      {/* Pricing Notes */}
      <div className="mt-4 text-xs text-gray-500">
        <p>• Text embroidery: $3.00 per item</p>
        <p>• Logo/design embroidery: $5.00 per item</p>
        <p>• Large logo: +$2.00 • X-Large logo: +$4.00</p>
        <p>• Additional thread colors: $0.50 each</p>
        <p>• Size 2XL+: $2.00 surcharge</p>
        <p>• Quantity discounts: 10+ (5%), 25+ (10%), 50+ (15%), 100+ (20%)</p>
      </div>
    </div>
  )
}