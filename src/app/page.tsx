import Link from 'next/link'
import { ArrowRight, Star, Truck, Clock, Shield } from 'lucide-react'

export default function Home() {
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
              <Link href="/customize" className="text-gray-600 hover:text-blue-600">
                Customize
              </Link>
              <Link href="/faq" className="text-gray-600 hover:text-blue-600">
                FAQ
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                Contact
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-blue-600">
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            BKLYN Thread Custom Embroidery
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Brooklyn&apos;s premier custom embroidery service. Create stunning embroidered apparel with our easy-to-use design tool. 
            Professional quality, competitive pricing, and fast turnaround.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/customize" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2">
              <span>Start Designing</span>
              <ArrowRight size={20} />
            </Link>
            <Link href="/faq" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose BKLYN Thread?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                Professional-grade embroidery with high-quality threads and precision stitching.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Turnaround
              </h3>
              <p className="text-gray-600">
                Most orders completed in 5-7 business days with express options available.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Satisfaction Guaranteed
              </h3>
              <p className="text-gray-600">
                We stand behind our work with a 100% satisfaction guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Popular Products
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'T-Shirts', price: '$15.99', image: '/images/tshirt.jpg' },
              { name: 'Baseball Caps', price: '$19.99', image: '/images/cap.jpg' },
              { name: 'Hoodies', price: '$39.99', image: '/images/hoodie.jpg' },
              { name: 'Polo Shirts', price: '$24.99', image: '/images/polo.jpg' }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{product.name}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600">Starting at {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Choose Product', desc: 'Select from shirts, hats, hoodies, and more' },
              { step: '2', title: 'Design', desc: 'Upload your design or add custom text' },
              { step: '3', title: 'Customize', desc: 'Pick colors, placement, and quantity' },
              { step: '4', title: 'Order', desc: 'Secure checkout and fast delivery' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Create Your Custom Embroidery?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust us with their custom embroidery needs.
          </p>
          <Link href="/customize" className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg inline-flex items-center space-x-2 transition-colors">
            <span>Start Your Design</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">BKLYN Thread</h3>
              <p className="text-gray-400">
                Brooklyn&apos;s premier custom embroidery service for all your apparel needs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/customize" className="hover:text-white">Customize</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@bklynthread.com</li>
                <li>Hours: Mon-Fri 9AM-6PM</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Guarantee</h4>
              <div className="flex items-center space-x-2 text-gray-400">
                <Truck size={16} />
                <span>Free shipping over $50</span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BKLYN Thread. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}