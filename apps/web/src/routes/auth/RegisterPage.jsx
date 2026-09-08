// apps/web/src/routes/auth/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Lock,
  Building,
  Users,
  Globe,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  TrendingUp,
  DollarSign,
  Target,
  Award,
  Zap,
  Heart,
  Building2,
  FileText,
  Calendar,
  MapPin,
  Home,
  CreditCard,
  Store,
  Factory,
  TreePine,
  GraduationCap,
  Plane
} from 'lucide-react';

// Simple inline components
const Button = ({ children, className, onClick, disabled, type, variant }) => (
  <button
    type={type || 'button'}
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background ${
      variant === 'outline' 
        ? 'border border-brave-black bg-transparent text-brave-black hover:bg-brave-black/5' 
        : variant === 'primary' 
          ? 'bg-brave-lime text-brave-black hover:bg-brave-lime/90'
          : 'bg-brave-teal hover:bg-brave-teal/90 text-white'
    } ${className || ''}`}
  >
    {children}
  </button>
);

const Input = ({ className, type, placeholder, value, onChange, required, disabled, icon: Icon, ...props }) => (
  <div className="relative">
    {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />}
    <input
      type={type || 'text'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brave-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${Icon ? 'pl-10' : ''} ${className || ''}`}
      {...props}
    />
  </div>
);

const Card = ({ className, children }) => (
  <div className={`rounded-2xl border bg-white text-card-foreground shadow-sm ${className || ''}`}>
    {children}
  </div>
);

const CardHeader = ({ className, children }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}>
    {children}
  </div>
);

const CardTitle = ({ className, children }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight font-sans ${className || ''}`}>
    {children}
  </h3>
);

const CardContent = ({ className, children }) => (
  <div className={`p-6 pt-0 ${className || ''}`}>
    {children}
  </div>
);

const Label = ({ className, children }) => (
  <label className={`text-sm font-medium leading-none text-gray-700 ${className || ''}`}>
    {children}
  </label>
);

const Select = ({ value, onChange, children, className }) => (
  <select
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brave-teal focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
  >
    {children}
  </select>
);

// Toast function
const toast = {
  success: (message) => console.log('✅', message),
  error: (message) => console.log('❌', message),
  info: (message) => console.log('ℹ️', message),
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState(null); // null, 'individual', or 'business'

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    nationality: 'Nigerian',
    countryOfResidence: 'Nigeria',

    // Business Information (for business accounts)
    businessName: '',
    businessRegistrationNumber: '',
    businessType: 'sole_proprietorship',
    businessIndustry: 'technology',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessCountry: 'Nigeria',
    businessPhone: '',
    businessEmail: '',
    taxId: '',
    yearsInOperation: '',

    // Step 2: Investor Profile
    role: 'investor',
    investorType: 'individual',
    entityName: '',
    registrationNumber: '',
    city: '',
    address: '',
    referralCode: '',

    // Step 3: Investment Preferences
    investmentExperience: 'beginner',
    riskTolerance: 'moderate',
    investmentGoals: [],
    preferredSectors: [],
    minInvestment: 10000,
    maxInvestment: 1000000,

    // Step 4: Compliance
    acceptedTerms: false,
    acceptedPrivacyPolicy: false,
    acceptedRiskDisclosure: false,
    acknowledgedKYC: false,
    isPEP: false,
  });

  const businessTypes = [
    { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'limited_liability', label: 'Limited Liability Company' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'cooperative', label: 'Cooperative' },
    { value: 'ngo', label: 'Non-Profit / NGO' },
    { value: 'government', label: 'Government Entity' },
  ];

  const industries = [
    { value: 'technology', label: 'Technology' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & Commerce' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'transportation', label: 'Transportation & Logistics' },
  ];

  const investmentGoals = [
    { value: 'wealth_building', label: 'Wealth Building' },
    { value: 'retirement', label: 'Retirement Planning' },
    { value: 'income_generation', label: 'Regular Income' },
    { value: 'capital_preservation', label: 'Capital Preservation' },
    { value: 'speculative', label: 'Speculative Growth' },
    { value: 'diversification', label: 'Portfolio Diversification' },
  ];

  const sectors = [
    { value: 'real_estate', label: 'Real Estate' },
    { value: 'technology', label: 'Technology' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'energy', label: 'Energy' },
    { value: 'healthcare', label: 'Healthcare' },
  ];

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleMultiSelect = (field, value) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(v => v !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const validateStep = () => {
    setError('');

    if (step === 1) {
      if (accountType === 'individual') {
        if (!formData.firstName || !formData.lastName) {
          setError('Please enter your full name');
          return false;
        }
        if (!formData.dateOfBirth) {
          setError('Please enter your date of birth');
          return false;
        }
      } else if (accountType === 'business') {
        if (!formData.businessName) {
          setError('Please enter your business name');
          return false;
        }
        if (!formData.businessRegistrationNumber) {
          setError('Please enter your business registration number');
          return false;
        }
        if (!formData.businessAddress) {
          setError('Please enter your business address');
          return false;
        }
        if (!formData.yearsInOperation) {
          setError('Please enter years in operation');
          return false;
        }
      } else {
        setError('Please select an account type');
        return false;
      }
      
      if (!formData.email) {
        setError('Please enter your email address');
        return false;
      }
      if (!formData.phone) {
        setError('Please enter your phone number');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    if (step === 2) {
      if (accountType === 'business') {
        if (!formData.businessType) {
          setError('Please select your business type');
          return false;
        }
        if (!formData.businessIndustry) {
          setError('Please select your industry');
          return false;
        }
      }
    }

    if (step === 4) {
      if (!formData.acceptedTerms) {
        setError('You must accept the Terms of Service');
        return false;
      }
    }

    if (step === 5) {
      if (!formData.acceptedPrivacyPolicy) {
        setError('You must accept the Privacy Policy');
        return false;
      }
      if (!formData.acceptedRiskDisclosure) {
        setError('You must acknowledge the Risk Disclosure');
        return false;
      }
      if (!formData.acknowledgedKYC) {
        setError('You must acknowledge the KYC requirements');
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountTypeSelect = (type) => {
    setAccountType(type);
    setStep(2); // Move to next step immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsLoading(true);
    setError('');

    try {
      const registrationData = {
        accountType,
        ...formData,
      };
      
      // Remove non-API fields
      delete registrationData.confirmPassword;
      delete registrationData.acceptedTerms;
      delete registrationData.acceptedPrivacyPolicy;
      delete registrationData.acceptedRiskDisclosure;
      delete registrationData.acknowledgedKYC;

      await register(registrationData);
      toast.success('Account created successfully!');
      navigate('/login', { state: { message: 'Registration successful! Please login to continue.' } });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      toast.error(err.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const steps = ['Account Type', 'Personal Info', 'Profile', 'Preferences', 'Compliance'];
    const currentStep = step === 1 ? 1 : step; // Account type is step 1
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((label, index) => {
            const stepNum = index + 1;
            const isActive = stepNum === currentStep;
            const isCompleted = stepNum < currentStep;
            return (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 text-xs ${
                    isActive 
                      ? 'border-brave-teal bg-brave-teal text-white shadow-lg' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-500 text-white' 
                        : 'border-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? <CheckCircle className="h-4 w-4" /> : stepNum}
                  </div>
                  <span className={`text-[10px] mt-1 font-medium text-center ${
                    isActive ? 'text-brave-teal' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {label}
                  </span>
                </div>
                {stepNum < 5 && (
                  <div className={`flex-1 h-0.5 mx-1 ${
                    stepNum < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAccountTypeSelection = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Choose Account Type</h3>
        <p className="text-sm text-gray-500">Select how you'd like to register</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className={`p-6 border-2 rounded-2xl text-center transition-all ${
            accountType === 'individual' 
              ? 'border-brave-teal bg-brave-teal/10 shadow-lg' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => handleAccountTypeSelect('individual')}
        >
          <User className={`h-10 w-10 mx-auto mb-3 ${
            accountType === 'individual' ? 'text-brave-teal' : 'text-gray-400'
          }`} />
          <div className="font-semibold text-lg">Individual</div>
          <div className="text-sm text-gray-500">For personal investors</div>
        </button>

        <button
          type="button"
          className={`p-6 border-2 rounded-2xl text-center transition-all ${
            accountType === 'business' 
              ? 'border-brave-teal bg-brave-teal/10 shadow-lg' 
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          }`}
          onClick={() => handleAccountTypeSelect('business')}
        >
          <Building className={`h-10 w-10 mx-auto mb-3 ${
            accountType === 'business' ? 'text-brave-teal' : 'text-gray-400'
          }`} />
          <div className="font-semibold text-lg">Business</div>
          <div className="text-sm text-gray-500">For companies & organizations</div>
        </button>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {accountType === 'individual' ? 'Personal Information' : 'Business Information'}
        </h3>
        <p className="text-sm text-gray-500">
          {accountType === 'individual' 
            ? 'Tell us about yourself' 
            : 'Tell us about your business'}
        </p>
      </div>

      {accountType === 'individual' ? (
        // Individual Fields
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium block mb-2">First Name *</Label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="John"
                icon={User}
                required
              />
            </div>
            <div>
              <Label className="text-sm font-medium block mb-2">Last Name *</Label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium block mb-2">Date of Birth *</Label>
            <Input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              icon={Calendar}
              required
            />
          </div>
        </>
      ) : (
        // Business Fields
        <>
          <div>
            <Label className="text-sm font-medium block mb-2">Business Name *</Label>
            <Input
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="Your company name"
              icon={Building2}
              required
            />
          </div>

          <div>
            <Label className="text-sm font-medium block mb-2">Registration Number *</Label>
            <Input
              value={formData.businessRegistrationNumber}
              onChange={(e) => handleChange('businessRegistrationNumber', e.target.value)}
              placeholder="RC Number or Business Registration ID"
              icon={FileText}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium block mb-2">Business Type *</Label>
              <Select
                value={formData.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
              >
                {businessTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label className="text-sm font-medium block mb-2">Industry *</Label>
              <Select
                value={formData.businessIndustry}
                onChange={(e) => handleChange('businessIndustry', e.target.value)}
              >
                {industries.map(industry => (
                  <option key={industry.value} value={industry.value}>{industry.label}</option>
                ))}
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium block mb-2">Business Address *</Label>
            <Input
              value={formData.businessAddress}
              onChange={(e) => handleChange('businessAddress', e.target.value)}
              placeholder="Full business address"
              icon={MapPin}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium block mb-2">City</Label>
              <Input
                value={formData.businessCity}
                onChange={(e) => handleChange('businessCity', e.target.value)}
                placeholder="Lagos"
              />
            </div>
            <div>
              <Label className="text-sm font-medium block mb-2">State/Province</Label>
              <Input
                value={formData.businessState}
                onChange={(e) => handleChange('businessState', e.target.value)}
                placeholder="Lagos State"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium block mb-2">Years in Operation *</Label>
            <Input
              type="number"
              value={formData.yearsInOperation}
              onChange={(e) => handleChange('yearsInOperation', e.target.value)}
              placeholder="Number of years"
              icon={Calendar}
              required
            />
          </div>
        </>
      )}

      {/* Common Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-sm font-medium block mb-2">Nationality</Label>
          <Select
            value={formData.nationality}
            onChange={(e) => handleChange('nationality', e.target.value)}
          >
            <option value="Nigerian">Nigerian</option>
            <option value="Ghanaian">Ghanaian</option>
            <option value="Kenyan">Kenyan</option>
            <option value="South African">South African</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium block mb-2">Country of Residence</Label>
          <Select
            value={formData.countryOfResidence}
            onChange={(e) => handleChange('countryOfResidence', e.target.value)}
          >
            <option value="Nigeria">Nigeria</option>
            <option value="Ghana">Ghana</option>
            <option value="Kenya">Kenya</option>
            <option value="South Africa">South Africa</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Other">Other</option>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Email Address *</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="you@example.com"
          icon={Mail}
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Phone Number *</Label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="08012345678"
          icon={Phone}
          required
        />
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Password *</Label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Minimum 8 characters"
            icon={Lock}
            minLength={8}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Must contain at least 8 characters with uppercase, lowercase, and numbers</p>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Confirm Password *</Label>
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            placeholder="Confirm your password"
            minLength={8}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1 bg-brave-teal hover:bg-brave-teal/90 text-white rounded-full"
          onClick={handleNext}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderInvestorProfile = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Investor Profile</h3>
        <p className="text-sm text-gray-500">Tell us about how you'll be investing</p>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">I want to</Label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className={`p-4 border-2 rounded-xl text-center transition-all ${
              formData.role === 'investor' 
                ? 'border-brave-teal bg-brave-teal/10' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleChange('role', 'investor')}
          >
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-brave-teal" />
            <div className="font-semibold">Invest</div>
            <div className="text-xs text-gray-500">Build your portfolio</div>
          </button>
          <button
            type="button"
            className={`p-4 border-2 rounded-xl text-center transition-all ${
              formData.role === 'borrower' 
                ? 'border-brave-teal bg-brave-teal/10' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleChange('role', 'borrower')}
          >
            <Building className="h-6 w-6 mx-auto mb-2 text-brave-teal" />
            <div className="font-semibold">Raise Funds</div>
            <div className="text-xs text-gray-500">Get funding for your project</div>
          </button>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Investor Type</Label>
        <Select
          value={formData.investorType}
          onChange={(e) => handleChange('investorType', e.target.value)}
        >
          <option value="individual">Individual Investor</option>
          <option value="corporate">Corporate/Institutional</option>
          <option value="cooperative">Cooperative</option>
          <option value="diaspora">Diaspora Group</option>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">City</Label>
        <Input
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
          placeholder="Your city"
          icon={MapPin}
        />
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Residential/Business Address</Label>
        <Input
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Your full address"
          icon={Home}
        />
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Referral Code (Optional)</Label>
        <Input
          value={formData.referralCode}
          onChange={(e) => handleChange('referralCode', e.target.value)}
          placeholder="Enter referral code if you have one"
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1 bg-brave-teal hover:bg-brave-teal/90 text-white rounded-full"
          onClick={handleNext}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderInvestmentPreferences = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Investment Preferences</h3>
        <p className="text-sm text-gray-500">Help us match you with the right opportunities</p>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Investment Experience</Label>
        <Select
          value={formData.investmentExperience}
          onChange={(e) => handleChange('investmentExperience', e.target.value)}
        >
          <option value="beginner">Beginner - First time investor</option>
          <option value="intermediate">Intermediate - Some experience</option>
          <option value="advanced">Advanced - Experienced investor</option>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Risk Tolerance</Label>
        <div className="grid grid-cols-3 gap-3">
          {['conservative', 'moderate', 'aggressive'].map((level) => (
            <button
              key={level}
              type="button"
              className={`p-3 border-2 rounded-xl text-center transition-all capitalize ${
                formData.riskTolerance === level 
                  ? 'border-brave-teal bg-brave-teal/10' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleChange('riskTolerance', level)}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Investment Goals</Label>
        <div className="grid grid-cols-2 gap-2">
          {investmentGoals.map((goal) => (
            <button
              key={goal.value}
              type="button"
              className={`p-3 border-2 rounded-xl text-sm transition-all ${
                formData.investmentGoals.includes(goal.value)
                  ? 'border-brave-teal bg-brave-teal/10 text-brave-teal'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleMultiSelect('investmentGoals', goal.value)}
            >
              {goal.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium block mb-2">Preferred Sectors</Label>
        <div className="grid grid-cols-2 gap-2">
          {sectors.map((sector) => (
            <button
              key={sector.value}
              type="button"
              className={`p-3 border-2 rounded-xl text-sm transition-all ${
                formData.preferredSectors.includes(sector.value)
                  ? 'border-brave-teal bg-brave-teal/10 text-brave-teal'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleMultiSelect('preferredSectors', sector.value)}
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-start gap-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
        <input
          type="checkbox"
          checked={formData.acceptedTerms}
          onChange={(e) => handleChange('acceptedTerms', e.target.checked)}
          className="mt-1 h-4 w-4 text-brave-teal rounded border-gray-300 focus:ring-brave-teal"
        />
        <div>
          <div className="font-medium">Terms of Service</div>
          <div className="text-sm text-gray-500">Accept our Terms of Service and User Agreement</div>
        </div>
      </label>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1 bg-brave-teal hover:bg-brave-teal/90 text-white rounded-full"
          onClick={handleNext}
        >
          Continue <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Compliance & Agreements</h3>
        <p className="text-sm text-gray-500">Please review and accept the following terms</p>
      </div>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={formData.acceptedPrivacyPolicy}
            onChange={(e) => handleChange('acceptedPrivacyPolicy', e.target.checked)}
            className="mt-1 h-4 w-4 text-brave-teal rounded border-gray-300 focus:ring-brave-teal"
          />
          <div>
            <div className="font-medium">Privacy Policy</div>
            <div className="text-sm text-gray-500">Accept our Privacy Policy and Data Protection terms</div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={formData.acceptedRiskDisclosure}
            onChange={(e) => handleChange('acceptedRiskDisclosure', e.target.checked)}
            className="mt-1 h-4 w-4 text-brave-teal rounded border-gray-300 focus:ring-brave-teal"
          />
          <div>
            <div className="font-medium">Risk Disclosure</div>
            <div className="text-sm text-gray-500">Acknowledge that you understand the risks of investing</div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={formData.acknowledgedKYC}
            onChange={(e) => handleChange('acknowledgedKYC', e.target.checked)}
            className="mt-1 h-4 w-4 text-brave-teal rounded border-gray-300 focus:ring-brave-teal"
          />
          <div>
            <div className="font-medium">KYC Acknowledgement</div>
            <div className="text-sm text-gray-500">Acknowledge that KYC verification is required for all investors</div>
          </div>
        </label>

        <label className="flex items-start gap-3 p-4 border-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={formData.isPEP}
            onChange={(e) => handleChange('isPEP', e.target.checked)}
            className="mt-1 h-4 w-4 text-brave-teal rounded border-gray-300 focus:ring-brave-teal"
          />
          <div>
            <div className="font-medium">Politically Exposed Person (PEP)</div>
            <div className="text-sm text-gray-500">Check if you or any family member is a politically exposed person</div>
          </div>
        </label>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <strong>Security Notice:</strong> Your information is encrypted and protected. 
            BraveVest complies with all applicable data protection and financial regulations.
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-xl border border-red-200">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline"
          className="flex-1 rounded-full"
          onClick={handleBack}
          disabled={isLoading}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          className="flex-1 rounded-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
              Creating Account...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Create Account
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderStep = () => {
    if (step === 1) {
      return renderAccountTypeSelection();
    }
    switch(step) {
      case 2:
        return renderPersonalInfo();
      case 3:
        return renderInvestorProfile();
      case 4:
        return renderInvestmentPreferences();
      case 5:
        return renderCompliance();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center py-8">
      <div className="w-full max-w-2xl px-4">
        {/* Step Indicator */}
        {step > 1 && renderStepIndicator()}

        {/* Main Card */}
        <Card className="shadow-xl border-0 rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-brave-teal/5 to-brave-lime/5 pb-6">
            <CardTitle className="text-2xl text-center font-serif font-light text-gray-900">
              {step === 1 && 'Choose Account Type'}
              {step === 2 && 'Personal Information'}
              {step === 3 && 'Complete Your Profile'}
              {step === 4 && 'Set Your Preferences'}
              {step === 5 && 'Finalize Registration'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              {renderStep()}
            </form>

            {step > 1 && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-brave-teal hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}