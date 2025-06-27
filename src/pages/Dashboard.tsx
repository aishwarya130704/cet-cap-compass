
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  BookOpen, 
  TrendingUp, 
  Heart, 
  Award, 
  Target,
  MapPin,
  Calendar,
  ArrowRight,
  Star,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [recentActivity] = useState([
    { action: 'Viewed cutoffs for', college: 'VJTI Mumbai', time: '2 hours ago' },
    { action: 'Added to CAP list', college: 'COEP Pune', time: '1 day ago' },
    { action: 'Checked trends for', college: 'PICT Pune', time: '2 days ago' }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem('mhtcet_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('mhtcet_user');
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  const quickActions = [
    {
      title: 'Find Colleges',
      description: 'Discover colleges based on your rank',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-blue-500',
      action: () => navigate('/college-finder')
    },
    {
      title: 'View Cutoffs',
      description: 'Analyze historical cutoff trends',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'bg-green-500',
      action: () => navigate('/cutoff-trends')
    },
    {
      title: 'My CAP List',
      description: 'Manage your saved colleges',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-500',
      action: () => navigate('/cap-list')
    },
    {
      title: 'CAP Guide',
      description: 'Learn about counseling process',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-purple-500',
      action: () => navigate('/cap-guide')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200">
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
              <span className="text-gray-600">Welcome, {user.name}!</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name}! 🎓
          </h1>
          <p className="text-gray-600 text-lg">
            Ready to find your perfect college? Let's continue your journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <Card className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{user.name}</CardTitle>
                    <CardDescription className="text-white/80">
                      {user.examType} • {user.stream}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold">{user.capList?.length || 0}</div>
                    <div className="text-sm text-white/80">Colleges in CAP List</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {Math.floor((Date.now() - new Date(user.joinedDate).getTime()) / (1000 * 60 * 60 * 24))}
                    </div>
                    <div className="text-sm text-white/80">Days with us</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Jump straight to the tools you need
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      onClick={action.action}
                      className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    >
                      <div className={`${action.color} p-2 rounded-lg text-white mr-3`}>
                        {action.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{action.title}</div>
                        <div className="text-sm text-gray-600">{action.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <GraduationCap className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">
                            {activity.action} <span className="text-blue-600">{activity.college}</span>
                          </div>
                          <div className="text-sm text-gray-500">{activity.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* CAP Round Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">CAP Round Progress</CardTitle>
                <CardDescription>Track your counseling journey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Document Verification</span>
                    <span className="text-green-600 font-medium">Complete</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>College Research</span>
                    <span className="text-orange-600 font-medium">In Progress</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Choice Filling</span>
                    <span className="text-gray-400 font-medium">Pending</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Dates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-blue-800">CAP Round 1</div>
                    <div className="text-sm text-blue-600">Choice Filling</div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">
                    Jul 15-20
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium text-orange-800">CAP Round 2</div>
                    <div className="text-sm text-orange-600">Choice Filling</div>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">
                    Jul 25-30
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-800">Final Round</div>
                    <div className="text-sm text-green-600">Last Chance</div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Aug 5-10
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Pro Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <div className="font-medium text-yellow-800 mb-1">Research Thoroughly</div>
                  <div className="text-sm text-yellow-700">
                    Check college infrastructure, placement records, and faculty before making choices.
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                  <div className="font-medium text-green-800 mb-1">Plan Your Preferences</div>
                  <div className="text-sm text-green-700">
                    Create a balanced list with safe, moderate, and ambitious choices.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
