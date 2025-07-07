'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Clock, Shield, ShoppingCart, CheckCircle } from 'lucide-react'

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

  const products = [
    { id: 'shirt', name: 'Premium T-Shirt', price: 18.99, image: '/images/products/tshirt-white.svg' },
    { id: 'hat', name: 'Baseball Cap', price: 22.99, image: '/images/products/baseball-cap.svg' },
    { id: 'hoodie', name: 'Pullover Hoodie', price: 44.99, image: '/images/products/hoodie-gray.svg' },
    { id: 'polo', name: 'Polo Shirt', price: 28.99, image: '/images/products/polo-navy.svg' }
  ]

  const calculatePrice = () => {
    const product = products.find(p => p.id === demoData.product)
    if (!product) return 0
    
    let itemPrice = product.price
    
    // Embroidery costs
    if (demoData.design === 'logo') itemPrice += 12.00 // Logo embroidery
    if (demoData.design === 'text') itemPrice += 8.00 // Text embroidery
    
    let total = itemPrice * demoData.quantity
    
    // Volume discounts
    if (demoData.quantity >= 50) total *= 0.85 // 15% discount
    else if (demoData.quantity >= 25) total *= 0.90 // 10% discount  
    else if (demoData.quantity >= 10) total *= 0.95 // 5% discount
    
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
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setDemoData({...demoData, product: product.id})
                        nextStep()
                      }}
                      className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-all"
                    >
                      <div className="aspect-square bg-gray-50 rounded-lg mb-2 flex items-center justify-center p-2">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-blue-600">${product.price}</p>
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
                      {['S', 'M', 'L', 'XL', '2XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setDemoData({...demoData, size})}
                          className={`px-4 py-2 border rounded-md ${
                            demoData.size === size ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Color</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['White', 'Black', 'Navy', 'Red', 'Royal Blue', 'Forest Green', 'Gray', 'Charcoal'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setDemoData({...demoData, color})}
                          className={`px-3 py-2 border rounded-md text-sm ${
                            demoData.color === color ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
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
                    {[1, 5, 10, 25, 50, 100].map((qty) => (
                      <button
                        key={qty}
                        onClick={() => setDemoData({...demoData, quantity: qty})}
                        className="px-3 py-2 border rounded-md text-sm hover:border-blue-500"
                      >
                        {qty}
                      </button>
                    ))}
                  </div>
                  {demoData.quantity >= 50 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 15% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Orders 50+ units save significantly</p>
                    </div>
                  )}
                  {demoData.quantity >= 25 && demoData.quantity < 50 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 10% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Order 25 more for additional savings</p>
                    </div>
                  )}
                  {demoData.quantity >= 10 && demoData.quantity < 25 && (
                    <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-700 text-sm font-medium">🎉 5% Volume Discount Applied!</p>
                      <p className="text-green-600 text-xs">Order 15 more for 10% discount</p>
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
                <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-4 mb-4">
                  <img 
                    src={products.find(p => p.id === demoData.product)?.image} 
                    alt={products.find(p => p.id === demoData.product)?.name}
                    className="w-full h-full object-contain" 
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
                  <span>{demoData.product ? products.find(p => p.id === demoData.product)?.name : 'Not selected'}</span>
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
                      <span>${(products.find(p => p.id === demoData.product)?.price || 0).toFixed(2)} × {demoData.quantity}</span>
                    </div>
                    {demoData.design && (
                      <div className="flex justify-between text-sm">
                        <span>Embroidery:</span>
                        <span>+${(demoData.design === 'logo' ? 12.00 : 8.00).toFixed(2)} × {demoData.quantity}</span>
                      </div>
                    )}
                    {demoData.quantity >= 10 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Volume Discount:</span>
                        <span>-{demoData.quantity >= 50 ? '15' : demoData.quantity >= 25 ? '10' : '5'}%</span>
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