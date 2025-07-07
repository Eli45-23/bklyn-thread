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
    { id: 'shirt', name: 'Premium T-Shirt', price: 15.99 },
    { id: 'hat', name: 'Baseball Cap', price: 19.99 },
    { id: 'hoodie', name: 'Pullover Hoodie', price: 39.99 },
    { id: 'polo', name: 'Polo Shirt', price: 24.99 }
  ]

  const calculatePrice = () => {
    const product = products.find(p => p.id === demoData.product)
    if (!product) return 0
    
    let total = product.price
    if (demoData.design === 'logo') total += 5 // Logo embroidery
    if (demoData.design === 'text') total += 3 // Text embroidery
    if (demoData.quantity >= 10) total *= 0.95 // 5% discount
    
    return total * demoData.quantity
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
                      <div className="aspect-square bg-gray-100 rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          {product.name.toUpperCase()}
                        </span>
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
                    <h3 className="font-medium mb-2">Custom Text</h3>
                    <p className="text-gray-600 text-sm">Add custom text embroidery (+$3.00)</p>
                  </button>
                  <button
                    onClick={() => {
                      setDemoData({...demoData, design: 'logo'})
                      nextStep()
                    }}
                    className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 text-left"
                  >
                    <h3 className="font-medium mb-2">Upload Logo</h3>
                    <p className="text-gray-600 text-sm">Upload your logo design (+$5.00)</p>
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
                  {demoData.quantity >= 10 && (
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-green-700 text-sm">🎉 5% quantity discount applied!</p>
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

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
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
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${calculatePrice().toFixed(2)}</span>
                  </div>
                </div>
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