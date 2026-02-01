import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get("user_name").trim();
    const email = formData.get("user_email").trim();
    const phone = formData.get("user_phone").trim();
    const message = formData.get("message").trim();

    if (!name || !email || !phone || !message) {
      toast.error("Please fill all the fields!");
      return; // stop the function from sending email
    }
    setLoading(true);
    try {
      const result = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
       import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      toast.success("Message sent successfully!");
      form.current.reset();
    } catch (error) {
      toast.error("Error sending message!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 pt-30">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

      {/* Main Shop Info */}
      <div className="bg-slate-100 p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-2">Main Shop</h2>
        <p>
          <strong>Name:</strong> Your Shop Name
        </p>
        <p>
          <strong>Location:</strong> 123 Main Street, City, Country
        </p>
        <p>
          <strong>Mobile:</strong> +971 50 123 4567
        </p>
        <p>
          <strong>Email:</strong> info@yourshop.com
        </p>
        <p>
          <strong>Google Map:</strong>{" "}
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View on Map
          </a>
        </p>
      </div>

      {/* Branches Info */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Branch 1</h3>
          <p>
            <strong>Name:</strong> Branch 1 Name
          </p>
          <p>
            <strong>Email:</strong> branch1@yourshop.com
          </p>
          <p>
            <strong>Phone:</strong> +971 50 234 5678
          </p>
          <p>
            <strong>Location:</strong>{" "}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on Map
            </a>
          </p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Branch 2</h3>
          <p>
            <strong>Name:</strong> Branch 2 Name
          </p>
          <p>
            <strong>Email:</strong> branch2@yourshop.com
          </p>
          <p>
            <strong>Phone:</strong> +971 50 345 6789
          </p>
          <p>
            <strong>Location:</strong>{" "}
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on Map
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-slate-100 p-6 rounded-lg shadow mt-20">
        <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="user_name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="user_email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="user_phone"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Phone Number"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Message"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 mx-auto" />
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
