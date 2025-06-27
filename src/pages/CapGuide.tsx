
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  BookOpen, 
  Award, 
  ArrowLeft, 
  Calendar,
  FileText,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  GraduationCap,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CapGuide = () => {
  const navigate = useNavigate();

  const capRounds = [
    {
      round: "CAP Round 1",
      duration: "July 15-20, 2024",
      description: "First round of counseling with choice filling and document verification",
      status: "upcoming",
      steps: [
        "Document verification at designated centers",
        "Choice filling and locking",
        "Provisional allotment display",
        "Confirmation of admission"
      ]
    },
    {
      round: "CAP Round 2", 
      duration: "July 25-30, 2024",
      description: "Second round for remaining seats and fresh applications",
      status: "upcoming",
      steps: [
        "Fresh choice filling for unallotted candidates",
        "Document verification for new candidates",
        "Provisional allotment display",
        "Confirmation of admission"
      ]
    },
    {
      round: "CAP Round 3",
      duration: "August 5-10, 2024",
      description: "Final round including institutional level counseling",
      status: "upcoming",
      steps: [
        "Final choice filling",
        "Allotment of remaining seats",
        "Institutional level counseling",
        "Final admission confirmation"
      ]
    }
  ];

  const requiredDocuments = [
    "MHT-CET/JEE Score Card",
    "HSC Mark Sheet",
    "SSC Mark Sheet",
    "Domicile Certificate",
    "Caste Certificate (if applicable)",
    "Non-Creamy Layer Certificate (for OBC)",
    "Income Certificate",
    "Aadhar Card",
    "Passport Size Photographs",
    "Transfer Certificate"
  ];

  const importantTips = [
    {
      title: "Research Thoroughly",
      description: "Study college infrastructure, placement records, faculty, and alumni network before making choices.",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />
    },
    {
      title: "Balanced Choice List",
      description: "Include safe colleges (80% chance), moderate colleges (50% chance), and dream colleges (20% chance).",
      icon: <Users className="h-5 w-5 text-green-600" />
    },
    {
      title: "Location Matters",
      description: "Consider proximity to home, city infrastructure, cost of living, and career opportunities.",
      icon: <MapPin className="h-5 w-5 text-orange-600" />
    },
    {
      title: "Branch vs College",
      description: "Sometimes a better branch in a decent college is preferable to a mediocre branch in a top college.",
      icon: <GraduationCap className="h-5 w-5 text-purple-600" />
    }
  ];

  const faqData = [
    {
      question: "What is the difference between MHT-CET and JEE counseling?",
      answer: "MHT-CET counseling is specifically for Maharashtra state colleges and includes state quota seats. JEE counseling covers both state and all-India quota seats. Students can participate in both processes."
    },
    {
      question: "Can I change my choices after locking?",
      answer: "No, once you lock your choices, they cannot be modified. However, you can fill fresh choices in subsequent rounds if you don't get allotted or reject your allotment."
    },
    {
      question: "What happens if I don't report to college after allotment?",
      answer: "If you don't report within the specified time, your seat will be cancelled and offered to the next eligible candidate. You may lose your opportunity for that particular round."
    },
    {
      question: "Can I participate in multiple counseling processes?",
      answer: "Yes, you can participate in MHT-CET, JEE, and other state counseling processes simultaneously. However, you can only confirm admission in one college."
    },
    {
      question: "How many choices should I fill?",
      answer: "Fill as many choices as possible (usually 100+) to maximize your chances. Include colleges across different locations and fee structures."
    }
  ];

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
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  CAP Guide
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete CAP Counseling Guide</h1>
          <p className="text-gray-600 text-lg">
            Everything you need to know about Maharashtra CET counseling process
          </p>
        </div>

        {/* Overview */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-orange-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Info className="h-6 w-6 mr-3" />
              What is CAP Counseling?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-white/90">
              Centralized Admission Process (CAP) is the unified counseling system for engineering and pharmacy admissions 
              in Maharashtra. It's conducted by the Directorate of Technical Education (DTE) for MHT-CET qualified students.
            </p>
          </CardContent>
        </Card>

        {/* CAP Rounds */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              CAP Rounds Timeline
            </CardTitle>
            <CardDescription>
              Understanding the three rounds of CAP counseling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {capRounds.map((round, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{round.round}</h3>
                    <Badge className="bg-blue-100 text-blue-800">
                      <Clock className="h-3 w-3 mr-1" />
                      {round.duration}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-3">{round.description}</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {round.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Required Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Required Documents
            </CardTitle>
            <CardDescription>
              Keep these documents ready for verification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 mr-3 text-green-500" />
                  <span className="text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 mr-2 text-amber-600" />
                <span className="font-semibold text-amber-800">Important Note</span>
              </div>
              <p className="text-amber-700 text-sm">
                Carry original documents along with photocopies. Some documents may require attestation by gazetted officer.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pro Tips */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Expert Tips for Success
            </CardTitle>
            <CardDescription>
              Insider advice from counseling experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {importantTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="bg-white p-2 rounded-lg">{tip.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                    <p className="text-gray-600 text-sm">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common queries about CAP counseling process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-orange-600 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-lg text-white/90 mb-6">
                Use our college finder and cutoff analysis tools to make informed decisions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate('/college-finder')}
                  className="bg-white text-blue-600 hover:bg-gray-50"
                >
                  Find Colleges
                </Button>
                <Button 
                  onClick={() => navigate('/cutoff-trends')}
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  View Cutoffs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CapGuide;
