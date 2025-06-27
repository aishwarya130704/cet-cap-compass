
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Award, 
  ArrowLeft, 
  MapPin, 
  Star, 
  Trash2,
  Download,
  Share2,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CapList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [capList, setCapList] = useState<any[]>([]);

  useEffect(() => {
    const userData = localStorage.getItem('mhtcet_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setCapList(parsedUser.capList || []);
  }, [navigate]);

  const removeFromCapList = (collegeId: number) => {
    const updatedCapList = capList.filter(college => college.id !== collegeId);
    const updatedUser = { ...user, capList: updatedCapList };
    
    localStorage.setItem('mhtcet_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setCapList(updatedCapList);

    toast({
      title: "Removed from CAP List",
      description: "College has been removed from your CAP list.",
    });
  };

  const exportCapList = () => {
    const data = capList.map(college => ({
      name: college.name,
      location: college.location,
      type: college.type,
      rating: college.rating,
      cutoffRange: college.cutoffRange,
      fees: college.fees,
      placements: college.placements,
      avgPackage: college.avgPackage
    }));

    const csvContent = "data:text/csv;charset=utf-8," 
      + "Name,Location,Type,Rating,Cutoff Range,Fees,Placements,Avg Package\n"
      + data.map(row => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_cap_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "CAP List Exported",
      description: "Your CAP list has been downloaded as CSV file.",
    });
  };

  const shareCapList = () => {
    const shareText = `My CAP List for Maharashtra CET:\n\n${capList.map(college => 
      `${college.name} (${college.location}) - Rating: ${college.rating}/5`
    ).join('\n')}\n\nCreated using CET Counselor`;

    if (navigator.share) {
      navigator.share({
        title: 'My CAP List',
        text: shareText,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to Clipboard",
        description: "Your CAP list has been copied to clipboard.",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  My CAP List
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.name}!</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My CAP List ({capList.length})</h1>
          <p className="text-gray-600 text-lg">
            Your personalized list of colleges for CAP rounds counseling
          </p>
        </div>

        {capList.length > 0 ? (
          <>
            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Button 
                onClick={exportCapList}
                className="bg-green-600 hover:bg-green-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export as CSV
              </Button>
              <Button 
                onClick={shareCapList}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share List
              </Button>
              <Button 
                onClick={() => navigate('/college-finder')}
                variant="outline"
              >
                Add More Colleges
              </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Colleges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{capList.length}</div>
                  <p className="text-xs text-gray-500 mt-1">In your list</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Avg Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {(capList.reduce((sum, college) => sum + college.rating, 0) / capList.length).toFixed(1)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Out of 5.0</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Government</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {capList.filter(college => college.type === 'Government').length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Govt colleges</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Private</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {capList.filter(college => college.type === 'Private').length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Private colleges</p>
                </CardContent>
              </Card>
            </div>

            {/* College List */}
            <div className="space-y-6">
              {capList.map((college, index) => (
                <Card key={college.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-gradient-to-r from-blue-600 to-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">{college.name}</h3>
                          <Badge variant={college.type === 'Government' ? 'default' : 'secondary'}>
                            {college.type}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {college.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-1 text-yellow-500" />
                            {college.rating}/5
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                            Rank: {college.cutoffRange}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="text-gray-500">Fees</div>
                              <div className="font-medium">{college.fees}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="text-gray-500">Placements</div>
                              <div className="font-medium text-green-600">{college.placements}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Award className="h-4 w-4 mr-2 text-gray-400" />
                            <div>
                              <div className="text-gray-500">Avg Package</div>
                              <div className="font-medium text-blue-600">{college.avgPackage}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {college.branches?.slice(0, 3).map((branch: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {branch}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          onClick={() => navigate(`/cutoff-trends?college=${college.id}`)}
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          View Cutoffs
                        </Button>
                        <Button
                          onClick={() => removeFromCapList(college.id)}
                          variant="outline"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Your CAP List is Empty</h3>
              <p className="text-gray-500 mb-6">
                Start adding colleges to create your personalized list for CAP rounds
              </p>
              <Button 
                onClick={() => navigate('/college-finder')}
                className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
              >
                Find Colleges
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CapList;
