import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import PortfolioAPI from '../services/api.js';

const ContactForm = ({ isGreen, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await PortfolioAPI.submitContact(formData);
      
      if (response.success) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', message: '' });
        if (onSubmitSuccess) onSubmitSuccess();
      } else {
        setSubmitStatus({ type: 'error', message: response.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <div className="space-y-4">
      {/* Contact Info Header */}
      <div className={`text-center p-4 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg ${isGreen ? 'bg-green-500/5' : 'bg-red-500/5'}`}>
        <h3 className="text-xl font-semibold text-white mb-2">Get In Touch</h3>
        <p className="text-zinc-300">Send me a message or use the contact info below</p>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <User className="w-4 h-4" />
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 bg-zinc-900 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 ${isGreen ? 'focus:ring-green-500/50' : 'focus:ring-red-500/50'} transition-all`}
              placeholder="Your name"
            />
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-zinc-400">
              <Mail className="w-4 h-4" />
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-3 py-2 bg-zinc-900 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 ${isGreen ? 'focus:ring-green-500/50' : 'focus:ring-red-500/50'} transition-all`}
              placeholder="your.email@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-zinc-400">
            <MessageSquare className="w-4 h-4" />
            Message *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            className={`w-full px-3 py-2 bg-zinc-900 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 ${isGreen ? 'focus:ring-green-500/50' : 'focus:ring-red-500/50'} transition-all resize-none`}
            placeholder="Tell me about your project, collaboration idea, or just say hello!"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
            isFormValid && !isSubmitting
              ? `${isGreen ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`
              : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>

      {/* Status Message */}
      {submitStatus && (
        <div className={`p-3 rounded-lg text-sm ${
          submitStatus.type === 'success' 
            ? `${isGreen ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'} text-green-400`
            : 'bg-red-500/10 border border-red-500/30 text-red-400'
        }`}>
          {submitStatus.message}
        </div>
      )}

      {/* Contact Info */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className={`flex items-center gap-3 p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
          <Mail className={`w-5 h-5 ${isGreen ? 'text-green-400' : 'text-red-400'}`} />
          <div>
            <p className="text-zinc-400 text-sm">Email</p>
            <p className="text-white">kalpicksharma@gmail.com</p>
          </div>
        </div>
        <div className={`flex items-center gap-3 p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
          <div className={`${isGreen ? 'text-green-400' : 'text-red-400'}`}>📱</div>
          <div>
            <p className="text-zinc-400 text-sm">Phone</p>
            <p className="text-white">+91-8810308974</p>
          </div>
        </div>
      </div>
      
      <div className={`text-center p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
        <p className="text-zinc-400 text-sm">Location</p>
        <p className="text-white">Delhi, India</p>
      </div>
    </div>
  );
};

export default ContactForm;
