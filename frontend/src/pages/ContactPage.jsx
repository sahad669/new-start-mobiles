import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Loader2,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock3,
  Send,
  Building2,
  Headphones,
} from "lucide-react";
import axiosInstants from "../axiosInstants";

const branchData = [
  {
    title: "Main Shop",
    name: "New Start Mobiles",
    location: "Western Region Beda Zayed Sanaya Abu Dhabi",
    phone: "028843107",
    whatsapp: "+971567574124",
    email: "newstarsalesuae@gmail.com",
    mapLink:
      "https://www.google.com/maps/place/23%C2%B039'35.1%22N+53%C2%B043'37.8%22E/@23.6597538,53.7245865,17z/data=!3m1!4b1!4m4!3m3!8m2!3d23.6597538!4d53.7271614?hl=en&entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
    badge: "Main Store",
  },
  {
    title: "Branch 1",
    name: "New Start Mobiles",
    location: "Beda Zayed - Sanaya - near bigmart  - Abu Dhabi - UAE",
    phone: "+971523423547",
    whatsapp: "+971523423547",
    email: "newstarsalesuae@gmail.com",
    mapLink: "https://maps.google.com",
    
  },
  {
    title: "Branch 2",
    name: "New Start Mobiles",
    location: "Musaffah M-17 - Abu Dhabi - UAE",
    phone: "026433556",
    whatsapp: "+971566986693",
    email: "newstarsalesuae@gmail.com",
    mapLink: "https://maps.google.com",
   
  },
];

const infoCards = [
  {
    icon: Phone,
    title: "Call Us",
    value: "028843107",
    sub: "Quick support for products and repairs",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp",
    value: "+971567574124",
    sub: "Fast replies for orders and inquiries",
  },
  {
    icon: Mail,
    title: "Email",
    value: "newstarsalesuae@gmail.com",
    sub: "Business and general contact",
  },
  {
    icon: Clock3,
    title: "Store Support",
    value: "Open Daily",
    sub: "Visit us for devices, repairs, and accessories",
  },
];

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get("user_name")?.trim();
    const email = formData.get("user_email")?.trim();
    const phone = formData.get("user_phone")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !phone || !message) {
      toast.error("Please fill all the fields!");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstants.post("/contactform", {
        name,
        email,
        phone,
        message,
      });

      toast.success(res.data.message);
      form.current.reset();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error sending message!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-indigo-50 pt-28 sm:pt-32 pb-16 sm:pb-20">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 left-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-100/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 backdrop-blur-md px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
            <Headphones className="w-4 h-4" />
            Customer Support & Store Contact
          </div>

          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
            Contact New Star Mobiles
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Reach our team for product inquiries, repair support, branch
            locations, and order help. We’re here to make your shopping and
            service experience smooth and professional.
          </p>
        </div>

        {/* Top info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-12 sm:mb-16">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/60 bg-white/75 backdrop-blur-xl p-6 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg mb-5 group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-base font-semibold text-emerald-700 wrap-break-word">
                  {card.value}
                </p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                  {card.sub}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left content */}
          <div className="xl:col-span-7 space-y-8">
            {/* Main branch highlight */}
            <div className="rounded-[28px] border border-white/60 bg-white/80 backdrop-blur-xl shadow-xl shadow-slate-200/60 overflow-hidden">
              <div className="bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 px-6 sm:px-8 py-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-emerald-300 text-sm font-semibold uppercase tracking-[0.2em]">
                      Featured Location
                    </p>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                      Main Shop
                    </h2>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold border border-white/10">
                    Main Shop
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-6">
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Shop Name</p>
                      <p className="text-base font-bold text-slate-900">New Star Mobiles</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Location</p>
                      <p className="text-base text-slate-700 leading-relaxed">
                        Western Region Beda Zayed Sanaya Abu Dhabi
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-cyan-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Phone</p>
                      <p className="text-base font-semibold text-slate-800">028843107</p>
                      <p className="text-sm text-slate-500 mt-1">WhatsApp: +971567574124</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">Email</p>
                      <a
                        href="mailto:newstarsalesuae@gmail.com"
                        className="text-base font-semibold text-slate-800 hover:text-emerald-600 transition-colors break-all"
                      >
                        newstarsalesuae@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 pt-2">
                  <a
                    href="https://www.google.com/maps/place/23%C2%B039'35.1%22N+53%C2%B043'37.8%22E/@23.6597538,53.7245865,17z/data=!3m1!4b1!4m4!3m3!8m2!3d23.6597538!4d53.7271614?hl=en&entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-emerald-600 to-teal-600 px-6 py-4 text-white font-bold shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300"
                  >
                    <MapPin className="w-5 h-5" />
                    View on Google Maps
                  </a>

                  <a
                    href="https://wa.me/971567574124"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-slate-800 font-semibold shadow-sm hover:shadow-md hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Other branches */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Other Branches
                </h2>
                <p className="mt-2 text-slate-600">
                  Visit the nearest branch for support, accessories, and device services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {branchData.slice(1).map((branch, index) => (
                  <div
                    key={index}
                    className="group rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl p-6 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {branch.title}
                        </h3>
                       
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-slate-900 to-indigo-900 flex items-center justify-center shadow-lg">
                        <Building2 className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="space-y-4 text-sm sm:text-base">
                      <p className="text-slate-700">
                        <span className="font-bold text-slate-900">Name:</span>{" "}
                        {branch.name}
                      </p>
                      <p className="text-slate-700">
                        <span className="font-bold text-slate-900">Phone:</span>{" "}
                        {branch.whatsapp}
                      </p>
                      <p className="text-slate-700 break-all">
                        <span className="font-bold text-slate-900">Email:</span>{" "}
                        <a
                          href={`mailto:${branch.email}`}
                          className="hover:text-emerald-600 transition-colors"
                        >
                          {branch.email}
                        </a>
                      </p>
                      <p className="text-slate-700">
                        <span className="font-bold text-slate-900">Location:</span>{" "}
                        {branch.location}
                      </p>
                    </div>

                    <a
                      href={branch.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-5 py-3 text-slate-800 font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-all duration-300"
                    >
                      <MapPin className="w-4 h-4" />
                      View on Map
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="xl:col-span-5">
            <div className="sticky top-28 rounded-[28px] border border-white/60 bg-white/85 backdrop-blur-xl shadow-2xl shadow-slate-200/70 overflow-hidden">
              <div className="bg-linear-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 sm:px-8 py-6 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
                  Quick Contact
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                  Send Us a Message
                </h2>
                <p className="mt-2 text-emerald-50/90 text-sm sm:text-base">
                  Ask about products, repairs, pricing, or branch availability.
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="user_name"
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-bold text-slate-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="user_email"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-bold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="user_phone"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                        placeholder="+971 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-bold text-slate-700">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="6"
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5 text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-slate-900 via-indigo-900 to-slate-900 px-6 py-4 text-white font-bold shadow-xl hover:shadow-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-center">
                    We usually respond as quickly as possible during working hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;