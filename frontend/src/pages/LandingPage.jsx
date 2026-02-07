import React, { useState, useEffect, useContext } from 'react';
import Login from '../modals/Login';
import Signup from '../modals/Signup';
import { 
  Dumbbell, 
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Play,
  Target,
  TrendingUp,
  Heart,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { MembershipContext } from '../context/MembershipContext';
import { AuthContext } from '../context/AuthContext';
import config from '../config'

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { availablePlans, fetchAvailablePlans } = useContext(MembershipContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  

  useEffect(() => {
    fetchAvailablePlans();
  }, [fetchAvailablePlans]);

  const navigate = useNavigate();


  const handleBuy = async (planId) => {
    if (!isAuthenticated) {
      alert("Login first");
      return;
    }
    try {
      const payload = {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Token ${user.token}`
        },
        body: JSON.stringify({ plan_id: planId })
      };
      const response = await fetch(`${config.apiBaseUrl}/api/memberships/`, payload);
      const data = await response.json();
      navigate(`/payment?membership_id=${data.id}&amount=${data.price}`);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowRegisterModal(false);
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  const features = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Personal Training',
      description: 'One-on-one sessions with certified trainers to achieve your specific goals.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Group Classes',
      description: 'High-energy group workouts including HIIT, Yoga, Pilates, and more.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Expert Trainers',
      description: 'Certified professionals with years of experience in fitness training.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: '24/7 Access',
      description: 'Work out on your schedule with round-the-clock gym access.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Nutrition Guidance',
      description: 'Personalized meal plans and nutrition counseling for optimal results.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'Advanced analytics to monitor your fitness journey and achievements.'
    }
  ];

  const trainers = [
    {
      name: 'Sarah Wilson',
      specialty: 'HIIT & Strength Training',
      experience: '8 Years Experience',
      image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      certifications: ['NASM-CPT', 'CrossFit L2']
    },
    {
      name: 'Mike Johnson',
      specialty: 'Bodybuilding & Powerlifting',
      experience: '12 Years Experience',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face',
      rating: 4.8,
      certifications: ['ACSM-CPT', 'NSCA-CSCS']
    },
    {
      name: 'Emma Davis',
      specialty: 'Yoga & Flexibility',
      experience: '6 Years Experience',
      image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=400&h=400&fit=crop&crop=face',
      rating: 4.9,
      certifications: ['RYT-500', 'Pilates Certified']
    },
    {
      name: 'Alex Chen',
      specialty: 'Cardio & Weight Loss',
      experience: '5 Years Experience',
      image: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face',
      rating: 4.7,
      certifications: ['ACE-CPT', 'Nutrition Specialist']
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&h=400&fit=crop',
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&h=400&fit=crop'
  ];

  const testimonials = [
    {
      name: 'Jennifer Smith',
      role: 'Marketing Executive',
      content: 'Rao Fitness transformed my fitness journey completely. The trainers are amazing and the facilities are top-notch!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'David Brown',
      role: 'Software Engineer',
      content: 'Best gym experience I\'ve ever had. The 24/7 access fits perfectly with my schedule, and the results speak for themselves.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Lisa Martinez',
      role: 'Teacher',
      content: 'The group classes are incredible! I\'ve made great friends and achieved fitness goals I never thought possible.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'lg:bg-transparent bg-black/10 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/")}>
              <img 
                src="/assets/raoBranding2.png" 
                alt="Rao Fitness Logo" 
                className="h-20 object-contain"
              />
            </div>


            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Home', 'About', 'Trainers', 'Classes', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium transition-colors hover:text-blue-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
            onClick={openRegisterModal}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 lg:pt-0 xs:pt-52 pt-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Body,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Transform Your Life
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Join thousands of members who've achieved their fitness goals with our expert trainers, 
            state-of-the-art equipment, and personalized programs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button onClick={openRegisterModal} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center space-x-2">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            {[
              { number: '5K+', label: 'Happy Members' },
              { number: '50+', label: 'Expert Trainers' },
              { number: '100+', label: 'Classes Weekly' },
              { number: '24/7', label: 'Gym Access' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Rao Fitness?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to achieve your fitness goals in a supportive, 
              motivating environment with cutting-edge facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Expert Trainers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certified trainers are here to guide, motivate, and help you achieve 
              your fitness goals safely and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100">
                <div className="relative">
                  <img 
                    src={trainer.image} 
                    alt={trainer.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold">{trainer.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{trainer.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{trainer.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4">{trainer.experience}</p>
                  <div className="flex flex-wrap gap-2">
                    {trainer.certifications.map((cert, i) => (
                      <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              State-of-the-Art Facilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our modern gym facilities designed to provide you with 
              the best workout experience possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={image} 
                  alt={`Gym facility ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people who transformed their lives at Rao Fitness.
            </p>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="flex items-center mb-6">
                <img 
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full mr-4 border-4 border-white"
                />
                <div>
                  <h4 className="text-xl font-bold">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-blue-200">{testimonials[activeTestimonial].role}</p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-lg leading-relaxed">"{testimonials[activeTestimonial].content}"</p>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible membership options designed to fit your lifestyle and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {availablePlans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular ? 'border-blue-600 transform scale-105' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline mb-8">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">{plan.period}</span>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button onClick={()=>handleBuy(plan.id)} className={`w-full py-3 px-6 rounded-full font-bold transition-all ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}>
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join Rao Fitness today and get your first week absolutely free. 
            No commitment required - just results guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-bold text-lg transition-all">
              Schedule a Tour
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Dumbbell className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Rao Fitness</span>
              </div>
              <p className="text-gray-400 mb-6">
                Transform your life with our world-class fitness facilities, 
                expert trainers, and supportive community.
              </p>
              <div className="flex space-x-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                  <button key={index} className="text-gray-400 hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Classes', 'Trainers', 'Membership', 'Contact'].map((link) => (
                  <li key={link}>
                    <button type="button" className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {['Personal Training', 'Group Classes', 'Nutrition Coaching', 'Fitness Assessment', 'Recovery Therapy'].map((service) => (
                  <li key={service}>
                    <button type="button" className="text-gray-400 hover:text-white transition-colors bg-transparent border-0 p-0 cursor-pointer text-left">
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">123 Fitness St, Health City, HC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-400">info@raofitness.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Rao Fitness. All rights reserved. | Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
      {
        showLoginModal &&(<Login closeModals={closeModals} openRegisterModal = {openRegisterModal}/>)
      }
      {
        showRegisterModal &&(<Signup closeModals={closeModals} openLoginModal = {openLoginModal}/>)
      }
    </div>
  );
};

export default LandingPage;