
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, Users, Target, ArrowRight, Star, Award, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('mhtcet_user');
    setIsLoggedIn(!!user);
  }, []);

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Cutoff Analysis",
      description: "Analyze past 5 years cutoff trends with interactive charts"
    },
    {
      icon: <Target className="h-8 w-8 text-orange-600" />,
      title: "Smart Predictions",
      description: "Get personalized college suggestions based on your rank"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "CAP Round Guide",
      description: "Step-by-step guidance for all CAP rounds"
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Category-wise Data",
      description: "Filters for OPEN, OBC, SC, ST and other categories"
    }
  ];

  const stats = [
    { number: "400+", label: "Engineering Colleges" },
    { number: "150+", label: "Pharmacy Colleges" },
    { number: "5 Years", label: "Historical Data" },
    { number: "10K+", label: "Students Helped" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-2 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                CET Counselor
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <Button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => navigate('/login')}
                    className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-orange-100 text-blue-800 border-blue-200">
              <Star className="h-4 w-4 mr-1" />
              Trusted by 10,000+ Maharashtra Students
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600 bg-clip-text text-transparent">
              Your MHT-CET & JEE Success Partner
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Analyze cutoffs, predict your chances, and create your perfect college list for CAP rounds. 
              Make informed decisions with 5+ years of historical data and smart AI predictions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
                className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 px-8 py-3 text-lg"
              >
                {isLoggedIn ? 'Go to Dashboard' : 'Start Your Journey'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate('/college-finder')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                Explore Colleges
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/60">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">
              Everything You Need for CAP Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and insights to help you make the best college choices
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-50 to-orange-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Find Your Perfect College?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of students who made smart college choices with our platform
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate(isLoggedIn ? '/dashboard' : '/login')}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold"
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Get Started Now'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-2 rounded-lg">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">CET Counselor</span>
              </div>
              <p className="text-gray-400">
                Empowering Maharashtra students to make informed college choices
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/college-finder" className="hover:text-white transition-colors">College Finder</a></li>
                <li><a href="/cutoff-trends" className="hover:text-white transition-colors">Cutoff Analysis</a></li>
                <li><a href="/cap-guide" className="hover:text-white transition-colors">CAP Guide</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Exams</h3>
              <ul className="space-y-2 text-gray-400">
                <li>MHT-CET Engineering</li>
                <li>MHT-CET Pharmacy</li>
                <li>JEE Mains</li>
                <li>HSC Board</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="text-gray-400 space-y-2">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Maharashtra, India
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CET Counselor. Built for Maharashtra students with ❤️</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
