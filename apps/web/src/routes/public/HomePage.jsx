// apps/web/src/routes/public/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ShieldCheck,
  FileCheck2,
  Users,
  PenLine,
  Search,
  Wallet,
  TrendingUp,
  Building2,
  Home,
  Coins,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Clock,
  Award,
  Globe,
  Zap
} from 'lucide-react';

const STATS_BY_YEAR = [
  { year: '2021-22', value: 8.5, label: '₦8.5B' },
  { year: '2022-23', value: 18, label: '₦18B' },
  { year: '2023-24', value: 32, label: '₦32B' },
  { year: '2024-25', value: 50, label: '₦50B', highlight: true },
];

const opportunities = [
  { 
    title: 'Green Energy Infrastructure Fund',
    category: 'Projects',
    return: '18%',
    tenure: '24 months',
    minInvestment: '₦50,000',
    risk: 'Medium',
    raised: '62%',
    icon: TrendingUp,
    color: 'from-green-400 to-green-600'
  },
  { 
    title: 'Luxury Apartment Development',
    category: 'Property',
    return: '22%',
    tenure: '36 months',
    minInvestment: '₦250,000',
    risk: 'Low',
    raised: '45%',
    icon: Home,
    color: 'from-blue-400 to-blue-600'
  },
  { 
    title: 'AgriTech Innovation Fund',
    category: 'Projects',
    return: '15%',
    tenure: '18 months',
    minInvestment: '₦25,000',
    risk: 'Medium',
    raised: '78%',
    icon: Building2,
    color: 'from-amber-400 to-amber-600'
  },
  { 
    title: 'Real Estate Income Notes',
    category: 'Income',
    return: '12%',
    tenure: '12 months',
    minInvestment: '₦100,000',
    risk: 'Low',
    raised: '90%',
    icon: Coins,
    color: 'from-purple-400 to-purple-600'
  },
];

export default function HomePage() {
  const [amount, setAmount] = useState(2500000);
  const min = 100000;
  const max = 10000000;
  const pct = ((amount - min) / (max - min)) * 100;
  const formatNaira = (n) => `₦${n.toLocaleString('en-NG')}`;

  return (
    <div className="bg-white font-sans" style={{ color: '#111111' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-3/4 h-96 rounded-full blur-3xl opacity-70 pointer-events-none"
          style={{ background: 'linear-gradient(120deg, #BFE6B0 0%, #CFC3EE 45%, #F3CBDC 100%)' }}
        />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-brave-teal/10 text-brave-teal px-3 py-1 rounded-full text-xs font-medium mb-4">
              <Sparkles className="h-3 w-3" />
              Trusted by 10,000+ investors
            </div>
            <h1 className="font-serif font-light text-5xl md:text-6xl leading-tight mb-6">
              Regulated Access
              <br />to Real Investments.
            </h1>
            <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: '#5B5B5B' }}>
              Property, projects, income and group opportunities — every listing verified
              and every return tracked, in one platform built for Africa.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <Link to="/register">
                <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black/90 transition-colors">
                  Start Investing
                </button>
              </Link>
              <Link to="/opportunities">
                <button className="border px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors" style={{ borderColor: '#111111' }}>
                  Browse Opportunities
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm" style={{ color: '#333333' }}>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-brave-teal" /> SEC Compliant</span>
              <span className="flex items-center gap-1.5"><FileCheck2 className="w-4 h-4 text-brave-teal" /> Fully Verified</span>
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-brave-teal" /> 10K+ Investors</span>
            </div>
          </div>

          {/* Slider card */}
          <div
            className="bg-white rounded-3xl p-7 max-w-sm w-full md:ml-auto"
            style={{ boxShadow: '0 20px 60px -15px rgba(0,0,0,0.18)' }}
          >
            <p className="text-xs mb-4 flex items-center gap-1.5" style={{ color: '#8A8A8A' }}>
              <span className="w-4 h-4 inline-block rounded-full border" style={{ borderColor: '#8A8A8A' }} />
              Calculate Your Returns
            </p>
            <p className="text-xs mb-1" style={{ color: '#8A8A8A' }}>Investment Amount</p>
            <p className="text-3xl font-semibold mb-6">{formatNaira(amount)}</p>

            <input
              type="range"
              min={min}
              max={max}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
              style={{ background: `linear-gradient(90deg, #7FD0A8 0%, #8FB6E8 ${pct}%, #E9E9E9 ${pct}%)` }}
            />
            <div className="flex justify-between text-xs mb-6" style={{ color: '#9A9A9A' }}>
              <span>₦100,000</span>
              <span>₦10,000,000</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs mb-4" style={{ color: '#8A8A8A' }}>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <div className="font-semibold text-brave-teal">18%</div>
                <div>Projected Return</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <div className="font-semibold text-brave-teal">24mo</div>
                <div>Tenure</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-center">
                <div className="font-semibold text-brave-teal">₦50K</div>
                <div>Min Investment</div>
              </div>
            </div>

            <Link to="/register">
              <button className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-black/90 transition-colors mb-4">
                Start Now
              </button>
            </Link>

            <div className="flex justify-between text-xs" style={{ color: '#8A8A8A' }}>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> 10,000+ Investors</span>
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Safe &amp; Regulated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / bar chart */}
      <section className="py-16 md:py-20" style={{ borderTop: '1px solid #EFEFEF' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-10 items-end">
          <div>
            <h2 className="font-serif font-light text-3xl md:text-4xl mb-2 leading-tight">
              Capital Deployed
              <br />Till Date —
            </h2>
            <p className="text-sm mb-6" style={{ color: '#8A8A8A' }}>Cumulative investment volume, by year</p>
            <p className="font-serif text-5xl md:text-6xl">₦50B+</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ background: '#A9E24B' }}></div>
                <span style={{ color: '#8A8A8A' }}>Current Year</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-3 h-3 rounded-full" style={{ background: '#F1EFF6' }}></div>
                <span style={{ color: '#8A8A8A' }}>Previous Years</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 items-end" style={{ height: '240px' }}>
            {STATS_BY_YEAR.map((s) => (
              <div key={s.year} className="flex flex-col justify-end h-full">
                <div
                  className="rounded-t-md w-full flex items-start justify-center pt-3 text-sm font-medium transition-all duration-500 hover:scale-105"
                  style={{
                    height: `${(s.value / 50) * 100}%`,
                    background: s.highlight ? '#A9E24B' : '#F1EFF6',
                    minHeight: '48px',
                    color: '#3A3A3A',
                  }}
                >
                  {s.label}
                </div>
                <div className="pt-2 text-xs text-center" style={{ borderTop: '1px solid #E5E5E5', color: '#8A8A8A' }}>
                  {s.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Opportunities */}
      <section className="py-16 md:py-20" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="font-serif font-light text-3xl md:text-4xl">Featured Opportunities</h2>
              <p className="text-sm mt-2" style={{ color: '#8A8A8A' }}>Curated investments with strong fundamentals</p>
            </div>
            <Link to="/opportunities">
              <button className="text-sm flex items-center gap-1 text-brave-teal hover:underline">
                View All <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {opportunities.map((opp, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${opp.color} flex items-center justify-center mb-3`}>
                  <opp.icon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs text-brave-teal font-medium mb-1">{opp.category}</p>
                <h4 className="font-semibold text-sm mb-2">{opp.title}</h4>
                <div className="space-y-1 text-xs" style={{ color: '#8A8A8A' }}>
                  <div className="flex justify-between">
                    <span>Return</span>
                    <span className="font-semibold text-brave-teal">{opp.return}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tenure</span>
                    <span>{opp.tenure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min Investment</span>
                    <span>{opp.minInvestment}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: '#8A8A8A' }}>Funded</span>
                    <span className="font-medium">{opp.raised}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-brave-teal h-1.5 rounded-full"
                      style={{ width: opp.raised }}
                    />
                  </div>
                </div>
                <Link to={`/opportunities/${index + 1}`}>
                  <button className="w-full mt-3 text-xs border rounded-full py-1.5 hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why BraveVest — alternating cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif font-light text-3xl md:text-4xl text-center mb-14">
            Why Invest With BraveVest?
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8 items-center">
            <div
              className="rounded-3xl p-6 flex flex-col justify-between text-white min-h-[18rem]"
              style={{ background: 'linear-gradient(160deg, #7B5FE0 0%, #C9B8E8 100%)' }}
            >
              <span className="bg-white text-black text-xs px-3 py-1 rounded-full w-fit">Property Fund · 4.9</span>
              <div>
                <p className="text-sm" style={{ opacity: 0.9 }}>
                  Vetted real estate opportunities, fractionalized from ₦250,000.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Fractional</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Rental Income</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs mb-2" style={{ color: '#8A8A8A' }}>Property Investment</p>
              <h3 className="font-serif text-2xl md:text-3xl mb-3 leading-snug">
                Own a Share of
                <br />Verified Real Estate
              </h3>
              <p className="text-sm mb-5 max-w-sm" style={{ color: '#5B5B5B' }}>
                We underwrite every listing and publish the numbers up front, so you know
                exactly what you're buying into.
              </p>
              <Link to="/opportunities">
                <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm hover:bg-black/90 transition-colors">
                  Invest Now
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xs mb-2" style={{ color: '#8A8A8A' }}>Income Fund</p>
              <h3 className="font-serif text-2xl md:text-3xl mb-3 leading-snug">
                Steady Payouts,
                <br />Set On Your Schedule
              </h3>
              <p className="text-sm mb-5 max-w-sm" style={{ color: '#5B5B5B' }}>
                Fixed-income opportunities matched to your goals, with monthly or quarterly
                payout options.
              </p>
              <Link to="/opportunities">
                <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm hover:bg-black/90 transition-colors">
                  Apply Now
                </button>
              </Link>
            </div>
            <div
              className="order-1 md:order-2 rounded-3xl p-6 flex flex-col justify-between text-white min-h-[18rem]"
              style={{ background: 'linear-gradient(160deg, #4E9F6E 0%, #A9E24B 100%)' }}
            >
              <span className="bg-white text-black text-xs px-3 py-1 rounded-full w-fit">Income Fund · 4.8</span>
              <div>
                <p className="text-sm" style={{ opacity: 0.9 }}>
                  Earn from 12% projected annual returns, paid out on schedule.
                </p>
                <div className="flex gap-2 mt-3">
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Monthly Payouts</span>
                  <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">Low Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20" style={{ background: '#FAFAF9' }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif font-light text-3xl md:text-4xl text-center mb-3">How It Works</h2>
          <p className="text-center text-sm mb-12 max-w-md mx-auto" style={{ color: '#8A8A8A' }}>
            Getting started takes minutes — verify once, then invest at your own pace.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-2xl p-7 text-white transition-transform hover:-translate-y-1" style={{ background: '#2AA9A0' }}>
              <p className="text-xs mb-8" style={{ opacity: 0.8 }}>Step 1</p>
              <PenLine className="w-6 h-6 mb-4" />
              <h3 className="font-serif text-xl mb-2">Verify Your Details</h3>
              <p className="text-sm" style={{ opacity: 0.9 }}>Complete KYC once — securely, in a few minutes.</p>
            </div>
            <div className="rounded-2xl p-7 text-white transition-transform hover:-translate-y-1" style={{ background: '#8B5FBF' }}>
              <p className="text-xs mb-8" style={{ opacity: 0.8 }}>Step 2</p>
              <Search className="w-6 h-6 mb-4" />
              <h3 className="font-serif text-xl mb-2">Find the Right Opportunity</h3>
              <p className="text-sm" style={{ opacity: 0.9 }}>Filter by product, return, and time horizon.</p>
            </div>
            <div className="rounded-2xl p-7 transition-transform hover:-translate-y-1" style={{ background: '#A9E24B', color: '#1A1A1A' }}>
              <p className="text-xs mb-8" style={{ opacity: 0.7 }}>Step 3</p>
              <Wallet className="w-6 h-6 mb-4" />
              <h3 className="font-serif text-xl mb-2">Get Paid Out</h3>
              <p className="text-sm" style={{ opacity: 0.8 }}>Track returns and receive payouts on schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-brave-teal" />
              <span>SEC Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-5 w-5 text-brave-teal" />
              <span>Verified Listings</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-brave-teal" />
              <span>10,000+ Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-brave-teal" />
              <span>4.8★ Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-brave-teal" />
              <span>Pan-African</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brave-teal" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <h2 className="font-serif font-light text-3xl md:text-4xl mb-4">Ready to Grow Your Wealth?</h2>
          <p className="mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Join thousands of investors building their financial future with BraveVest.
            Start with as little as ₦10,000.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <button className="bg-white text-black px-7 py-3 rounded-full text-sm font-medium hover:bg-gray-100 transition-colors">
                Create Free Account
              </button>
            </Link>
            <Link to="/opportunities">
              <button className="border border-white/30 text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                Browse Opportunities
              </button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-white/40">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-brave-lime" />
              No hidden fees
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-brave-lime" />
              SEC regulated
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-brave-lime" />
              Withdraw anytime
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}