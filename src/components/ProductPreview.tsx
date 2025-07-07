'use client'

import { CartItem } from '@/lib/types'

interface ProductPreviewProps {
  item: Partial<CartItem>
}

export default function ProductPreview({ item }: ProductPreviewProps) {

  const getPlacementStyle = () => {
    switch (item.embroideryPlacement) {
      case 'Left Chest':
        return { top: '30%', left: '20%' }
      case 'Right Chest':
        return { top: '30%', right: '20%' }
      case 'Center Chest':
        return { top: '30%', left: '50%', transform: 'translateX(-50%)' }
      case 'Full Back':
        return { top: '25%', left: '50%', transform: 'translateX(-50%)' }
      case 'Left Sleeve':
        return { top: '20%', left: '10%' }
      case 'Right Sleeve':
        return { top: '20%', right: '10%' }
      default:
        return { top: '30%', left: '20%' }
    }
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Live Preview
      </h3>

      <div className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-4">
        {item.productType ? (
          <div className="relative w-full h-full">
            {/* Product silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-48 aspect-square bg-gray-300 rounded-lg flex items-center justify-center mx-4">
                <span className="text-gray-500 text-sm md:text-base font-medium">
                  {item.productType?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Embroidery preview */}
            {(item.embroideryText || item.embroideryDesign) && (
              <div
                className="absolute text-sm font-bold text-blue-600 z-10"
                style={getPlacementStyle()}
              >
                {item.embroideryText && (
                  <div className="bg-white px-2 py-1 rounded shadow-sm border">
                    {item.embroideryText}
                  </div>
                )}
                {item.embroideryDesign && !item.embroideryText && (
                  <div className="w-8 h-8 bg-blue-100 rounded border-2 border-blue-300 flex items-center justify-center">
                    <span className="text-xs">IMG</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-2">Select a product to see preview</p>
            <div className="w-32 h-32 bg-gray-200 rounded-lg mx-auto"></div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Product:</span>
          <span className="font-medium">{item.productName || 'Not selected'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Size:</span>
          <span className="font-medium">{item.size || 'Not selected'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Color:</span>
          <span className="font-medium">{item.color || 'Not selected'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Placement:</span>
          <span className="font-medium">{item.embroideryPlacement || 'Left Chest'}</span>
        </div>
        {item.threadColors && item.threadColors.length > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Thread Colors:</span>
            <span className="font-medium">{item.threadColors.join(', ')}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-gray-600">Quantity:</span>
          <span className="font-medium">{item.quantity || 1}</span>
        </div>
      </div>

      {/* Design Requirements */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-yellow-800 mb-1">Design Tips:</h4>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Use high-resolution images (300+ DPI)</li>
          <li>• Vector files work best for sharp edges</li>
          <li>• Limit text to 2-3 lines for best results</li>
          <li>• Consider thread color contrast</li>
        </ul>
      </div>
    </div>
  )
}