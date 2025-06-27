
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Award, ArrowLeft, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CutoffTrends = () => {
  const navigate = useNavigate();
  const [selectedCollege, setSelectedCollege] = useState('vjti');
  const [selectedBranch, setSelectedBranch] = useState('computer');
  const [selectedCategory, setSelectedCategory] = useState('open');

  // Mock cutoff data
  const cutoffData = {
    vjti: {
      name: 'VJTI Mumbai',
      computer: {
        open: [
          { year: '2019', cutoff: 450, seats: 120 },
          { year: '2020', cutoff: 520, seats: 120 },
          { year: '2021', cutoff: 380, seats: 120 },
          { year: '2022', cutoff: 420, seats: 120 },
          { year: '2023', cutoff: 390, seats: 120 }
        ],
        obc: [
          { year: '2019', cutoff: 1200, seats: 40 },
          { year: '2020', cutoff: 1350, seats: 40 },
          { year: '2021', cutoff: 980, seats: 40 },
          { year: '2022', cutoff: 1100, seats: 40 },
          { year: '2023', cutoff: 1050, seats: 40 }
        ]
      },
      mechanical: {
        open: [
          { year: '2019', cutoff: 800, seats: 100 },
          { year: '2020', cutoff: 920, seats: 100 },
          { year: '2021', cutoff: 720, seats: 100 },
          { year: '2022', cutoff: 780, seats: 100 },
          { year: '2023', cutoff: 750, seats: 100 }
        ]
      }
    },
    coep: {
      name: 'COEP Pune',
      computer: {
        open: [
          { year: '2019', cutoff: 1200, seats: 100 },
          { year: '2020', cutoff: 1400, seats: 100 },
          { year: '2021', cutoff: 1050, seats: 100 },
          { year: '2022', cutoff: 1180, seats: 100 },
          { year: '2023', cutoff: 1150, seats: 100 }
        ]
      }
    }
  };

  const colleges = [
    { id: 'vjti', name: 'VJTI Mumbai' },
    { id: 'coep', name: 'COEP Pune' },
    { id: 'pict', name: 'PICT Pune' }
  ];

  const branches = [
    { id: 'computer', name: 'Computer Engineering' },
    { id: 'mechanical', name: 'Mechanical Engineering' },
    { id: 'electronics', name: 'Electronics Engineering' }
  ];

  const categories = [
    { id: 'open', name: 'OPEN' },
    { id: 'obc', name: 'OBC' },
    { id: 'sc', name: 'SC' },
    { id: 'st', name: 'ST' }
  ];

  const getCurrentData = () => {
    const college = cutoffData[selectedCollege as keyof typeof cutoffData];
    if (!college) return [];
    
    const branch = college[selectedBranch as keyof typeof college];
    if (!branch) return [];
    
    const categoryData = branch[selectedCategory as keyof typeof branch];
    return categoryData || [];
  };

  const currentData = getCurrentData();
  const currentCollege = cutoffData[selectedCollege as keyof typeof cutoffData];

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
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  Cutoff Trends
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cutoff Trends Analysis</h1>
          <p className="text-gray-600 text-lg">
            Analyze historical cutoff trends to make informed decisions
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Select Parameters
            </CardTitle>
            <CardDescription>
              Choose college, branch, and category to view cutoff trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">College</label>
                <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colleges.map(college => (
                      <SelectItem key={college.id} value={college.id}>
                        {college.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Branch</label>
                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {currentData.length > 0 ? (
          <>
            {/* Summary Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Latest Cutoff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {currentData[currentData.length - 1]?.cutoff}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Rank in 2023</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Lowest Cutoff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.min(...currentData.map(d => d.cutoff))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Best rank needed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Highest Cutoff</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {Math.max(...currentData.map(d => d.cutoff))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Toughest year</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Available Seats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {currentData[0]?.seats || 'N/A'}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Per year</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Cutoff Trend (5 Years)</CardTitle>
                  <CardDescription>
                    Historical cutoff ranks for {currentCollege?.name} - {branches.find(b => b.id === selectedBranch)?.name} ({selectedCategory.toUpperCase()})
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="cutoff" 
                          stroke="#2563eb" 
                          strokeWidth={3}
                          dot={{ fill: '#2563eb', strokeWidth: 2, r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Year-wise Comparison</CardTitle>
                  <CardDescription>
                    Cutoff ranks comparison across years
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={currentData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          dataKey="cutoff" 
                          fill="url(#colorGradient)"
                          radius={[4, 4, 0, 0]}
                        />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.9}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.9}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Detailed Analysis</CardTitle>
                <CardDescription>
                  Year-wise cutoff data with insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentData.map((data, index) => {
                    const prevData = currentData[index - 1];
                    const change = prevData ? data.cutoff - prevData.cutoff : 0;
                    const changePercent = prevData ? ((change / prevData.cutoff) * 100).toFixed(1) : null;
                    
                    return (
                      <div key={data.year} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-gray-800">{data.year}</div>
                          <div className="text-sm text-gray-600">Cutoff Rank: {data.cutoff}</div>
                        </div>
                        <div className="text-right">
                          {changePercent && (
                            <Badge 
                              variant={change > 0 ? "destructive" : "default"}
                              className={change > 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}
                            >
                              {change > 0 ? '+' : ''}{changePercent}%
                            </Badge>
                          )}
                          <div className="text-sm text-gray-500 mt-1">
                            {change > 0 ? 'Harder' : change < 0 ? 'Easier' : 'Same'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <TrendingUp className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No data available</h3>
              <p className="text-gray-500">
                Cutoff data for the selected combination is not available. Try different parameters.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CutoffTrends;
