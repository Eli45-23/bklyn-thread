import Link from 'next/link'
import { ArrowLeft, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
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
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/customize" className="text-gray-600 hover:text-blue-600">Customize</Link>
              <Link href="/faq" className="text-gray-600 hover:text-blue-600">FAQ</Link>
              <Link href="/cart" className="text-gray-600 hover:text-blue-600">Cart</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-1" />
          Back to Home
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4">
            Contact BKLYN Thread
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Questions about your order? Need design help? We&apos;re here to help you create the perfect custom embroidery!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Send us a message
            </h2>
            <form className="space-y-4">
              <div>
                <label className="form-label">Name</label>
                <input type="text" className="form-input" />
              </div>
              <div>
                <label className="form-label">Email</label>
                <input type="email" className="form-input" />
              </div>
              <div>
                <label className="form-label">Order Number (if applicable)</label>
                <input type="text" className="form-input" />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea rows={4} className="form-input"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@bklynthread.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Issues?
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                For faster service with order-related questions, please have your order number ready.
              </p>
              <p className="text-sm text-gray-500">
                Typical response time: 2-4 hours during business hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}