import { useState } from 'react';
import { Mail, MapPin, Phone, Clock, Send, MessageSquare, Building2, Users, CheckCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '', category: 'general' });
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2265247/pexels-photo-2265247.jpeg"
          alt="Community connection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-600/90 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6 tracking-wide uppercase">
              Get In Touch
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl leading-tight">
              We Would Love to <span className="text-green-400">Hear From You</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
              Questions, partnerships, bulk orders, or farm inquiries -- reach out anytime
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Fill out the form below and our team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 sm:p-12 text-center">
                  <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base bg-white"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="orders">Orders & Delivery</option>
                        <option value="bulk">Bulk Orders</option>
                        <option value="partnership">Partnership</option>
                        <option value="farm">Farm in My Community</option>
                        <option value="careers">Careers</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                      <input
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="What is this about?"
                        className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Email</p>
                      <p className="text-sm text-gray-600">info@farmvora.com</p>
                      <p className="text-sm text-gray-600">orders@farmvora.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Phone</p>
                      <p className="text-sm text-gray-600">+234 801 234 5678</p>
                      <p className="text-sm text-gray-600">+234 901 234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Head Office</p>
                      <p className="text-sm text-gray-600">14 Innovation Drive, Ikorodu, Lagos, Nigeria</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Business Hours</p>
                      <p className="text-sm text-gray-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                      <p className="text-sm text-gray-600">Sat: 9:00 AM - 3:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-6">
                <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">WhatsApp Orders</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                  Prefer WhatsApp? Send your order directly to our WhatsApp line for fast processing.
                </p>
                <a
                  href="https://wa.me/2348012345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Partner With Us
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              We work with organizations, cooperatives, and communities to expand affordable protein access
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Corporate Partners</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Restaurants, hotels, and food processors can partner with us for waste collection while
                accessing affordable egg supplies for their businesses.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(prev => ({ ...prev, category: 'partnership' }));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
              >
                Learn More &rarr;
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Community Leaders</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Want a FarmVora farm in your community? We work with local leaders to identify locations,
                recruit operators, and set up sustainable egg production.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(prev => ({ ...prev, category: 'farm' }));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
              >
                Start a Farm &rarr;
              </button>
            </div>

            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 border border-gray-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Bulk Orders</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Schools, hospitals, and organizations can place bulk orders at special rates.
                We handle logistics and ensure consistent supply.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(prev => ({ ...prev, category: 'bulk' }));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
              >
                Get Quote &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
