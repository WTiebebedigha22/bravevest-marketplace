import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Check,
  ChevronRight,
  PenLine,
  Search,
  Wallet,
  Clock,
  CheckCircle,
  ShieldCheck,
  Lock,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';

const STATS_BY_YEAR = [
  { year: '2021-22', value: 18.5, label: '₦18.5M', color: '#FFFFFF', border: true },
  { year: '2022-23', value: 32, label: '₦32M', color: '#F1E8FB' },
  { year: '2023-24', value: 55.3, label: '₦55.3M', color: '#D4B8FB' },
  { year: '2024-25', value: 78.6, label: '₦78.6M', color: '#B3D941', highlight: true },
];

const STEPS = [
  {
    step: 1,
    title: 'Enter\nYour Details',
    shortDesc: 'Enter your complete detail information to get hassle-free process.',
    icon: PenLine,
    bgColor: 'bg-[#3FB8C4]',
    textColor: 'text-white',
    accentColor: 'bg-white/20',
    details: [
      'Free registration with email or phone',
      'Choose investor or borrower role',
      'Set your investment preferences',
      '2FA security enabled by default'
    ]
  },
  {
    step: 2,
    title: 'Finding\nThe Right Loans',
    shortDesc: 'Finding the right amount parameters tailored to your financial goals.',
    icon: Search,
    bgColor: 'bg-[#C9A6F2]',
    textColor: 'text-black',
    accentColor: 'bg-white/40',
    details: [
      'Filter by category, risk, and return',
      'View detailed investment metrics',
      'Calculate projected returns',
      'Instant AI-powered matching'
    ]
  },
  {
    step: 3,
    title: 'Payment\nOptions',
    shortDesc: 'Flexible payment options with schedule tailored for you.',
    icon: Wallet,
    bgColor: 'bg-[#B3D941]',
    textColor: 'text-black',
    accentColor: 'bg-black/10',
    details: [
      'Bank transfers (Instant settlement)',
      'Card payments (Visa/Mastercard)',
      'Automated payout schedules',
      'Multi-currency support'
    ]
  }
];

// Stock images from Unsplash (free to use, hotlink-friendly)
const STOCK_IMAGES = {
  businessLoan:
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  personalLoan:
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
};

export default function HomePage() {
  const [amount, setAmount] = useState(7500000);
  const [expandedStep, setExpandedStep] = useState(null);
  const min = 500000;
  const max = 50000000;

  const toggleStep = (stepNumber) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  const formatNairaShort = (num) => {
    if (num >= 1000000) {
      return `₦${(num / 1000000).toLocaleString('en-NG')}M`;
    }
    return `₦${(num / 1000).toLocaleString('en-NG')}K`;
  };

  return (
    <div className="bg-white text-[#0F0F10] font-sans antialiased selection:bg-[#B3D941] selection:text-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pb-28">
        {/* Soft Ambient Radial Background Blur */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] blur-3xl opacity-60 pointer-events-none rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(179,217,65,0.35) 0%, rgba(201,166,242,0.3) 45%, rgba(255,255,255,0) 75%)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="md:col-span-7">
            <h1 className="font-serif font-medium text-6xl md:text-7xl lg:text-[82px] leading-[1.04] tracking-tight mb-6 text-black">
              Completely
              <br />
              Hassle-Free
              <br />
              Process.
            </h1>

            <p className="text-sm md:text-base leading-relaxed mb-8 max-w-md text-gray-700 font-medium">
              Loan products and the competition for new customers is fierce — finding the right loan can seem difficult.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Link to="/register">
                <button className="bg-black text-white px-7 py-3.5 rounded-full text-xs font-semibold hover:bg-black/90 transition-all shadow-sm">
                  Get Started
                </button>
              </Link>

              <Link to="/opportunities">
                <button className="border border-gray-300 text-black px-6 py-3.5 rounded-full text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                  Chat With Experts
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-gray-700 font-bold">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black stroke-[3]" /> Safe and Secure
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black stroke-[3]" /> No Document Hassled
              </span>
            </div>
          </div>

          {/* Right Floating Interactive Loan Calculator Card */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div
              className="bg-white rounded-[28px] p-7 w-full max-w-sm border border-gray-100"
              style={{ boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.12)' }}
            >
              <div className="flex items-center justify-between text-[11px] text-gray-600 font-semibold mb-5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full border border-gray-400" />
                  Compare The Banks Interest Rates
                </span>
              </div>

              <div className="text-center mb-6">
                <p className="text-xs text-gray-500 mb-1 font-semibold">Select Loan Amount</p>
                <p className="text-3xl font-extrabold tracking-tight text-black">
                  NGN ₦{amount.toLocaleString('en-NG')}
                </p>
              </div>

              {/* Multi-colored Gradient Progress Bar */}
              <div className="relative mb-2">
                <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-[#B3D941] opacity-90" />
              </div>

              <div className="flex justify-between text-[10px] text-gray-600 font-bold mb-6">
                <span>{formatNairaShort(min)}</span>
                <span>{formatNairaShort(max)}</span>
              </div>

              <input
                type="range"
                min={min}
                max={max}
                step={500000}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black mb-6"
              />

              <Link to="/register">
                <button className="w-full bg-black text-white py-3.5 rounded-full text-xs font-bold hover:bg-black/90 transition-colors mb-4">
                  Start Now
                </button>
              </Link>

              <div className="flex justify-between items-center text-[11px] text-gray-600 font-semibold px-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-500" /> 20 Mins In Bank
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-gray-500" /> Quick And Easy Booking
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar Chart Section */}
      <section className="py-16 md:py-24 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid md:grid-cols-12 gap-8 items-start mb-12">
            <div className="md:col-span-5">
              <h2 className="font-serif font-medium text-4xl md:text-5xl leading-tight mb-3 text-black">
                Loan Success Till
                <br />
                Today —
              </h2>
              <p className="text-xs text-gray-500 font-semibold">Some previous stats of Growth / Year</p>
            </div>
            <div className="md:col-span-7 flex md:justify-end items-baseline">
              <span className="font-serif font-medium text-6xl md:text-8xl tracking-tight text-black">
                ₦78.2M
              </span>
            </div>
          </div>

          {/* Vertical Bar Grid matching screenshot */}
          <div className="grid grid-cols-4 gap-0 items-end h-[280px] border-b border-gray-200">
            {STATS_BY_YEAR.map((s) => (
              <div key={s.year} className="flex flex-col justify-end h-full px-1 md:px-2">
                <div
                  className="w-full flex items-start p-3 md:p-4 text-xs md:text-sm font-bold transition-all duration-300 hover:opacity-90 rounded-t-sm"
                  style={{
                    height: `${(s.value / 85) * 100}%`,
                    backgroundColor: s.color,
                    border: s.border ? '1px solid #E5E7EB' : 'none',
                    borderBottom: 'none',
                    color: '#0F0F10',
                  }}
                >
                  {s.label}
                </div>
                <div className="py-3 text-[11px] md:text-xs text-gray-500 font-semibold border-t border-gray-200 text-left pl-1">
                  {s.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Should You Use Bravevest Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif font-medium text-4xl md:text-5xl text-center mb-16 text-black">
            Why Should You Use
            <br />
            BraveVest?
          </h2>

          <div className="space-y-16">
            {/* Business Loan Row */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-purple-300 via-purple-100 to-green-200 p-8 min-h-[340px] flex items-center justify-center">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl bg-white">
                    <div className="overflow-hidden">
                      <img
                        src={STOCK_IMAGES.businessLoan}
                        alt="Business loan consultation between two professionals"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white">
                      <div>
                        <p className="text-xs font-extrabold text-black">Business Loan</p>
                        <p className="text-[10px] text-gray-500 font-medium">Employed &amp; Urgent Financial Needs</p>
                      </div>
                      <span className="w-7 h-7 bg-[#B3D941] rounded-lg flex items-center justify-center font-extrabold text-xs">
                        W
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 md:pl-8">
                <span className="text-xs text-gray-500 font-bold block mb-2">Business Loan</span>
                <h3 className="font-serif font-medium text-3xl md:text-4xl mb-4 leading-tight text-black">
                  Refreshingly Instant
                  <br />
                  Business Loan
                </h3>
                <p className="text-sm text-gray-700 font-medium mb-6 max-w-sm leading-relaxed">
                  We use all our creative might to bring you the best loan, at the best price, just for your needs.
                </p>
                <Link to="/register">
                  <button className="bg-black text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-black/90 transition-colors">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>

            {/* Personal Loan Row */}
            <div className="grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-6 md:order-2">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-green-300 via-green-100 to-emerald-200 p-8 min-h-[340px] flex items-center justify-center">
                  <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl bg-white">
                    <div className="overflow-hidden">
                      <img
                        src={STOCK_IMAGES.personalLoan}
                        alt="Person reviewing personal finance documents and planning a loan"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white">
                      <div>
                        <p className="text-xs font-extrabold text-black">Personal Loan</p>
                        <p className="text-[10px] text-gray-500 font-medium">Fast Flexible Approvals</p>
                      </div>
                      <span className="w-7 h-7 bg-purple-300 rounded-lg flex items-center justify-center font-extrabold text-xs">
                        P
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 md:order-1 md:pr-8">
                <span className="text-xs text-gray-500 font-bold block mb-2">Personal Loan</span>
                <h3 className="font-serif font-medium text-3xl md:text-4xl mb-4 leading-tight text-black">
                  Individual Short Term
                  <br />
                  Personal Loan
                </h3>
                <p className="text-sm text-gray-700 font-medium mb-6 max-w-sm leading-relaxed">
                  We provide personal loan based on Credit Score. Get in 5 mins or less.
                </p>
                <Link to="/register">
                  <button className="bg-black text-white px-7 py-3 rounded-full text-xs font-bold hover:bg-black/90 transition-colors">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (Interactive Step Accordions from HowItWorksPage) */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif font-medium text-4xl md:text-5xl text-center mb-3 text-black">
            How It Works?
          </h2>
          <p className="text-center text-xs text-gray-500 font-semibold max-w-sm mx-auto mb-16 leading-relaxed">
            There are plenty of loan providers, loan products and the competition for new customers is fierce.
          </p>

          <div className="grid md:grid-cols-3 gap-6 items-start">
            {STEPS.map((stepItem) => {
              const Icon = stepItem.icon;
              const isExpanded = expandedStep === stepItem.step;

              return (
                <div
                  key={stepItem.step}
                  onClick={() => toggleStep(stepItem.step)}
                  className={`${stepItem.bgColor} ${stepItem.textColor} rounded-3xl p-8 flex flex-col justify-between shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    isExpanded ? 'min-h-[380px] ring-2 ring-black/20' : 'h-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div className={`w-9 h-9 ${stepItem.accentColor} rounded-xl flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] tracking-wider uppercase opacity-75 font-bold">
                        Step {stepItem.step}
                      </span>
                    </div>

                    <h3 className="font-serif font-medium text-2xl leading-snug whitespace-pre-line mb-3">
                      {stepItem.title}
                    </h3>

                    <p className="text-[11px] opacity-85 font-medium leading-relaxed">
                      {stepItem.shortDesc}
                    </p>
                  </div>

                  {/* Expandable Details Section */}
                  {isExpanded ? (
                    <div className="mt-4 pt-4 border-t border-current/20 space-y-2 animate-fade-in text-xs font-medium opacity-90">
                      <p className="font-bold text-[11px]">Key details:</p>
                      {stepItem.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-[11px] font-bold mt-4 opacity-75 hover:opacity-100">
                      <span>Click to see details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Security Bar (Adopted from HowItWorksPage) */}
      <section className="py-10 border-t border-gray-100 bg-gray-50/60">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-bold text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-black" />
              <span>SEC Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-black" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-black" />
              <span>10,000+ Active Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-black" />
              <span>4.8★ Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}