// apps/web/src/routes/public/OpportunityDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  RiskBadge,
  RangeSlider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  toast
} from '@bravevest/ui/components';
import {
  ArrowLeft,
  Calendar,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  Building2,
  FileText,
  Shield,
  CheckCircle,
  AlertCircle,
  Info,
  Download,
  Share2,
  Heart,
  BarChart3,
  PieChart,
  Award,
  Target,
  Zap,
  Briefcase,
  Landmark,
  Home
} from 'lucide-react';

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [opportunity, setOpportunity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - replace with API call
  useEffect(() => {
    fetchOpportunity();
  }, [id]);

  const fetchOpportunity = async () => {
    setIsLoading(true);
    try {
      // API call - replace with actual
      // const response = await api.get(`/opportunities/${id}`);
      // setOpportunity(response.data);
      
      // Mock data
      const mockData = {
        id: id,
        title: 'Green Energy Infrastructure Fund',
        category: { id: 'cat-1', name: 'Projects' },
        categoryIcon: <Building2 className="h-4 w-4" />,
        riskRating: 'medium',
        status: 'listed',
        targetRaise: 25000000,
        unitPrice: 25000,
        totalUnits: 1000,
        unitsSold: 623,
        minInvestment: 50000,
        maxInvestment: 5000000,
        tenureMonths: 24,
        projectedReturnPct: 18,
        description: 'This is a unique opportunity to invest in green energy infrastructure projects across Nigeria. The fund focuses on solar, wind, and hydroelectric power generation with strong government backing and proven technology partners.',
        useOfFunds: 'The funds will be deployed across three phases: Phase 1 (40%) - Solar farm development in Kaduna; Phase 2 (35%) - Wind energy projects in Plateau; Phase 3 (25%) - Hydroelectric mini-grids in rural communities.',
        backingType: 'Asset-backed with government guarantees',
        sponsor: {
          id: 'sp-1',
          name: 'BraveVest Capital',
          verified: true,
          logo: 'BV',
          founded: 2019,
          totalRaised: 150000000,
          projectsCompleted: 12,
          rating: 4.8,
        },
        documents: [
          { id: 'doc-1', name: 'Investment Memorandum', type: 'pdf', url: '#' },
          { id: 'doc-2', name: 'Risk Disclosure', type: 'pdf', url: '#' },
          { id: 'doc-3', name: 'Subscription Agreement', type: 'pdf', url: '#' },
          { id: 'doc-4', name: 'Return Projection', type: 'pdf', url: '#' },
          { id: 'doc-5', name: 'Payment Schedule', type: 'pdf', url: '#' },
        ],
        milestones: [
          { phase: 'Phase 1', description: 'Land acquisition and site preparation', status: 'completed', date: '2024-01-15' },
          { phase: 'Phase 2', description: 'Infrastructure development', status: 'in-progress', date: '2024-06-30' },
          { phase: 'Phase 3', description: 'Operational launch', status: 'pending', date: '2024-12-31' },
        ],
        returns: {
          monthly: 3.5,
          quarterly: 10.5,
          annual: 18,
          projectedTotal: 224000,
        },
        investorCount: 342,
        daysRemaining: 45,
        createdAt: '2024-01-01',
        updatedAt: '2024-06-01',
        riskAnalysis: {
          market: 'medium',
          operational: 'low',
          financial: 'medium',
          regulatory: 'low',
        },
        faqs: [
          { question: 'What is the minimum investment?', answer: 'The minimum investment is ₦50,000.' },
          { question: 'How are returns paid?', answer: 'Returns are paid monthly via bank transfer to your registered account.' },
          { question: 'What is the lock-in period?', answer: 'The minimum lock-in period is 12 months with quarterly liquidity windows.' },
        ],
      };
      setOpportunity(mockData);
    } catch (error) {
      console.error('Failed to fetch opportunity:', error);
      toast.error('Failed to load opportunity details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.kycStatus !== 'verified') {
      toast.error('Please complete KYC verification first.');
      navigate('/investor/kyc');
      return;
    }

    setIsSubscribing(true);
    try {
      const units = Math.floor(investmentAmount / opportunity.unitPrice);
      await subscribe({
        opportunityId: opportunity.id,
        units,
        amount: investmentAmount,
      });
      toast.success('Subscription successful!');
      navigate('/investor/dashboard');
    } catch (error) {
      toast.error(error.message || 'Failed to subscribe');
    } finally {
      setIsSubscribing(false);
    }
  };

  const estimatedUnits = Math.floor(investmentAmount / opportunity?.unitPrice || 1);
  const monthlyReturn = (investmentAmount * (opportunity?.projectedReturnPct || 0) / 100) / (opportunity?.tenureMonths || 1);
  const totalReturn = investmentAmount + (monthlyReturn * (opportunity?.tenureMonths || 1));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 rounded-2xl"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-light text-gray-900 mb-2">Opportunity Not Found</h2>
          <p className="text-gray-500 mb-6">The opportunity you're looking for doesn't exist or has been removed.</p>
          <Link to="/opportunities">
            <Button variant="outline" className="rounded-full px-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Opportunities
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const progress = Math.round((opportunity.unitsSold / opportunity.totalUnits) * 100);
  const isFunded = progress >= 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Back Button */}
        <Link to="/opportunities" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Opportunities
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h1 className="text-3xl md:text-4xl font-serif font-light text-gray-900">
                      {opportunity.title}
                    </h1>
                    <RiskBadge risk={opportunity.riskRating} />
                  </div>
                  <div className="flex items-center gap-3 flex-wrap text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      {opportunity.categoryIcon}
                      {opportunity.category.name}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Building2 className="h-4 w-4" />
                      {opportunity.sponsor.name}
                      {opportunity.sponsor.verified && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      opportunity.status === 'listed' ? 'bg-green-100 text-green-800' :
                      opportunity.status === 'funding' ? 'bg-blue-100 text-blue-800' :
                      opportunity.status === 'funded' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.status.charAt(0).toUpperCase() + opportunity.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-full"
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-white border border-gray-100 rounded-2xl p-1 w-full justify-start">
                <TabsTrigger value="overview" className="rounded-xl px-4">Overview</TabsTrigger>
                <TabsTrigger value="documents" className="rounded-xl px-4">Documents</TabsTrigger>
                <TabsTrigger value="milestones" className="rounded-xl px-4">Milestones</TabsTrigger>
                <TabsTrigger value="faqs" className="rounded-xl px-4">FAQs</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-6">
                {/* Description */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{opportunity.description}</p>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">Key Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          Target Raise
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          ₦{(opportunity.targetRaise / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Projected Return
                        </p>
                        <p className="text-lg font-semibold text-brave-teal">
                          {opportunity.projectedReturnPct}%
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Tenure
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {opportunity.tenureMonths} months
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Investors
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                          {opportunity.investorCount}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Use of Funds */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">Use of Funds</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{opportunity.useOfFunds}</p>
                    {opportunity.backingType && (
                      <div className="mt-4 flex items-center gap-2 text-sm bg-blue-50 text-blue-800 p-3 rounded-xl">
                        <Shield className="h-4 w-4" />
                        <span>{opportunity.backingType}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Sponsor Info */}
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">About the Sponsor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-brave-lime/20 flex items-center justify-center text-2xl font-serif text-brave-black flex-shrink-0">
                        {opportunity.sponsor.logo}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{opportunity.sponsor.name}</h4>
                        <p className="text-sm text-gray-500">Founded {opportunity.sponsor.founded}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1 text-gray-600">
                            <Award className="h-4 w-4 text-brave-teal" />
                            {opportunity.sponsor.rating}★ Rating
                          </span>
                          <span className="flex items-center gap-1 text-gray-600">
                            <Briefcase className="h-4 w-4 text-brave-teal" />
                            {opportunity.sponsor.projectsCompleted} Projects
                          </span>
                          <span className="flex items-center gap-1 text-gray-600">
                            <DollarSign className="h-4 w-4 text-brave-teal" />
                            ₦{(opportunity.sponsor.totalRaised / 1000000).toFixed(0)}M Raised
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">Documents</CardTitle>
                    <CardDescription>Download legal and informational documents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {opportunity.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-brave-teal" />
                            <div>
                              <p className="font-medium text-sm">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.type.toUpperCase()}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Milestones Tab */}
              <TabsContent value="milestones" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">Project Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {opportunity.milestones.map((milestone, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              milestone.status === 'completed' ? 'bg-green-100 text-green-600' :
                              milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-400'
                            }`}>
                              {milestone.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                               milestone.status === 'in-progress' ? <Clock className="h-4 w-4" /> :
                               <AlertCircle className="h-4 w-4" />}
                            </div>
                            {index < opportunity.milestones.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-200"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <h4 className="font-semibold text-gray-900">{milestone.phase}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{milestone.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQs Tab */}
              <TabsContent value="faqs" className="mt-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-serif font-light text-xl">Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {opportunity.faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <h4 className="font-medium text-gray-900 mb-1">{faq.question}</h4>
                          <p className="text-sm text-gray-600">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Investment Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-serif font-light text-xl">Invest Now</CardTitle>
                <CardDescription>Invest in this opportunity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Funding Progress</span>
                    <span className={`font-semibold ${isFunded ? 'text-green-600' : ''}`}>
                      {progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isFunded ? 'bg-green-500' : 'bg-brave-teal'
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>₦{(opportunity.unitsSold * opportunity.unitPrice / 1000000).toFixed(1)}M raised</span>
                    <span>₦{(opportunity.targetRaise / 1000000).toFixed(1)}M target</span>
                  </div>
                </div>

                {/* Investment Amount */}
                <div>
                  <label className="text-sm font-medium block mb-2 text-gray-700">Investment Amount</label>
                  <RangeSlider
                    min={opportunity.minInvestment}
                    max={opportunity.maxInvestment || opportunity.targetRaise}
                    value={investmentAmount}
                    onChange={setInvestmentAmount}
                    step={10000}
                    currency="₦"
                  />
                </div>

                {/* Calculation */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Units to purchase</span>
                    <span className="font-semibold text-gray-900">{estimatedUnits} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Monthly return</span>
                    <span className="font-semibold text-brave-teal">₦{monthlyReturn.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                    <span className="text-gray-500">Total return at maturity</span>
                    <span className="font-semibold text-brave-teal text-lg">
                      ₦{totalReturn.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <Button
                  className="w-full rounded-full bg-brave-lime text-brave-black hover:bg-brave-lime/90 text-base py-6"
                  size="lg"
                  onClick={handleSubscribe}
                  disabled={isSubscribing || opportunity.status !== 'listed' || isFunded}
                >
                  {isSubscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                      Processing...
                    </>
                  ) : isFunded ? (
                    'Fully Funded'
                  ) : opportunity.status !== 'listed' ? (
                    'Not Open for Investment'
                  ) : (
                    'Subscribe Now'
                  )}
                </Button>

                {opportunity.status !== 'listed' && (
                  <p className="text-sm text-yellow-600 text-center">
                    This opportunity is not currently open for investment.
                  </p>
                )}

                {isFunded && (
                  <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 p-3 rounded-xl">
                    <CheckCircle className="h-4 w-4" />
                    <span>This opportunity is fully funded!</span>
                  </div>
                )}

                {/* Trust Signals */}
                <div className="border-t border-gray-100 pt-4 mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="h-3 w-3 text-brave-teal" />
                    <span>SEC Compliant &amp; Regulated</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CheckCircle className="h-3 w-3 text-brave-teal" />
                    <span>KYC Verified Investors Only</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="h-3 w-3 text-brave-teal" />
                    <span>Secure &amp; Encrypted Platform</span>
                  </div>
                </div>

                {/* Days Remaining */}
                <div className="bg-brave-lime/10 rounded-xl p-3 text-center border border-brave-lime/20">
                  <p className="text-sm text-gray-600">
                    <Clock className="h-4 w-4 inline mr-1 text-brave-teal" />
                    {opportunity.daysRemaining} days remaining to invest
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}