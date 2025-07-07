'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Clock, Shield, ShoppingCart, CheckCircle } from 'lucide-react'
import { products } from '@/data/products'

export default function DemoPage() {
  const [step, setStep] = useState(1)
  const [demoData, setDemoData] = useState({
    product: '',
    size: '',
    color: '',
    design: '',
    placement: '',
    quantity: 1,
    price: 0
  })

  const demoProducts = products.map(p => ({
    id: p.id,
    name: p.shortName,
    price: p.basePrice,
    image: p.image,
    colors: p.colors,
    sizes: p.sizes,
    description: p.description
  }))

  const calculatePrice = () => {
    const product = demoProducts.find(p => p.id === demoData.product)
    if (!product) return 0
    
    let itemPrice = product.price
    
    // Embroidery costs
    if (demoData.design === 'logo') itemPrice += 12.00 // Logo embroidery
    if (demoData.design === 'text') itemPrice += 8.00 // Text embroidery
    
    let total = itemPrice * demoData.quantity
    
    // Volume discounts based on actual product bulk pricing
    const productData = products.find(p => p.id === demoData.product)
    if (productData) {
      const applicableDiscount = productData.bulkPricing
        .filter(pricing => demoData.quantity >= pricing.quantity)
        .reduce((max, current) => current.discount > max ? current.discount : max, 0)
      
      if (applicableDiscount > 0) {
        total *= (1 - applicableDiscount)
      }
    }
    
    return total
  }

  const nextStep = () => {
    if (step < 6) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BT</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">BKLYN Thread</h1>
            </div>
            <div className="text-sm text-gray-600">
              Interactive Demo
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft size={20} className="mr-1" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interactive Demo - Complete Customer Journey
          </h1>
          <p className="text-gray-600">
            Experience the full automated ordering process
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            {[1,2,3,4,5,6].map((num) => (
              <div
                key={num}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  num <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {num < step ? <CheckCircle size={16} /> : num}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Product</span>
            <span>Size & Color</span>
            <span>Design</span>
            <span>Placement</span>
            <span>Quantity</span>
            <span>Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Product Selection */}
            {step === 1 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Choose Your Product</h2>
                <div className="grid grid-cols-2 gap-4">
                  {demoProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setDemoData({...demoData, product: product.id})
                        nextStep()
                      }}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all hover:shadow-md"
                    >
                      <div className="aspect-square bg-gray-50 rounded-lg mb-2 flex items-center justify-center p-2 overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded" />
                      </div>
                      <h3 className="font-medium text-gray-900">{product.name}</h3>
                      <p className="text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">{product.colors.length} colors available</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Size & Color */}
            {step === 2 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Select Size & Color</h2>
                <div className="space-y-6">
                  <div>
                    <label className="form-label">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {demoProducts.find(p => p.id === demoData.product)?.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setDemoData({...demoData, size})}
                          className={`px-4 py-2 border rounded-md font-medium transition-all ${
                            demoData.size === size ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      )) || []}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Color</label>
                    <div className="grid grid-cols-3 gap-2">
                      {demoProducts.find(p => p.id === demoData.product)?.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setDemoData({...demoData, color})}
                          className={`px-3 py-2 border rounded-md text-sm font-medium transition-all ${
                            demoData.color === color ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {color}
                        </button>
                      )) || []}
                    </div>
                  </div>
                  <button
                    onClick={nextStep}
                    disabled={!demoData.size || !demoData.color}
                    className="btn-primary disabled:bg-gray-400"
                  >
                    Next: Choose Design
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Design */}
            {step === 3 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Add Your Design</h2>
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setDemoData({...demoData, design: 'text'})
                      nextStep()
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 text-left"
                  >
                    <h3 className="font-medium mb-2">Custom Text Embroidery</h3>
                    <p className="text-gray-600 text-sm">Add custom text embroidery (+$8.00)</p>
                    <p className="text-xs text-blue-600">Up to 15 characters, multiple thread colors</p>
                  </button>
                  <button
                    onClick={() => {
                      setDemoData({...demoData, design: 'logo'})
                      nextStep()
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 text-left"
                  >
                    <h3 className="font-medium mb-2">Logo Embroidery</h3>
                    <p className="text-gray-600 text-sm">Upload your logo design (+$12.00)</p>
                    <p className="text-xs text-blue-600">Vector files preferred, up to 4&quot; wide</p>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Placement */}
            {step === 4 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Choose Placement</h2>
                <div className="grid grid-cols-2 gap-3">
                  {['Left Chest', 'Right Chest', 'Center Chest', 'Full Back', 'Left Sleeve', 'Right Sleeve'].map((placement) => (
                    <button
                      key={placement}
                      onClick={() => {
                        setDemoData({...demoData, placement})
                        nextStep()
                      }}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 text-sm"
                    >
                      {placement}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Quantity */}
            {step === 5 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Select Quantity</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setDemoData({...demoData, quantity: Math.max(1, demoData.quantity - 1)})}
                      className="px-3 py-2 border rounded-md"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold w-16 text-center">{demoData.quantity}</span>
                    <button
                      onClick={() => setDemoData({...demoData, quantity: demoData.quantity + 1})}
                      className="px-3 py-2 border rounded-md"
                    >
                      +
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 5, 12, 24, 50, 100].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setDemoData({...demoData, quantity: qty})}
                        className="px-3 py-2 border rounded-md text-sm hover:border-blue-500"
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                  {demoData.quantity >= 100 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 20% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Maximum volume discount achieved!</p>
                    </div>
                  )}
                  {demoData.quantity >= 50 && demoData.quantity < 100 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 15% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Order 50 more for 20% discount</p>
                    </div>
                  )}
                  {demoData.quantity >= 24 && demoData.quantity < 50 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 10% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Order 26 more for 15% discount</p>
                    </div>
                  )}
                  {demoData.quantity >= 12 && demoData.quantity < 24 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 5% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Order 12 more for 10% discount</p>
                    </div>
                  )}
                  <button onClick={nextStep} className="btn-primary">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 6: Complete */}
            {step === 6 && (
              <div className="card">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">Demo Complete!</h2>
                  <p className="text-gray-600 mb-6">
                    You&apos;ve experienced the full BKLYN Thread ordering process
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>✅ Easy product selection</p>
                    <p>✅ Real-time pricing</p>
                    <p>✅ Automated discounts</p>
                    <p>✅ Professional checkout flow</p>
                  </div>
                  <button
                    onClick={() => {
                      setStep(1)
                      setDemoData({
                        product: '', size: '', color: '', design: '', placement: '', quantity: 1, price: 0
                      })
                    }}
                    className="btn-primary mt-6"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Product Preview & Order Summary */}
          <div className="space-y-6">
            {/* Product Preview */}
            {demoData.product && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Product Preview</h3>
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4 mb-4 overflow-hidden">
                  <img 
                    src={demoProducts.find(p => p.id === demoData.product)?.image} 
                    alt={demoProducts.find(p => p.id === demoData.product)?.name}
                    className="w-full h-full object-cover rounded-lg shadow-sm" 
                  />
                </div>
                <div className="space-y-2 text-sm">
                  {demoData.color && (
                    <div className="flex items-center justify-between">
                      <span>Color:</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full border ${
                          demoData.color === 'White' ? 'bg-white border-gray-300' :
                          demoData.color === 'Black' ? 'bg-black' :
                          demoData.color === 'Navy' ? 'bg-blue-900' :
                          demoData.color === 'Red' ? 'bg-red-600' :
                          demoData.color === 'Royal Blue' ? 'bg-blue-600' :
                          demoData.color === 'Forest Green' ? 'bg-green-700' :
                          demoData.color === 'Gray' ? 'bg-gray-500' :
                          demoData.color === 'Charcoal' ? 'bg-gray-800' : 'bg-gray-300'
                        }`} />
                        <span>{demoData.color}</span>
                      </div>
                    </div>
                  )}
                  {demoData.design && (
                    <div className="p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-blue-700 font-medium">
                        {demoData.design === 'text' ? '📝 Custom Text' : '🎨 Logo Design'}
                      </p>
                      <p className="text-blue-600 text-xs">
                        {demoData.placement && `Placement: ${demoData.placement}`}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span>{demoData.product ? demoProducts.find(p => p.id === demoData.product)?.name : 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{demoData.size || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Color:</span>
                  <span>{demoData.color || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Design:</span>
                  <span>{demoData.design || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Placement:</span>
                  <span>{demoData.placement || 'Not selected'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{demoData.quantity}</span>
                </div>
                {demoData.product && (
                  <div className="border-t pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Base Price:</span>
                      <span>${(demoProducts.find(p => p.id === demoData.product)?.price || 0).toFixed(2)} × {demoData.quantity}</span>
                    </div>
                    {demoData.design && (
                      <div className="flex justify-between text-sm">
                        <span>Embroidery:</span>
                        <span>+${(demoData.design === 'logo' ? 12.00 : 8.00).toFixed(2)} × {demoData.quantity}</span>
                      </div>
                    )}
                    {demoData.quantity >= 12 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Volume Discount:</span>
                        <span>-{demoData.quantity >= 100 ? '20' : demoData.quantity >= 50 ? '15' : demoData.quantity >= 24 ? '10' : '5'}%</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>${calculatePrice().toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Demo Features</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Star size={16} className="text-yellow-500" />
                  <span>Real-time pricing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-green-500" />
                  <span>5-7 day production</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-blue-500" />
                  <span>Quality guaranteed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShoppingCart size={16} className="text-purple-500" />
                  <span>Automated ordering</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        {step > 1 && step < 6 && (
          <div className="mt-8 flex justify-between">
            <button onClick={prevStep} className="btn-secondary">
              Previous
            </button>
            <div className="text-sm text-gray-500">
              Step {step} of 6
            </div>
          </div>
        )}
      </div>
    </div>
  )
}