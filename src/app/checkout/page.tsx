'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import { useCart } from '@/contexts/CartContext'
import { formatPrice } from '@/lib/stripe'

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  })
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const subtotal = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CART' })
      router.push('/order-confirmation')
    }, 2000)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <Link href="/customize" className="btn-primary">
            Start Designing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/cart" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft size={20} className="mr-1" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={shippingAddress.zipCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="form-label">Name on Card *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={paymentInfo.nameOnCard}
                    onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                  />
                </div>
                <div>
                  <label className="form-label">Card Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="1234 5678 9012 3456"
                    className="form-input"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Expiry Date *</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      className="form-input"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="form-label">CVV *</label>
                    <input
                      type="text"
                      required
                      placeholder="123"
                      className="form-input"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              
              {/* Items */}
              <div className="space-y-3 mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-gray-600">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      {item.embroideryText && (
                        <p className="text-gray-600">Text: &ldquo;{item.embroideryText}&rdquo;</p>
                      )}
                      {item.embroideryDesign && (
                        <p className="text-gray-600">Logo: {item.embroideryDesign}</p>
                      )}
                    </div>
                    <span className="font-medium">{formatPrice(item.totalPrice)}</span>
                  </div>
                ))}
              </div>
              
              {/* Totals */}
              <div className="border-t pt-4 space-y-2 text-sm">
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
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="card">
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="mr-2 text-green-600" size={16} />
                <span>Your payment information is secure and encrypted</span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="card">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="mr-2 text-blue-600" size={16} />
                <div>
                  <p className="font-medium">Production Time: 5-7 business days</p>
                  <p>Plus 3-5 days shipping</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-lg font-medium transition-all ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Order...
                </div>
              ) : (
                `Complete Order • ${formatPrice(total)}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}