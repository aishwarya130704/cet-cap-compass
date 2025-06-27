
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Award, Mail, Lock, User, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    examType: 'MHT-CET',
    stream: 'Engineering'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simple login validation
      const storedUser = localStorage.getItem('mhtcet_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === formData.email && user.password === formData.password) {
          toast({
            title: "Welcome back!",
            description: "Successfully logged in to your account.",
          });
          navigate('/dashboard');
          return;
        }
      }
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again or sign up.",
        variant: "destructive"
      });
    } else {
      // Sign up
      if (formData.name && formData.email && formData.password) {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          examType: formData.examType,
          stream: formData.stream,
          joinedDate: new Date().toISOString(),
          capList: []
        };
        
        localStorage.setItem('mhtcet_user', JSON.stringify(userData));
        
        toast({
          title: "Account Created!",
          description: "Welcome to CET Counselor. Let's find your perfect college!",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Please fill all fields",
          description: "All fields are required to create your account.",
          variant: "destructive"
        });
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-2 rounded-lg">
            <Award className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            CET Counselor
          </span>
        </div>
      </div>

      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-gradient-to-r from-blue-600 to-orange-600 p-3 rounded-full w-fit mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
            {isLogin ? 'Welcome Back!' : 'Join CET Counselor'}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isLogin 
              ? 'Sign in to access your personalized college recommendations' 
              : 'Create your account to start your college journey'
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="examType" className="text-gray-700 font-medium">Exam Type</Label>
                  <select
                    id="examType"
                    value={formData.examType}
                    onChange={(e) => handleInputChange('examType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="MHT-CET">MHT-CET</option>
                    <option value="JEE">JEE Mains</option>
                    <option value="HSC">HSC Board</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stream" className="text-gray-700 font-medium">Stream</Label>
                  <select
                    id="stream"
                    value={formData.stream}
                    onChange={(e) => handleInputChange('stream', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 py-2.5 text-lg font-medium"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
