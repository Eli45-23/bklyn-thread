export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600">
            Questions about your order? We&apos;re here to help!
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
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">info@bklynthread.com</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Hours</p>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM EST</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Issues?
              </h3>
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