'use client'

import { CartItem } from '@/lib/types'
import { products } from '@/data/products'
import Image from 'next/image'

interface ProductPreviewProps {
  item: Partial<CartItem>
}

export default function ProductPreview({ item }: ProductPreviewProps) {
  // Get product data for the image
  const productData = products.find(p => p.id === item.productId)

  const getPlacementStyle = () => {
    const baseStyle = { position: 'absolute' as const, fontSize: '10px', fontWeight: 'bold' }
    
    switch (item.embroideryPlacement) {
      case 'Left Chest':
        return { ...baseStyle, top: '25%', left: '15%' }
      case 'Right Chest':
        return { ...baseStyle, top: '25%', right: '15%' }
      case 'Center Chest':
        return { ...baseStyle, top: '25%', left: '50%', transform: 'translateX(-50%)' }
      case 'Full Back':
        return { ...baseStyle, top: '20%', left: '50%', transform: 'translateX(-50%)', fontSize: '8px' }
      case 'Left Sleeve':
        return { ...baseStyle, top: '15%', left: '8%', fontSize: '8px' }
      case 'Right Sleeve':
        return { ...baseStyle, top: '15%', right: '8%', fontSize: '8px' }
      case 'Hat Front':
        return { ...baseStyle, top: '40%', left: '50%', transform: 'translateX(-50%)' }
      case 'Hat Back':
        return { ...baseStyle, top: '30%', left: '50%', transform: 'translateX(-50%)' }
      case 'Hat Side':
        return { ...baseStyle, top: '35%', left: '20%' }
      default:
        return { ...baseStyle, top: '25%', left: '15%' }
    }
  }


  const getTextPreviewStyle = () => {
    const placement = item.embroideryPlacement
    let fontSize = '10px'
    
    if (placement?.includes('Sleeve') || placement?.includes('Back')) {
      fontSize = '8px'
    } else if (placement?.includes('Hat')) {
      fontSize = '9px'
    }
    
    return {
      fontSize,
      fontFamily: item.embroideryFont || 'Arial',
      color: item.threadColors?.[0] ? getThreadColorHex(item.threadColors[0]) : '#1e40af'
    }
  }

  const getThreadColorHex = (colorName: string) => {
    const colorMap: Record<string, string> = {
      'White': '#ffffff',
      'Black': '#000000',
      'Navy': '#1e40af',
      'Red': '#dc2626',
      'Royal Blue': '#2563eb',
      'Forest Green': '#16a34a',
      'Maroon': '#7f1d1d',
      'Purple': '#7c3aed',
      'Orange': '#ea580c',
      'Pink': '#ec4899',
      'Yellow': '#eab308',
      'Light Blue': '#3b82f6',
      'Gray': '#6b7280',
      'Gold': '#f59e0b',
      'Silver': '#9ca3af',
      'Brown': '#92400e'
    }
    return colorMap[colorName] || '#1e40af'
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Live Preview
      </h3>

      <div className="relative bg-gray-100 rounded-lg aspect-square flex items-center justify-center mb-4 overflow-hidden">
        {productData ? (
          <div className="relative w-full h-full">
            {/* Actual Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="relative w-full max-w-48 aspect-square">
                <Image 
                  src={productData.image} 
                  alt={productData.name}
                  fill
                  className="object-contain"
                  style={{ 
                    filter: item.color && item.color !== 'White' ? 
                      `hue-rotate(${getColorHue(item.color)}deg) saturate(${getColorSaturation(item.color)})` : 
                      'none'
                  }}
                />
                
                {/* Color overlay for non-white products */}
                {item.color && item.color !== 'White' && (
                  <div 
                    className="absolute inset-0 rounded-lg opacity-30 mix-blend-multiply"
                    style={{ backgroundColor: getProductColorHex(item.color) }}
                  />
                )}
              </div>
            </div>

            {/* Embroidery preview */}
            {(item.embroideryText || item.embroideryDesign) && (
              <div
                className="z-10 pointer-events-none"
                style={getPlacementStyle()}
              >
                {item.embroideryText && (
                  <div 
                    className="bg-white/90 px-1 py-0.5 rounded shadow-sm border text-center"
                    style={getTextPreviewStyle()}
                  >
                    {item.embroideryText}
                  </div>
                )}
                {item.embroideryDesign && !item.embroideryText && (
                  <div className="w-6 h-6 bg-blue-100 rounded border-2 border-blue-300 flex items-center justify-center">
                    <span className="text-[6px]">IMG</span>
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
          <div className="flex items-center gap-2">
            {item.color && (
              <div 
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: getProductColorHex(item.color) }}
              />
            )}
            <span className="font-medium">{item.color || 'Not selected'}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Placement:</span>
          <span className="font-medium">{item.embroideryPlacement || 'Left Chest'}</span>
        </div>
        {item.threadColors && item.threadColors.length > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Thread Colors:</span>
            <div className="flex items-center gap-1">
              {item.threadColors.slice(0, 3).map((color, idx) => (
                <div 
                  key={idx}
                  className="w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: getThreadColorHex(color) }}
                  title={color}
                />
              ))}
              {item.threadColors.length > 3 && (
                <span className="text-xs text-gray-500">+{item.threadColors.length - 3}</span>
              )}
            </div>
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

function getProductColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'White': '#ffffff',
    'Black': '#1f2937',
    'Navy': '#1e3a8a',
    'Red': '#dc2626',
    'Royal Blue': '#2563eb',
    'Forest Green': '#166534',
    'Maroon': '#7f1d1d',
    'Purple': '#7c3aed',
    'Orange': '#ea580c',
    'Pink': '#ec4899',
    'Yellow': '#eab308',
    'Light Blue': '#3b82f6',
    'Gray': '#6b7280',
    'Charcoal': '#374151',
    'Khaki': '#a3a849',
    'Brown': '#92400e'
  }
  return colorMap[colorName] || '#6b7280'
}

function getColorHue(colorName: string): number {
  const hueMap: Record<string, number> = {
    'Red': 0,
    'Orange': 30,
    'Yellow': 60,
    'Forest Green': 120,
    'Royal Blue': 240,
    'Navy': 220,
    'Purple': 270,
    'Pink': 320,
    'Maroon': 350,
    'Brown': 25
  }
  return hueMap[colorName] || 0
}

function getColorSaturation(colorName: string): number {
  const saturationMap: Record<string, number> = {
    'Black': 0,
    'Gray': 0.3,
    'Charcoal': 0.5,
    'Khaki': 0.7
  }
  return saturationMap[colorName] || 1
}