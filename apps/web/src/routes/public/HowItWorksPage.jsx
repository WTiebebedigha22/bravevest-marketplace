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
  Clock,
  Award,
  Zap,
  Users,
  Building2,
  Landmark,
  Globe,
  Lock,
  Sparkles
} from 'lucide-react';

const steps = [
  {
    step: 1,
    title: 'Create Account',
    description: 'Sign up as an investor and complete your profile. Choose your investment preferences and get started in minutes.',
    icon: UserPlus,
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-600',
    details: [
      'Free registration with email or phone',
      'Choose investor or borrower role',
      'Set your investment preferences',
      '2FA security enabled by default'
    ]
  },
  {
    step: 2,
    title: 'Complete KYC',
    description: 'Verify your identity to start investing. We use secure, regulated KYC providers to ensure compliance.',
    icon: ShieldCheck,
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-600',
    details: [
      'BVN/NIN verification',
      'Government ID verification',
      'Selfie verification',
      'Address verification'
    ]
  },
  {
    step: 3,
    title: 'Fund Wallet',
    description: 'Add funds to your wallet via bank transfer, card, or USSD. Your funds are held in a regulated account.',
    icon: Wallet,
    color: 'from-green-400 to-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-600',
    details: [
      'Bank transfers (Instant settlement)',
      'Card payments (Visa/Mastercard)',
      'USSD for mobile users',
      'Multi-currency support'
    ]
  },
  {
    step: 4,
    title: 'Browse & Invest',
    description: 'Find opportunities that match your goals and invest. Access detailed information and projections.',
    icon: Search,
    color: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    text: 'text-teal-600',
    details: [
      'Filter by category, risk, and return',
      'View detailed investment metrics',
      'Calculate projected returns',
      'Invest with one click'
    ]
  },
  {
    step: 5,
    title: 'Track & Earn',
    description: 'Monitor your portfolio and receive regular payouts. Get real-time updates on your investments.',
    icon: TrendingUp,
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-600',
    details: [
      'Real-time portfolio tracking',
      'Automated monthly payouts',
      'Detailed performance reports',
      'Tax documents and statements'
    ]
  }
];

const features = [
  {
    icon: ShieldCheck,
    title: 'SEC Compliant',
    description: 'Fully regulated investment platform with all necessary licenses and compliance.',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description: 'Bank-grade security with 2FA, encryption, and regular security audits.',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    icon: Award,
    title: 'Expert Curation',
    description: 'All opportunities are vetted by our investment committee and experts.',
    color: 'text-amber-600 bg-amber-50'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a community of thousands of investors and share insights.',
    color: 'text-green-600 bg-green-50'
  },
  {
    icon: Globe,
    title: 'Pan-African Focus',
    description: 'Access opportunities across Africa with local expertise.',
    color: 'text-teal-600 bg-teal-50'
  },
  {
    icon: Zap,
    title: 'Fast & Efficient',
    description: 'Quick onboarding, fast investment processing, and instant payouts.',
    color: 'text-orange-600 bg-orange-50'
  }
];

const stats = [
  { value: '10,000+', label: 'Active Investors' },
  { value: '₦50B+', label: 'Total Investments' },
  { value: '500+', label: 'Projects Funded' },
  { value: '18%', label: 'Average Return' },
];

export default function HowItWorksPage() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (step) => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brave-teal/10 via-brave-lime/10 to-brave-lavender/10 py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero-soft"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-brave-teal border border-brave-teal/20 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Your Investment Journey Starts Here</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-gray-900 mb-6 animate-slide-up">
              How BraveVest Works
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your investment journey in 5 simple steps and build your financial future with confidence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" variant="primary" className="rounded-full px-8">
                  Get Started Now
                </Button>
              </Link>
              <Link to="/opportunities">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-light text-brave-teal">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
                Your Investment Journey
              </h2>
              <p className="text-lg text-gray-600">
                Follow these steps to start investing with BraveVest
              </p>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brave-teal to-brave-lime hidden md:block"></div>

              {steps.map(({ step, title, description, icon: Icon, bg, border, text, details }, index) => {
                const isExpanded = expandedStep === step;
                const isEven = index % 2 === 0;

                return (
                  <div key={step} className="relative mb-12 last:mb-0">
                    <div className={`flex flex-col md:flex-row gap-6 md:gap-8 items-start ${isEven ? '' : 'md:flex-row-reverse'}`}>
                      {/* Step Number */}
                      <div className="flex-shrink-0 flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${steps[step-1].color} text-white flex items-center justify-center text-xl font-bold shadow-lg z-10`}>
                          {step}
                        </div>
                        {step < steps.length && (
                          <div className="w-0.5 h-12 bg-gray-300 mt-2 hidden md:block"></div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div 
                          className={`bg-white rounded-2xl shadow-sm border ${border} p-6 hover:shadow-md transition-all duration-300 cursor-pointer ${isExpanded ? 'shadow-lg' : ''}`}
                          onClick={() => toggleStep(step)}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-xl ${bg}`}>
                              <Icon className={`h-5 w-5 ${text}`} />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="ml-auto rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleStep(step);
                              }}
                            >
                              <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            </Button>
                          </div>
                          <p className="text-gray-600">{description}</p>
                          
                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                              <p className="text-sm font-medium text-gray-700 mb-3">What you'll do:</p>
                              <ul className="space-y-2">
                                {details.map((detail, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                    <CheckCircle className={`h-4 w-4 ${text} flex-shrink-0 mt-0.5`} />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-4">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className={`${text} rounded-full`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Learn More <ArrowRight className="h-3 w-3 ml-1" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
              Why Invest with BraveVest?
            </h2>
            <p className="text-lg text-gray-600">
              We combine security, transparency, and opportunity to help you grow your wealth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-sans">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brave-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Join thousands of investors building their financial future with BraveVest.
            Start with as little as ₦10,000.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="primary" className="rounded-full px-8 text-base">
                Create Free Account
              </Button>
            </Link>
            <Link to="/opportunities">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-white text-white hover:bg-white/10">
                Browse Opportunities
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/50">
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-brave-lime" />
              No hidden fees
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-brave-lime" />
              SEC regulated
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-brave-lime" />
              Withdraw anytime
            </span>
          </div>
        </div>
      </section>

      {/* Bottom Trust Section */}
      <section className="py-8 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-brave-teal" />
              <span>SEC Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-brave-teal" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-brave-teal" />
              <span>10,000+ Investors</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-brave-teal" />
              <span>4.8★ Rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}