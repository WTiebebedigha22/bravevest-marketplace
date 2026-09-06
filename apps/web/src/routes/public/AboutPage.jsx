// apps/web/src/routes/public/AboutPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@bravevest/ui/components';
import {
  Award,
  Building2,
  Users,
  TrendingUp,
  Shield,
  Globe,
  BookOpen,
  Target,
  Heart,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Briefcase,
  Landmark,
  Cpu,
  Leaf,
  GraduationCap,
  Zap,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
} from 'lucide-react';

const teamMembers = [
  {
    name: 'Dr. Adebayo Ogunlesi',
    role: 'CEO & Co-Founder',
    bio: 'Former investment banker with 20+ years experience in African markets. Holds a PhD in Finance from LSE.',
    image: 'AO',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Ngozi Okonkwo',
    role: 'Head of Investments',
    bio: 'CFA charterholder with 15 years in private equity and venture capital across Africa.',
    image: 'NO',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Chidi Eze',
    role: 'Chief Technology Officer',
    bio: 'Ex-Google engineer with expertise in fintech and blockchain. Leads our platform development.',
    image: 'CE',
    social: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'Amara Obi',
    role: 'Head of Compliance',
    bio: 'Former SEC regulator with deep expertise in investment compliance and AML/KYC frameworks.',
    image: 'AO',
    social: { linkedin: '#', twitter: '#' }
  }
];

const milestones = [
  { year: '2019', title: 'Founded', description: 'BraveVest was founded to democratize investment in Africa' },
  { year: '2020', title: 'First Launch', description: 'Launched our first investment product with ₦100M in commitments' },
  { year: '2021', title: 'SEC Approval', description: 'Received full SEC license and regulatory approval' },
  { year: '2022', title: '10K Investors', description: 'Reached 10,000 active investors on the platform' },
  { year: '2023', title: '50B AUM', description: 'Crossed ₦50B in assets under management' },
  { year: '2024', title: 'Pan-African Expansion', description: 'Launched operations in 5 African countries' },
];

const values = [
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'We operate with complete transparency and uphold the highest ethical standards.',
    color: 'text-blue-600 bg-blue-50'
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from due diligence to customer service.',
    color: 'text-purple-600 bg-purple-50'
  },
  {
    icon: Users,
    title: 'Inclusion',
    description: 'We believe everyone should have access to quality investment opportunities.',
    color: 'text-green-600 bg-green-50'
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We leverage technology to make investing simple, accessible, and efficient.',
    color: 'text-amber-600 bg-amber-50'
  }
];

const stats = [
  { value: '2019', label: 'Year Founded', icon: Clock },
  { value: '10,000+', label: 'Active Investors', icon: Users },
  { value: '₦50B+', label: 'Assets Under Management', icon: DollarSign },
  { value: '500+', label: 'Projects Funded', icon: Briefcase },
  { value: '18%', label: 'Average Return', icon: TrendingUp },
  { value: '5', label: 'Countries', icon: Globe },
];

// Partners with logo SVGs
const partners = [
  { 
    name: 'Paystack', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="20" y="38" fontSize="24" fontWeight="bold" fill="#00B3A4">Paystack</text>
        <text x="120" y="38" fontSize="12" fill="#6B7280">®</text>
      </svg>
    ),
    color: 'border-teal-200 bg-teal-50'
  },
  { 
    name: 'Flutterwave', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="20" y="38" fontSize="20" fontWeight="bold" fill="#556EE6">Flutterwave</text>
      </svg>
    ),
    color: 'border-indigo-200 bg-indigo-50'
  },
  { 
    name: 'Smile Identity', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="15" y="38" fontSize="20" fontWeight="bold" fill="#FF6B35">Smile</text>
        <text x="100" y="38" fontSize="20" fontWeight="bold" fill="#00A3FF">ID</text>
      </svg>
    ),
    color: 'border-orange-200 bg-orange-50'
  },
  { 
    name: 'Deloitte', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="20" y="38" fontSize="22" fontWeight="bold" fill="#003366">Deloitte</text>
      </svg>
    ),
    color: 'border-blue-200 bg-blue-50'
  },
  { 
    name: 'KPMG', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="20" y="38" fontSize="22" fontWeight="bold" fill="#003366">KPMG</text>
      </svg>
    ),
    color: 'border-blue-200 bg-blue-50'
  },
  { 
    name: 'Microsoft', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <rect x="15" y="12" width="12" height="12" fill="#F25022"/>
        <rect x="30" y="12" width="12" height="12" fill="#7FBA00"/>
        <rect x="15" y="27" width="12" height="12" fill="#00A4EF"/>
        <rect x="30" y="27" width="12" height="12" fill="#FFB900"/>
        <text x="52" y="36" fontSize="18" fontWeight="bold" fill="#000">Microsoft</text>
      </svg>
    ),
    color: 'border-blue-200 bg-blue-50'
  },
  { 
    name: 'Amazon Web Services', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="15" y="38" fontSize="16" fontWeight="bold" fill="#232F3E">AWS</text>
      </svg>
    ),
    color: 'border-amber-200 bg-amber-50'
  },
  { 
    name: 'Google Cloud', 
    logo: (
      <svg viewBox="0 0 200 60" className="h-8 w-auto">
        <rect width="200" height="60" rx="4" fill="#fff"/>
        <text x="15" y="38" fontSize="18" fontWeight="bold" fill="#4285F4">Google</text>
        <text x="100" y="38" fontSize="14" fill="#EA4335">Cloud</text>
      </svg>
    ),
    color: 'border-blue-200 bg-blue-50'
  },
];

export default function AboutPage() {
  const [activeMilestone, setActiveMilestone] = useState(milestones.length - 1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brave-teal/10 via-brave-lime/10 to-brave-lavender/10 py-20 overflow-hidden">
        <div className="absolute inset-0 gradient-hero-soft"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-brave-teal border border-brave-teal/20 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>About BraveVest</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-gray-900 mb-6 animate-slide-up">
              Empowering <span className="text-brave-teal">African Investors</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We're building Africa's leading investment marketplace, connecting investors with curated opportunities 
              across property, projects, and income streams.
            </p>
            <Link to="/register">
              <Button size="lg" variant="primary" className="rounded-full px-8">
                Join Our Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-serif font-light text-brave-teal">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-brave-teal/10 text-brave-teal rounded-full text-sm font-medium mb-4">
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
                  Democratizing <span className="text-brave-teal">Investment</span> in Africa
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  BraveVest is a regulated investment marketplace that connects investors with curated opportunities 
                  across property, projects, income streams, and more.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  We're backed by BraveLion Group, a diversified financial services company with a track record of 
                  delivering value across Africa.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2 text-gray-500">
                    <Shield className="h-4 w-4 text-brave-teal" />
                    SEC Licensed
                  </span>
                  <span className="flex items-center gap-2 text-gray-500">
                    <Users className="h-4 w-4 text-brave-teal" />
                    10K+ Investors
                  </span>
                  <span className="flex items-center gap-2 text-gray-500">
                    <Award className="h-4 w-4 text-brave-teal" />
                    4.8★ Rating
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <div className="text-4xl text-brave-teal mb-4">"</div>
                  <p className="text-lg text-gray-700 italic">
                    Our mission is to democratize access to quality investments and build long-term wealth for our 
                    community of investors.
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-brave-lime/20 flex items-center justify-center font-serif text-xl text-brave-black">
                      BV
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">BraveVest Team</p>
                      <p className="text-sm text-gray-500">Investment Marketplace</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow text-center">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${value.color} flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-sans">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600">
              Experienced professionals dedicated to your financial success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-brave-teal to-brave-lime flex items-center justify-center text-2xl font-serif text-white mx-auto mb-3">
                    {member.image}
                  </div>
                  <CardTitle className="text-center text-lg font-sans">{member.name}</CardTitle>
                  <CardDescription className="text-center">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">{member.bio}</p>
                  <div className="flex justify-center gap-3 mt-4">
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-brave-teal transition-colors">
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a href={member.social.twitter} className="text-gray-400 hover:text-brave-teal transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600">
                Key milestones in our mission to democratize investment in Africa
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-brave-teal/30 hidden md:block"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className="relative mb-8 last:mb-0">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="flex-shrink-0 flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 transition-all duration-300 ${
                        index === activeMilestone 
                          ? 'bg-brave-teal text-white shadow-lg scale-110' 
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {milestone.year}
                      </div>
                    </div>
                    <div 
                      className={`flex-1 bg-gray-50 rounded-2xl p-6 border transition-all duration-300 cursor-pointer hover:shadow-md ${
                        index === activeMilestone 
                          ? 'border-brave-teal/50 shadow-md' 
                          : 'border-transparent'
                      }`}
                      onMouseEnter={() => setActiveMilestone(index)}
                    >
                      <h4 className="font-semibold text-gray-900">{milestone.title}</h4>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section with Logos */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-serif font-light text-gray-900">Trusted Partners</h3>
            <p className="text-gray-500 mt-2">We partner with industry leaders to deliver the best experience</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-center p-4 bg-white rounded-xl border-2 ${partner.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center gap-3">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brave-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Be part of the next generation of African investors. Start building your wealth today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="primary" className="rounded-full px-8 text-base">
                Create Free Account
              </Button>
            </Link>
            <Link to="/opportunities">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-white text-white hover:bg-white/10">
                Explore Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Contact */}
      <section className="py-8 bg-gray-900 text-white/60 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>hello@bravevest.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+234 800 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Lagos, Nigeria</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}