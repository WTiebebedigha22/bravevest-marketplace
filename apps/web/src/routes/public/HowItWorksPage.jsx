// apps/web/src/routes/public/HowItWorksPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@bravevest/ui/components';
import {
  UserPlus,
  ShieldCheck,
  Wallet,
  Search,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Award,
  Zap,
  Users,
  Globe,
  Lock,
  Sparkles,
  ChevronDown
} from 'lucide-react';

const steps = [
  {
    step: 1,
    title: 'Create Free Account',
    description: 'Sign up as an investor in under 2 minutes with email or phone number.',
    icon: UserPlus,
    color: 'from-blue-500 to-indigo-600',
    badge: '2-Minute Setup',
    details: [
      'Instant access to open investment pools',
      'Choose individual or corporate account',
      'Two-Factor Authentication (2FA) protection',
      'No hidden onboarding or platform fees'
    ]
  },
  {
    step: 2,
    title: 'Identity Verification (KYC)',
    description: 'Verify your identity via automated checks to meet SEC regulatory standards.',
    icon: ShieldCheck,
    color: 'from-purple-500 to-violet-600',
    badge: 'Automated & Instant',
    details: [
      'Instant BVN / NIN cross-match verification',
      'Government ID validation (Driver\'s License, Passport)',
      'Liveness selfie check powered by AI',
      'Bank-grade data privacy and encryption'
    ]
  },
  {
    step: 3,
    title: 'Fund Wallet Secuely',
    description: 'Deposit funds instantly using bank transfer, debit cards, or USSD.',
    icon: Wallet,
    color: 'from-emerald-500 to-teal-600',
    badge: 'Regulated Custody',
    details: [
      'Instant bank transfers with dedicated Virtual Accounts',
      'Supports Visa, Mastercard, and Verve cards',
      'USSD code integration for mobile banking',
      'Funds managed in regulated escrow custodian accounts'
    ]
  },
  {
    step: 4,
    title: 'Select & Invest',
    description: 'Browse vetted high-yield opportunities across real estate, debt, and equity.',
    icon: Search,
    color: 'from-teal-500 to-cyan-600',
    badge: 'Vetted Deals',
    details: [
      'Comprehensive financial projections and risk ratings',
      'Filter opportunities by yield, duration, and sector',
      'Download audited project prospectuses and legal terms',
      'Automated diversification options available'
    ]
  },
  {
    step: 5,
    title: 'Track Portfolio & Earn',
    description: 'Watch your returns grow in real-time and withdraw directly to your bank account.',
    icon: TrendingUp,
    color: 'from-amber-500 to-orange-600',
    badge: 'Automated Payouts',
    details: [
      'Live dynamic dashboard tracking principal & interest',
      'Automated scheduled monthly or quarterly payouts',
      'One-click reinvestment feature for compound growth',
      'Tax-ready annual statement generator'
    ]
  }
];

const features = [
  {
    icon: ShieldCheck,
    title: 'SEC Regulated',
    description: 'Compliant with all capital market frameworks to guarantee investor safety.',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    icon: Lock,
    title: 'Bank-Grade Security',
    description: 'End-to-end 256-bit SSL encryption protecting funds and user identity.',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    icon: Award,
    title: 'Rigorously Vetted',
    description: 'Under 5% of proposed projects pass our rigorous risk committee evaluation.',
    color: 'text-amber-600 bg-amber-50'
  },
  {
    icon: Users,
    title: '10,000+ Active Pool',
    description: 'Co-invest alongside thousands of institutional and retail investors.',
    color: 'text-emerald-600 bg-emerald-50'
  },
  {
    icon: Globe,
    title: 'Pan-African Scale',
    description: 'Direct exposure to high-growth emerging infrastructure & debt opportunities.',
    color: 'text-teal-600 bg-teal-50'
  },
  {
    icon: Zap,
    title: 'Instant Settlements',
    description: 'Automated disbursement pipeline for effortless yields and payouts.',
    color: 'text-orange-600 bg-orange-50'
  }
];

const stats = [
  { value: '10,000+', label: 'Active Investors' },
  { value: '₦50 Billion+', label: 'Capital Deployed' },
  { value: '500+', label: 'Projects Completed' },
  { value: '18.4%', label: 'Avg. Historical APY' },
];

export default function HowItWorksPage() {
  const [expandedStep, setExpandedStep] = useState(1);

  const toggleStep = (step) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-800">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-950 pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-400 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Transparent Wealth Building</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
              How Investing Works on <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">BraveVest</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Build passive wealth through SEC-compliant, high-yield asset investments. Start earning in 5 clear, seamless steps.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl px-8 shadow-lg shadow-teal-500/25 transition-all">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-800 rounded-xl px-8 transition-all">
                  Explore Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Glassmorphism Bar */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {stats.map((stat, index) => (
              <div key={index} className={`${index > 0 ? 'pt-4 md:pt-0' : ''}`}>
                <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Steps Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Step-by-Step Wealth Generation
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Designed for ease of use, absolute transparency, and security at every stage.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-2 border-slate-200 ml-4 md:ml-32 space-y-8">
              {steps.map((item) => {
                const isExpanded = expandedStep === item.step;
                const Icon = item.icon;

                return (
                  <div key={item.step} className="relative pl-8 md:pl-10">
                    {/* Marker Badge on Line */}
                    <div className="absolute -left-[17px] top-1.5 flex items-center justify-center">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} text-white font-bold text-sm flex items-center justify-center shadow-md ring-4 ring-slate-50`}>
                        {item.step}
                      </div>
                    </div>

                    {/* Timeline Desktop Label */}
                    <div className="hidden md:block absolute -left-32 top-2 text-right w-24">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Step 0{item.step}
                      </span>
                    </div>

                    {/* Accordion Card */}
                    <div 
                      onClick={() => toggleStep(item.step)}
                      className={`bg-white rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden ${
                        isExpanded ? 'border-teal-500 shadow-md ring-1 ring-teal-500/20' : 'border-slate-200 shadow-sm hover:border-slate-300'
                      }`}
                    >
                      <div className="p-6 flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex-shrink-0 hidden sm:block">
                          <Icon className="h-6 w-6 text-slate-700" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                            <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
                        </div>

                        <div className="pt-1">
                          <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-teal-600' : ''}`} />
                        </div>
                      </div>

                      {/* Expandable Content */}
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50">
                          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">Key Highlights:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.details.map((detail, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                                <CheckCircle className="h-3.5 w-3.5 text-teal-600 flex-shrink-0" />
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Features */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Institutional Security for Retail Investors
            </h2>
            <p className="text-base md:text-lg text-slate-600">
              Every detail engineered to minimize risk and optimize capital returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border border-slate-200/80 shadow-none hover:shadow-md transition-shadow rounded-2xl">
                <CardHeader className="pb-2">
                  <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center mb-3`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-bold text-slate-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-teal-900/20 via-slate-950 to-slate-950" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Start Generating Yield Today
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Join 10,000+ investors already building real economic resilience with BraveVest. Minimum investments start as low as ₦10,000.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold rounded-xl px-8">
                  Create Your Account
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-800 text-slate-300 hover:bg-slate-900 rounded-xl px-8">
                  Browse Active Deals
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-teal-400" />
                Zero Setup Fees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-teal-400" />
                SEC Regulated Operations
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-teal-400" />
                Automated Bank Withdrawals
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}