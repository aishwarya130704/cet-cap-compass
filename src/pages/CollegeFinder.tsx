
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Heart,
  Award,
  Users,
  Building,
  TrendingUp,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CollegeFinder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    examType: 'all',
    stream: 'all',
    category: 'all',
    region: 'all',
    rankRange: 'all'
  });

  // Mock college data
  const colleges = [
    {
      id: 1,
      name: 'Veermata Jijabai Technological Institute (VJTI)',
      location: 'Mumbai',
      type: 'Government',
      rating: 4.8,
      cutoffRange: '500-2000',
      branches: ['Computer Engineering', 'Mechanical Engineering', 'Electronics'],
      fees: '₹1.5L/year',
      placements: '95%',
      avgPackage: '₹12L'
    },
    {
      id: 2,
      name: 'College of Engineering Pune (COEP)',
      location: 'Pune',
      type: 'Government',
      rating: 4.7,
      cutoffRange: '800-3000',
      branches: ['Computer Engineering', 'Civil Engineering', 'Electrical'],
      fees: '₹1.2L/year',
      placements: '92%',
      avgPackage: '₹10L'
    },
    {
      id: 3,
      name: 'Pune Institute of Computer Technology (PICT)',
      location: 'Pune',
      type: 'Private',
      rating: 4.6,
      cutoffRange: '1000-4000',
      branches: ['Computer Engineering', 'IT Engineering', 'Electronics'],
      fees: '₹2.5L/year',
      placements: '98%',
      avgPackage: '₹15L'
    },
    {
      id: 4,
      name: 'Government College of Engineering Aurangabad',
      location: 'Aurangabad',
      type: 'Government',
      rating: 4.4,
      cutoffRange: '2000-8000',
      branches: ['Computer Engineering', 'Mechanical Engineering'],
      fees: '₹1L/year',
      placements: '88%',
      avgPackage: '₹8L'
    },
    {
      id: 5,
      name: 'Walchand College of Engineering Sangli',
      location: 'Sangli',
      type: 'Government',
      rating: 4.5,
      cutoffRange: '1500-6000',
      branches: ['Computer Engineering', 'Electronics Engineering'],
      fees: '₹1.3L/year',
      placements: '90%',
      avgPackage: '₹9L'
    },
    {
      id: 6,
      name: 'Institute of Chemical Technology (ICT)',
      location: 'Mumbai',
      type: 'Government',
      rating: 4.9,
      cutoffRange: '200-1000',
      branches: ['Chemical Engineering', 'Pharmacy'],
      fees: '₹2L/year',
      placements: '100%',
      avgPackage: '₹18L'
    }
  ];

  const [filteredColleges, setFilteredColleges] = useState(colleges);

  useEffect(() => {
    const userData = localStorage.getItem('mhtcet_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    let filtered = colleges.filter(college =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.region !== 'all') {
      filtered = filtered.filter(college => college.location === filters.region);
    }

    if (filters.stream !== 'all') {
      filtered = filtered.filter(college =>
        college.branches.some(branch => 
          branch.toLowerCase().includes(filters.stream.toLowerCase())
        )
      );
    }

    setFilteredColleges(filtered);
  }, [searchTerm, filters]);

  const addToCapList = (college: any) => {
    if (!user) {
      toast({
        title: "Please login",
        description: "Login to add colleges to your CAP list",
        variant: "destructive"
      });
      return;
    }

    const updatedUser = {
      ...user,
      capList: [...(user.capList || []), college]
    };

    localStorage.setItem('mhtcet_user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    toast({
      title: "Added to CAP List!",
      description: `${college.name} has been added to your CAP list.`,
    });
  };

  const isInCapList = (collegeId: number) => {
    return user?.capList?.some((college: any) => college.id === collegeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-orange-600 p-2 rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  College Finder
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <span className="text-gray-600">Welcome, {user.name}!</span>
              ) : (
                <Button onClick={() => navigate('/login')}>Login</Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Your Perfect College</h1>
          <p className="text-gray-600 text-lg">
            Discover engineering and pharmacy colleges across Maharashtra based on your preferences
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search colleges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={filters.stream} onValueChange={(value) => setFilters({...filters, stream: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Stream" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Streams</SelectItem>
                  <SelectItem value="computer">Computer Engineering</SelectItem>
                  <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                  <SelectItem value="electronics">Electronics Engineering</SelectItem>
                  <SelectItem value="civil">Civil Engineering</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.region} onValueChange={(value) => setFilters({...filters, region: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Pune">Pune</SelectItem>
                  <SelectItem value="Nagpur">Nagpur</SelectItem>
                  <SelectItem value="Aurangabad">Aurangabad</SelectItem>
                  <SelectItem value="Sangli">Sangli</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="open">OPEN</SelectItem>
                  <SelectItem value="obc">OBC</SelectItem>
                  <SelectItem value="sc">SC</SelectItem>
                  <SelectItem value="st">ST</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.rankRange} onValueChange={(value) => setFilters({...filters, rankRange: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Rank Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ranks</SelectItem>
                  <SelectItem value="1-1000">1-1000</SelectItem>
                  <SelectItem value="1000-5000">1000-5000</SelectItem>
                  <SelectItem value="5000-10000">5000-10000</SelectItem>
                  <SelectItem value="10000+">10000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredColleges.length} colleges matching your criteria
          </p>
        </div>

        <div className="grid gap-6">
          {filteredColleges.map((college) => (
            <Card key={college.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{college.name}</h3>
                      <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                        {college.type}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {college.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {college.rating}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                        Rank: {college.cutoffRange}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {college.branches.slice(0, 3).map((branch, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {branch}
                        </Badge>
                      ))}
                      {college.branches.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{college.branches.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-500">Fees</div>
                        <div className="font-medium">{college.fees}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Placements</div>
                        <div className="font-medium text-green-600">{college.placements}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Avg Package</div>
                        <div className="font-medium text-blue-600">{college.avgPackage}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      onClick={() => addToCapList(college)}
                      disabled={isInCapList(college.id)}
                      className={`${
                        isInCapList(college.id) 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700'
                      }`}
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      {isInCapList(college.id) ? 'Added' : 'Add to CAP List'}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/cutoff-trends?college=${college.id}`)}
                    >
                      View Cutoffs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No colleges found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CollegeFinder;
