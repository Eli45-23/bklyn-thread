'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { CartItem } from '@/lib/types'
import { products } from '@/data/products'

interface ProductSelectorProps {
  selectedProduct: Partial<CartItem>
  onProductChange: (product: Partial<CartItem>) => void
}

// Products are now imported from the data file

export default function ProductSelector({ selectedProduct, onProductChange }: ProductSelectorProps) {
  const [selectedProductData, setSelectedProductData] = useState(products[0])

  useEffect(() => {
    if (selectedProduct.productId) {
      const product = products.find(p => p.id === selectedProduct.productId)
      if (product) {
        setSelectedProductData(product)
      }
    }
  }, [selectedProduct.productId])

  const handleProductSelect = (product: typeof products[0]) => {
    setSelectedProductData(product)
    onProductChange({
      ...selectedProduct,
      productId: product.id,
      productName: product.name,
      productType: product.type,
      pricePerItem: product.basePrice,
      totalPrice: product.basePrice * (selectedProduct.quantity || 1),
      size: '',
      color: '',
    })
  }

  const handleSizeChange = (size: string) => {
    onProductChange({
      ...selectedProduct,
      size,
    })
  }

  const handleColorChange = (color: string) => {
    onProductChange({
      ...selectedProduct,
      color,
    })
  }

  const availableSizes = selectedProductData.sizes || []

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Select Product
      </h2>

      {/* Product Selection */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => handleProductSelect(product)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedProduct.productId === product.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="aspect-square bg-gray-50 rounded-lg mb-2 flex items-center justify-center p-2 overflow-hidden">
              <Image src={product.image} alt={product.name} className="w-full h-full object-cover rounded" width={150} height={150} />
            </div>
            <h3 className="font-medium text-sm text-gray-900">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600">
              ${product.basePrice}
            </p>
          </button>
        ))}
      </div>

      {/* Size Selection */}
      {selectedProduct.productId && (
        <div className="mb-6">
          <label className="form-label">Size</label>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => handleSizeChange(size)}
                className={`px-4 py-3 min-h-[44px] min-w-[44px] rounded-md border transition-all text-base font-medium ${
                  selectedProduct.size === size
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {selectedProduct.productId && (
        <div className="mb-6">
          <label className="form-label">Color</label>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {selectedProductData.colors.map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className={`p-3 min-h-[44px] rounded-md border text-sm md:text-base transition-all ${
                  selectedProduct.color === color
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}