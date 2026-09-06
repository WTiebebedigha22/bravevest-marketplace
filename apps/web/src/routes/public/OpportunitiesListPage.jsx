// apps/web/src/routes/public/OpportunitiesListPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  RangeSlider,
  RiskBadge,
  Button,
  StatCard
} from '@bravevest/ui/components';
import {
  Search,
  Filter,
  SlidersHorizontal,
  TrendingUp,
  Building2,
  Home,
  Coins,
  Briefcase,
  TreePine,
  Landmark,
  Users,
  Sparkles,
  X,
  ChevronDown,
  AlertCircle,
  Clock,
  CheckCircle,
  DollarSign,
  Percent
} from 'lucide-react';

const categories = [
  { value: 'all', label: 'All Opportunities', icon: Sparkles },
  { value: 'projects', label: 'Projects', icon: Building2 },
  { value: 'property', label: 'Property', icon: Home },
  { value: 'income', label: 'Income', icon: Coins },
  { value: 'notes', label: 'Notes', icon: Briefcase },
  { value: 'buildfund', label: 'BuildFund', icon: TreePine },
  { value: 'landbank', label: 'LandBank', icon: Landmark },
  { value: 'credit', label: 'Credit', icon: TrendingUp },
  { value: 'prime', label: 'Prime', icon: Sparkles },
  { value: 'circle', label: 'Circle', icon: Users },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'return_high', label: 'Highest Return' },
  { value: 'return_low', label: 'Lowest Return' },
  { value: 'tenure_short', label: 'Shortest Tenure' },
  { value: 'tenure_long', label: 'Longest Tenure' },
  { value: 'raise_high', label: 'Highest Raise' },
];

const riskLevels = [
  { value: 'all', label: 'All Risks' },
  { value: 'low', label: 'Low Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'high', label: 'High Risk' },
];

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'listed', label: 'Open for Investment' },
  { value: 'funding', label: 'Currently Funding' },
  { value: 'funded', label: 'Fully Funded' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

// Mock data generator
const generateMockOpportunities = () => {
  const mockCategories = ['projects', 'property', 'income', 'notes', 'buildfund', 'landbank', 'credit', 'prime', 'circle'];
  const mockRisks = ['low', 'medium', 'high'];
  const mockStatus = ['listed', 'funding', 'funded', 'active'];
  const titles = [
    'Green Energy Infrastructure Fund',
    'Luxury Apartment Development',
    'AgriTech Innovation Fund',
    'Real Estate Income Notes',
    'BuildFund Housing Project',
    'LandBank Acquisition Fund',
    'SME Credit Facility',
    'Prime Investment Opportunity',
    'Circle Group Investment'
  ];
  
  return Array.from({ length: 24 }, (_, i) => ({
    id: `opp-${i + 1}`,
    title: titles[i % titles.length] + (i > 8 ? ` ${i + 1}` : ''),
    category: mockCategories[i % mockCategories.length],
    categoryLabel: categories.find(c => c.value === mockCategories[i % mockCategories.length])?.label || mockCategories[i % mockCategories.length],
    risk: mockRisks[i % 3],
    status: mockStatus[i % 4],
    targetRaise: Math.floor(Math.random() * 50000000) + 5000000,
    unitPrice: Math.floor(Math.random() * 50000) + 5000,
    totalUnits: Math.floor(Math.random() * 1000) + 100,
    unitsSold: Math.floor(Math.random() * 800),
    minInvestment: Math.floor(Math.random() * 100000) + 10000,
    maxInvestment: Math.floor(Math.random() * 5000000) + 1000000,
    tenureMonths: Math.floor(Math.random() * 36) + 6,
    projectedReturnPct: Math.floor(Math.random() * 25) + 8,
    description: 'This opportunity offers a unique chance to invest in a high-growth sector with strong fundamentals and experienced management team.',
    sponsor: {
      name: ['BraveVest Capital', 'Lion Group', 'Heritage Funds', 'Prime Investments', 'Golden Gate Partners'][i % 5],
      verified: i % 3 !== 0,
    },
    progress: Math.floor(Math.random() * 100),
    daysRemaining: Math.floor(Math.random() * 90) + 5,
    investorCount: Math.floor(Math.random() * 500) + 50,
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  }));
};

export default function OpportunitiesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Filter states
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    search: searchParams.get('search') || '',
    risk: searchParams.get('risk') || 'all',
    status: searchParams.get('status') || 'all',
    sort: searchParams.get('sort') || 'newest',
    minInvestment: parseInt(searchParams.get('minInvestment')) || 0,
    maxInvestment: parseInt(searchParams.get('maxInvestment')) || 10000000,
    minReturn: parseInt(searchParams.get('minReturn')) || 0,
    maxReturn: parseInt(searchParams.get('maxReturn')) || 100,
    tenureMin: parseInt(searchParams.get('tenureMin')) || 0,
    tenureMax: parseInt(searchParams.get('tenureMax')) || 60,
  });

  // Stats
  const stats = useMemo(() => {
    const total = opportunities.length;
    const totalRaise = opportunities.reduce((sum, opp) => sum + opp.targetRaise, 0);
    const avgReturn = total > 0 ? opportunities.reduce((sum, opp) => sum + opp.projectedReturnPct, 0) / total : 0;
    const totalInvestors = opportunities.reduce((sum, opp) => sum + opp.investorCount, 0);
    const avgProgress = total > 0 ? opportunities.reduce((sum, opp) => sum + opp.progress, 0) / total : 0;
    
    return { total, totalRaise, avgReturn, totalInvestors, avgProgress };
  }, [opportunities]);

  // Fetch opportunities
  useEffect(() => {
    fetchOpportunities();
  }, [filters]);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.risk !== 'all') params.append('risk', filters.risk);
      if (filters.status !== 'all') params.append('status', filters.status);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.minInvestment) params.append('minInvestment', filters.minInvestment);
      if (filters.maxInvestment) params.append('maxInvestment', filters.maxInvestment);
      if (filters.minReturn) params.append('minReturn', filters.minReturn);
      if (filters.maxReturn) params.append('maxReturn', filters.maxReturn);
      if (filters.tenureMin) params.append('tenureMin', filters.tenureMin);
      if (filters.tenureMax) params.append('tenureMax', filters.tenureMax);

      setSearchParams(params);

      // API call - replace with actual API
      // const response = await api.get(`/opportunities?${params}`);
      // setOpportunities(response.data);

      // Mock data
      const mockData = generateMockOpportunities();
      
      // Apply filters
      let filtered = mockData;
      
      if (filters.category !== 'all') {
        filtered = filtered.filter(opp => opp.category === filters.category);
      }
      
      if (filters.risk !== 'all') {
        filtered = filtered.filter(opp => opp.risk === filters.risk);
      }
      
      if (filters.status !== 'all') {
        filtered = filtered.filter(opp => opp.status === filters.status);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(opp => 
          opp.title.toLowerCase().includes(searchLower) ||
          opp.sponsor.name.toLowerCase().includes(searchLower) ||
          opp.categoryLabel.toLowerCase().includes(searchLower)
        );
      }
      
      filtered = filtered.filter(opp => 
        opp.minInvestment >= filters.minInvestment &&
        opp.maxInvestment <= filters.maxInvestment &&
        opp.projectedReturnPct >= filters.minReturn &&
        opp.projectedReturnPct <= filters.maxReturn &&
        opp.tenureMonths >= filters.tenureMin &&
        opp.tenureMonths <= filters.tenureMax
      );
      
      // Apply sorting
      switch (filters.sort) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'popular':
          filtered.sort((a, b) => b.investorCount - a.investorCount);
          break;
        case 'return_high':
          filtered.sort((a, b) => b.projectedReturnPct - a.projectedReturnPct);
          break;
        case 'return_low':
          filtered.sort((a, b) => a.projectedReturnPct - b.projectedReturnPct);
          break;
        case 'tenure_short':
          filtered.sort((a, b) => a.tenureMonths - b.tenureMonths);
          break;
        case 'tenure_long':
          filtered.sort((a, b) => b.tenureMonths - a.tenureMonths);
          break;
        case 'raise_high':
          filtered.sort((a, b) => b.targetRaise - a.targetRaise);
          break;
        default:
          break;
      }
      
      setOpportunities(filtered);
    } catch (error) {
      console.error('Failed to fetch opportunities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      search: '',
      risk: 'all',
      status: 'all',
      sort: 'newest',
      minInvestment: 0,
      maxInvestment: 10000000,
      minReturn: 0,
      maxReturn: 100,
      tenureMin: 0,
      tenureMax: 60,
    });
    setShowFilters(false);
  };

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'sort') return false;
    if (key === 'search' && value) return true;
    if (key === 'category' && value !== 'all') return true;
    if (key === 'risk' && value !== 'all') return true;
    if (key === 'status' && value !== 'all') return true;
    if (key === 'minInvestment' && value > 0) return true;
    if (key === 'maxInvestment' && value < 10000000) return true;
    if (key === 'minReturn' && value > 0) return true;
    if (key === 'maxReturn' && value < 100) return true;
    if (key === 'tenureMin' && value > 0) return true;
    if (key === 'tenureMax' && value < 60) return true;
    return false;
  }).length;

  const getStatusColor = (status) => {
    const colors = {
      listed: 'bg-green-100 text-green-800',
      funding: 'bg-blue-100 text-blue-800',
      funded: 'bg-purple-100 text-purple-800',
      active: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-gray-100 text-gray-800',
      defaulted: 'bg-red-100 text-red-800',
    };
    return colors[status] || colors.listed;
  };

  const getStatusLabel = (status) => {
    const labels = {
      listed: 'Open',
      funding: 'Funding',
      funded: 'Fully Funded',
      active: 'Active',
      completed: 'Completed',
      defaulted: 'Defaulted',
    };
    return labels[status] || status;
  };

  const OpportunityCard = ({ opportunity }) => (
    <Link to={`/opportunities/${opportunity.id}`}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 hover:border-brave-teal/30">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg group-hover:text-brave-teal transition-colors line-clamp-1">
                {opportunity.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs text-gray-500 capitalize px-2 py-0.5 bg-gray-100 rounded-full">
                  {opportunity.categoryLabel}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500">
                  by {opportunity.sponsor.name}
                </span>
                {opportunity.sponsor.verified && (
                  <span className="text-xs text-green-600 flex items-center gap-0.5">
                    <CheckCircle className="h-3 w-3" />
                    Verified
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <RiskBadge risk={opportunity.risk} />
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(opportunity.status)}`}>
                {getStatusLabel(opportunity.status)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {opportunity.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-xs text-gray-500 block">Target</span>
              <p className="font-semibold text-gray-900">
                ₦{(opportunity.targetRaise / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-xs text-gray-500 block">Return</span>
              <p className="font-semibold text-brave-teal">
                {opportunity.projectedReturnPct}%
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-xs text-gray-500 block">Tenure</span>
              <p className="font-semibold">
                {opportunity.tenureMonths}m
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <span className="text-xs text-gray-500 block">Min Invest</span>
              <p className="font-semibold">
                ₦{(opportunity.minInvestment / 1000).toFixed(0)}K
              </p>
            </div>
          </div>

          {/* Progress */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Funding Progress</span>
              <span className="font-medium">{opportunity.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${
                  opportunity.progress >= 100 ? 'bg-green-500' : 'bg-brave-teal'
                }`}
                style={{ width: `${Math.min(opportunity.progress, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {opportunity.investorCount}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {opportunity.daysRemaining}d
              </span>
            </div>
            <span className="text-xs text-brave-teal font-medium group-hover:underline">
              View Details →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brave-teal/10 via-brave-lime/10 to-brave-lavender/10 py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-3">
              Investment Opportunities
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover curated investment opportunities across property, projects, income, and more.
              Start building your diversified portfolio today.
            </p>
            
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-3xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search opportunities by title, category, or sponsor..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-10 pr-4 py-2 h-12 rounded-full bg-white shadow-sm border-gray-200 focus:ring-brave-teal"
                />
              </div>
              <Button 
                variant="outline"
                className="rounded-full px-6 h-12 border-gray-200 bg-white hover:bg-gray-50 whitespace-nowrap"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 bg-brave-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {!isLoading && opportunities.length > 0 && (
        <section className="container mx-auto px-4 -mt-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <StatCard
              title="Total Opportunities"
              value={stats.total}
              icon={Sparkles}
              className="bg-white shadow-sm"
            />
            <StatCard
              title="Total Raise"
              value={`₦${(stats.totalRaise / 1000000).toFixed(0)}M`}
              icon={DollarSign}
              className="bg-white shadow-sm"
            />
            <StatCard
              title="Avg Return"
              value={`${stats.avgReturn.toFixed(1)}%`}
              icon={Percent}
              trend={+12}
              trendLabel="vs market"
              className="bg-white shadow-sm"
            />
            <StatCard
              title="Total Investors"
              value={stats.totalInvestors.toLocaleString()}
              icon={Users}
              className="bg-white shadow-sm"
            />
            <StatCard
              title="Avg Progress"
              value={`${stats.avgProgress.toFixed(0)}%`}
              icon={TrendingUp}
              className="bg-white shadow-sm"
            />
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-8 p-6 animate-fade-in shadow-lg border-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold flex items-center gap-2 text-gray-900">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-gray-500">
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Category */}
              <div>
                <label className="text-sm font-medium block mb-2 text-gray-700">Category</label>
                <Select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </Select>
              </div>

              {/* Risk Level */}
              <div>
                <label className="text-sm font-medium block mb-2 text-gray-700">Risk Level</label>
                <Select
                  value={filters.risk}
                  onChange={(e) => handleFilterChange('risk', e.target.value)}
                  className="w-full"
                >
                  {riskLevels.map(risk => (
                    <option key={risk.value} value={risk.value}>{risk.label}</option>
                  ))}
                </Select>
              </div>

              {/* Status */}
              <div>
                <label className="text-sm font-medium block mb-2 text-gray-700">Status</label>
                <Select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full"
                >
                  {statusOptions.map(status => (
                    <option key={status.value} value={status.value}>{status.label}</option>
                  ))}
                </Select>
              </div>

              {/* Sort */}
              <div>
                <label className="text-sm font-medium block mb-2 text-gray-700">Sort By</label>
                <Select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </Select>
              </div>

              {/* Investment Range */}
              <div className="col-span-1 md:col-span-2">
                <RangeSlider
                  label="Investment Amount (₦)"
                  min={0}
                  max={10000000}
                  value={filters.maxInvestment}
                  onChange={(val) => handleFilterChange('maxInvestment', val)}
                  step={100000}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₦0</span>
                  <span>₦10M</span>
                </div>
              </div>

              {/* Return Range */}
              <div>
                <RangeSlider
                  label="Min Return (%)"
                  min={0}
                  max={100}
                  value={filters.minReturn}
                  onChange={(val) => handleFilterChange('minReturn', val)}
                  step={1}
                />
              </div>

              {/* Tenure Range */}
              <div>
                <RangeSlider
                  label="Max Tenure (Months)"
                  min={0}
                  max={60}
                  value={filters.tenureMax}
                  onChange={(val) => handleFilterChange('tenureMax', val)}
                  step={1}
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button 
                variant="primary"
                onClick={() => setShowFilters(false)}
                className="rounded-full px-8"
              >
                Apply Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Results Count & View Toggle */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{opportunities.length}</span> opportunities
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 mr-2">View:</span>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm" 
              className="h-8 px-3 rounded-full"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button 
              variant={viewMode === 'list' ? 'default' : 'ghost'} 
              size="sm" 
              className="h-8 px-3 rounded-full"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </div>
        </div>

        {/* Opportunities Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-2 bg-gray-200 rounded"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Opportunities Found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
            <Button variant="outline" className="mt-4 rounded-full px-8" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opportunity) => (
              <Link key={opportunity.id} to={`/opportunities/${opportunity.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 p-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-brave-teal transition-colors">
                          {opportunity.title}
                        </h3>
                        <RiskBadge risk={opportunity.risk} size="sm" />
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(opportunity.status)}`}>
                          {getStatusLabel(opportunity.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {opportunity.categoryLabel} • {opportunity.sponsor.name}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                        {opportunity.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm flex-shrink-0">
                      <div>
                        <span className="text-gray-500 block text-xs">Target</span>
                        <span className="font-semibold">₦{(opportunity.targetRaise / 1000000).toFixed(1)}M</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Return</span>
                        <span className="font-semibold text-brave-teal">{opportunity.projectedReturnPct}%</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Tenure</span>
                        <span className="font-semibold">{opportunity.tenureMonths}m</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">Progress</span>
                        <span className="font-semibold">{opportunity.progress}%</span>
                      </div>
                      <Button variant="primary" size="sm" className="rounded-full">
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* Load More */}
        {!isLoading && opportunities.length > 12 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="rounded-full px-8 hover:bg-gray-100">
              Load More <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}