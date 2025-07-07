'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle, Clock, Truck, Mail } from 'lucide-react'
import Header from '@/components/Header'

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(() => 
    `BT-${Date.now().toString().slice(-6)}`
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your order. We&apos;ve received your request and will start production soon.
          </p>
        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Information
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Confirmed</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-2 text-sm">
              <p className="text-gray-600">
                Questions about your order? Contact us:
              </p>
              <p className="font-medium">info@bklynthread.com</p>
              <p className="font-medium">(555) 123-4567</p>
              <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            What Happens Next?
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <CheckCircle className="text-blue-600" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Order Received</h3>
                <p className="text-gray-600 text-sm">
                  Your order has been confirmed and payment processed successfully.
                </p>
                <p className="text-green-600 text-sm font-medium">✓ Complete</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <Clock className="text-yellow-600" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Production Begins</h3>
                <p className="text-gray-600 text-sm">
                  Our team will start working on your custom embroidery within 1 business day.
                </p>
                <p className="text-yellow-600 text-sm font-medium">◯ Next Step</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <Mail className="text-gray-400" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Quality Check & Shipping</h3>
                <p className="text-gray-600 text-sm">
                  Once production is complete (5-7 business days), we&apos;ll ship your order and send tracking info.
                </p>
                <p className="text-gray-400 text-sm">◯ Pending</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4 mt-1">
                <Truck className="text-gray-400" size={16} />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Your custom embroidered items will arrive in 3-5 business days after shipping.
                </p>
                <p className="text-gray-400 text-sm">◯ Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Production Notes */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Production Notes
          </h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Your custom embroidery will be produced exactly as designed</li>
              <li>• High-quality threads and precision stitching guaranteed</li>
              <li>• Each item is inspected before shipping</li>
              <li>• Production time: 5-7 business days</li>
              <li>• Shipping time: 3-5 business days</li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customize" className="btn-primary">
              Design Another Item
            </Link>
            <Link href="/" className="btn-secondary">
              Return to Home
            </Link>
          </div>
          
          <div className="text-sm text-gray-500">
            <p>You&apos;ll receive email updates about your order status.</p>
            <p>Save your order number: <strong>{orderNumber}</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}