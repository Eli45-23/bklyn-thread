'use client'

import { useState } from 'react'
import { Upload, Type } from 'lucide-react'
import { EMBROIDERY_PLACEMENTS, THREAD_COLORS, FONTS, LOGO_SIZES, CartItem } from '@/lib/types'

interface CustomizationPanelProps {
  item: Partial<CartItem>
  onItemChange: (item: Partial<CartItem>) => void
}

export default function CustomizationPanel({ item, onItemChange }: CustomizationPanelProps) {
  const [designType, setDesignType] = useState<'text' | 'upload'>('text')
  const [embroideryText, setEmbroideryText] = useState(item.embroideryText || '')
  const [selectedFont, setSelectedFont] = useState('Arial')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [logoSize, setLogoSize] = useState(item.logoSize || 'Medium (3")')

  const handleDesignTypeChange = (type: 'text' | 'upload') => {
    setDesignType(type)
    onItemChange({
      ...item,
      embroideryText: type === 'text' ? embroideryText : undefined,
      embroideryDesign: type === 'upload' ? (uploadedFile ? uploadedFile.name : null) : null,
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      onItemChange({
        ...item,
        embroideryDesign: file.name,
      })
    }
  }

  const handleLogoSizeChange = (size: string) => {
    setLogoSize(size)
    onItemChange({
      ...item,
      logoSize: size,
    })
  }

  const handleTextChange = (text: string) => {
    setEmbroideryText(text)
    onItemChange({
      ...item,
      embroideryText: text,
    })
  }

  const handlePlacementChange = (placement: string) => {
    onItemChange({
      ...item,
      embroideryPlacement: placement,
    })
  }

  const handleThreadColorChange = (color: string) => {
    const currentColors = item.threadColors || []
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color]
    
    onItemChange({
      ...item,
      threadColors: newColors,
    })
  }

  const handleQuantityChange = (quantity: number) => {
    onItemChange({
      ...item,
      quantity,
      totalPrice: (item.pricePerItem || 0) * quantity,
    })
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Customize Your Design
      </h2>

      {/* Design Type Selection */}
      <div className="mb-6">
        <label className="form-label">Design Type</label>
        <div className="flex space-x-4">
          <button
            onClick={() => handleDesignTypeChange('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              designType === 'text'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Type size={16} />
            <span>Text</span>
          </button>
          <button
            onClick={() => handleDesignTypeChange('upload')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
              designType === 'upload'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload size={16} />
            <span>Upload Design</span>
          </button>
        </div>
      </div>

      {/* Text Input */}
      {designType === 'text' && (
        <div className="mb-6">
          <label className="form-label">Embroidery Text</label>
          <input
            type="text"
            value={embroideryText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter text to embroider..."
            className="form-input"
          />
          
          <div className="mt-4">
            <label className="form-label">Font</label>
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="form-input"
            >
              {FONTS.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* File Upload */}
      {designType === 'upload' && (
        <div className="mb-6">
          <label className="form-label">Upload Design/Logo</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 mb-2">
              Drag and drop your design file here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG, PDF, SVG files up to 10MB
            </p>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.svg"
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload" className="btn-secondary mt-4 cursor-pointer inline-block">
              Choose File
            </label>
            {uploadedFile && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-green-700 text-sm">
                  ✅ File uploaded: {uploadedFile.name}
                </p>
                <p className="text-green-600 text-xs">
                  Size: {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
          </div>
          
          {/* Logo Size Selection */}
          {uploadedFile && (
            <div className="mt-4">
              <label className="form-label">Logo Size</label>
              <div className="grid grid-cols-2 gap-2">
                {LOGO_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleLogoSizeChange(size)}
                    className={`px-3 py-2 rounded-md border text-sm transition-all ${
                      logoSize === size
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
        </div>
      )}

      {/* Embroidery Placement */}
      <div className="mb-6">
        <label className="form-label">Embroidery Placement</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {EMBROIDERY_PLACEMENTS.map((placement) => (
            <button
              key={placement}
              onClick={() => handlePlacementChange(placement)}
              className={`px-3 py-2 rounded-md border text-sm transition-all ${
                item.embroideryPlacement === placement
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {placement}
            </button>
          ))}
        </div>
      </div>

      {/* Thread Colors */}
      <div className="mb-6">
        <label className="form-label">Thread Colors</label>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {THREAD_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handleThreadColorChange(color)}
              className={`p-2 rounded-md border text-xs transition-all ${
                item.threadColors?.includes(color)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {color}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Select up to 6 thread colors for your design
        </p>
      </div>

      {/* Quantity */}
      <div className="mb-6">
        <label className="form-label">Quantity</label>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleQuantityChange(Math.max(1, (item.quantity || 1) - 1))}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            -
          </button>
          <input
            type="number"
            value={item.quantity || 1}
            onChange={(e) => handleQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-20 text-center form-input"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange((item.quantity || 1) + 1)}
            className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            +
          </button>
        </div>
        
        {/* Quantity Discounts */}
        {(item.quantity || 1) >= 10 && (
          <div className="mt-2 p-2 bg-green-50 rounded-md">
            <p className="text-sm text-green-700">
              🎉 Quantity discount applied! 
              {(item.quantity || 1) >= 100 ? ' 20% off' :
               (item.quantity || 1) >= 50 ? ' 15% off' :
               (item.quantity || 1) >= 25 ? ' 10% off' : ' 5% off'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}