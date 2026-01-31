import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Heart,
  Star,
  CheckCircle,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { analytics } from '../lib/analytics';
import { sendQuizEmail } from '../lib/email';
import PageMeta from '../components/PageMeta';

const SelfCareQuiz = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const questions = [
    {
      id: 'self_care_level',
      question: 'How would you describe your current level of self-care?',
      options: [
        { value: 'excellent', label: 'Excellent - I prioritize myself daily' },
        { value: 'good', label: 'Good - I try to take care of myself' },
        { value: 'fair', label: 'Fair - I could do better' },
        { value: 'poor', label: 'Poor - I rarely make time for myself' },
      ],
    },
    {
      id: 'stress_level',
      question: 'How would you rate your current stress level?',
      options: [
        { value: 'low', label: 'Low - I feel calm and balanced' },
        { value: 'moderate', label: 'Moderate - Some stress but manageable' },
        { value: 'high', label: 'High - I feel overwhelmed often' },
        { value: 'extreme', label: 'Extreme - I feel constantly stressed' },
      ],
    },
    {
      id: 'spiritual_connection',
      question: 'How connected do you feel to your spiritual self?',
      options: [
        {
          value: 'very_connected',
          label: 'Very connected - I practice regularly',
        },
        {
          value: 'somewhat_connected',
          label: 'Somewhat connected - I try to practice',
        },
        {
          value: 'minimally_connected',
          label: 'Minimally connected - I want to improve',
        },
        { value: 'not_connected', label: 'Not connected - I want to start' },
      ],
    },
    {
      id: 'life_satisfaction',
      question: 'How satisfied are you with your current life situation?',
      options: [
        { value: 'very_satisfied', label: 'Very satisfied - I love my life' },
        { value: 'satisfied', label: 'Satisfied - Life is good overall' },
        { value: 'neutral', label: 'Neutral - Some ups and downs' },
        { value: 'dissatisfied', label: 'Dissatisfied - I want change' },
      ],
    },
    {
      id: 'support_system',
      question: 'How strong is your support system?',
      options: [
        { value: 'very_strong', label: 'Very strong - I have great support' },
        { value: 'strong', label: 'Strong - I have good people around me' },
        {
          value: 'moderate',
          label: 'Moderate - Some support but could be better',
        },
        { value: 'weak', label: 'Weak - I feel alone in my struggles' },
      ],
    },
    {
      id: 'goals_clarity',
      question: 'How clear are you about your life goals and purpose?',
      options: [
        {
          value: 'very_clear',
          label: 'Very clear - I know exactly what I want',
        },
        { value: 'clear', label: 'Clear - I have a good sense of direction' },
        {
          value: 'somewhat_clear',
          label: 'Somewhat clear - I have some ideas',
        },
        { value: 'unclear', label: 'Unclear - I feel lost and directionless' },
      ],
    },
    {
      id: 'negative_thoughts',
      question: 'How often do negative thoughts affect your daily life?',
      options: [
        { value: 'rarely', label: 'Rarely - I maintain positive thinking' },
        {
          value: 'sometimes',
          label: 'Sometimes - Occasional negative thoughts',
        },
        { value: 'often', label: 'Often - Negative thoughts are frequent' },
        {
          value: 'constantly',
          label: 'Constantly - Negative thoughts dominate',
        },
      ],
    },
    {
      id: 'self_esteem',
      question: 'How would you rate your self-esteem?',
      options: [
        { value: 'high', label: 'High - I love and accept myself' },
        { value: 'good', label: 'Good - I generally feel good about myself' },
        { value: 'moderate', label: 'Moderate - I have ups and downs' },
        { value: 'low', label: 'Low - I struggle with self-acceptance' },
      ],
    },
    {
      id: 'healing_areas',
      question:
        'Which areas do you feel need the most healing? (Select all that apply)',
      type: 'multiple',
      options: [
        { value: 'addiction', label: 'Addiction or destructive habits' },
        { value: 'relationships', label: 'Relationships and connections' },
        { value: 'career', label: 'Career and life purpose' },
        { value: 'spiritual', label: 'Spiritual connection and growth' },
        { value: 'emotional', label: 'Emotional healing and trauma' },
        { value: 'physical', label: 'Physical health and wellness' },
        { value: 'mental', label: 'Mental health and clarity' },
        { value: 'none', label: 'I feel balanced in all areas' },
      ],
    },
    {
      id: 'preferred_approach',
      question: 'What type of spiritual guidance appeals to you most?',
      options: [
        {
          value: 'angel_cards',
          label: 'Angel card readings and divine guidance',
        },
        { value: 'life_coaching', label: 'Life coaching and goal setting' },
        {
          value: 'spiritual_recovery',
          label: 'Spiritual recovery and healing',
        },
        {
          value: 'holistic',
          label: 'Holistic approach combining multiple methods',
        },
      ],
    },
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleMultipleAnswer = (questionId, answer) => {
    setAnswers((prev) => {
      const currentAnswers = prev[questionId] || [];
      if (currentAnswers.includes(answer)) {
        return {
          ...prev,
          [questionId]: currentAnswers.filter((a) => a !== answer),
        };
      } else {
        return {
          ...prev,
          [questionId]: [...currentAnswers, answer],
        };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show contact form before generating results
      setShowContactForm(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!contactInfo.email || !contactInfo.phone) {
      toast.error('Please provide both email and phone number');
      return;
    }

    setIsLoading(true);
    await generateResults();
  };

  const generateResults = async () => {
    try {
      // Generate results
      const mockResults = {
        primaryFocus: getPrimaryFocus(),
        recommendations: generateRecommendations(),
        serviceRecommendation: getServiceRecommendation(),
        nextSteps: getNextSteps(),
      };

      // Prepare quiz data with contact info
      const quizData = {
        answers,
        results: mockResults,
        contactInfo,
      };

      // Submit quiz data to Supabase
      const { data: submissionData, error: submitError } = await supabase
        .from('form_submissions')
        .insert([
          {
            form_type: 'self_care_quiz',
            data: quizData,
            email_sent: false, // Will update after email is sent
          },
        ])
        .select()
        .single();

      if (submitError) {
        console.error('Error submitting quiz:', submitError);
        throw submitError;
      }

      const submissionId = submissionData.id;

      // Send email to Gladys
      try {
        const emailResult = await sendQuizEmail(quizData, submissionId);
        
        if (emailResult.success) {
          // Update submission to mark email as sent
          await supabase
            .from('form_submissions')
            .update({ email_sent: true })
            .eq('id', submissionId);
        } else {
          // Email failed but don't block user
          console.error('Email sending failed:', emailResult.error);
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
        // Don't block user from seeing results if email fails
      }

      // Track quiz completion in Google Analytics
      analytics.trackQuizComplete(
        Object.keys(answers).length, // score (number of questions answered)
        mockResults.primaryFocus // category
      );

      setResults(mockResults);
      setShowContactForm(false);
      toast.success('Your personalized results are ready!');
    } catch (error) {
      console.error('Error generating results:', error);
      toast.error('Error generating results. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPrimaryFocus = () => {
    const stressLevel = answers.stress_level;
    const spiritualConnection = answers.spiritual_connection;

    if (stressLevel === 'extreme' || stressLevel === 'high') {
      return 'Stress Management & Inner Peace';
    } else if (
      spiritualConnection === 'not_connected' ||
      spiritualConnection === 'minimally_connected'
    ) {
      return 'Spiritual Connection & Growth';
    } else if (answers.self_esteem === 'low') {
      return 'Self-Love & Confidence Building';
    } else {
      return 'Life Balance & Purpose Discovery';
    }
  };

  const generateRecommendations = () => {
    const recommendations = [];

    if (answers.stress_level === 'high' || answers.stress_level === 'extreme') {
      recommendations.push('Daily meditation practice (10-15 minutes)');
      recommendations.push('Breathing exercises for immediate stress relief');
      recommendations.push('Setting healthy boundaries in relationships');
    }

    if (
      answers.spiritual_connection === 'not_connected' ||
      answers.spiritual_connection === 'minimally_connected'
    ) {
      recommendations.push('Morning gratitude journaling');
      recommendations.push('Connecting with nature daily');
      recommendations.push(
        'Exploring spiritual practices that resonate with you'
      );
    }

    if (answers.self_esteem === 'low') {
      recommendations.push('Daily positive affirmations');
      recommendations.push('Self-compassion exercises');
      recommendations.push('Celebrating small wins and achievements');
    }

    if (recommendations.length === 0) {
      recommendations.push('Daily mindfulness practice');
      recommendations.push('Regular self-reflection time');
      recommendations.push('Maintaining your current positive practices');
    }

    return recommendations.slice(0, 3);
  };

  const getServiceRecommendation = () => {
    const preferredApproach = answers.preferred_approach;

    switch (preferredApproach) {
      case 'angel_cards':
        return 'Angel Card Reading Session';
      case 'life_coaching':
        return 'Life Coaching Program';
      case 'spiritual_recovery':
        return 'Spiritual Recovery Coaching';
      case 'holistic':
        return 'Comprehensive Spiritual Recovery Program';
      default:
        return 'Spiritual Recovery Coaching';
    }
  };

  const getNextSteps = () => {
    return [
      'Schedule a free consultation to discuss your personalized plan',
      'Begin implementing the three recommended practices daily',
      'Join our community for ongoing support and guidance',
    ];
  };

  const currentQuestion = questions[currentStep];
  const progress = showContactForm 
    ? 100 
    : ((currentStep + 1) / questions.length) * 100;

  // Show contact form before results
  if (showContactForm && !results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
        <div className="container-custom py-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Almost <span className="text-gradient">There!</span>
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Please provide your contact information to receive your personalized results
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="(407) 555-1234"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 btn-outline"
                  >
                    <ArrowLeft className="w-5 h-5 inline mr-2" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading || !contactInfo.name || !contactInfo.email || !contactInfo.phone}
                    className={`flex-1 btn-primary ${isLoading || !contactInfo.name || !contactInfo.email || !contactInfo.phone ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2" />
                        Generating Results...
                      </>
                    ) : (
                      <>
                        Get My Results
                        <ArrowRight className="w-5 h-5 inline ml-2" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
                Your Personalized{' '}
                <span className="text-gradient">Spiritual Recovery Plan</span>
              </h1>
              <p className="text-xl text-gray-600">
                Based on your answers, here's your customized path to
                transformation
              </p>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Primary Focus */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    Primary Focus
                  </h3>
                </div>
                <p className="text-xl text-primary-600 font-semibold mb-4">
                  {results.primaryFocus}
                </p>
                <p className="text-gray-600">
                  This area will be the foundation of your spiritual recovery
                  journey and personal transformation.
                </p>
              </div>

              {/* Recommended Service */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-spiritual-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-spiritual-600" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    Recommended Service
                  </h3>
                </div>
                <p className="text-xl text-spiritual-600 font-semibold mb-4">
                  {results.serviceRecommendation}
                </p>
                <p className="text-gray-600">
                  This service is specifically tailored to address your unique
                  needs and preferences.
                </p>
              </div>
            </div>

            {/* Three Actions */}
            <div className="bg-white rounded-xl p-8 shadow-lg mb-12">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">
                Three Actions to Transform Your Life
              </h3>
              <div className="space-y-4">
                {results.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-healing-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-healing-600 font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700 text-lg">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-primary-600 to-spiritual-600 rounded-xl p-8 text-white mb-12">
              <h3 className="text-2xl font-serif font-bold mb-6 text-center">
                Your Next Steps
              </h3>
              <div className="space-y-4">
                {results.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <p className="text-white/90 text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="text-center space-y-4">
              <button
                type="button"
                onClick={() => navigate('/contact')}
                className="btn-primary text-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                aria-label="Schedule free consultation"
              >
                Schedule Free Consultation
              </button>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-outline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Print results"
                >
                  Print Results
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setResults(null);
                    setCurrentStep(0);
                    setAnswers({});
                  }}
                  className="btn-outline focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  aria-label="Retake quiz"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-spiritual-50 pt-16">
      <PageMeta
        title="Self-Care Quiz"
        description="Free 5-minute self-care assessment. Get personalized spiritual recovery recommendations and simple actions to transform your life."
      />
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-20 h-20 bg-spiritual-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
              Self-Care <span className="text-gradient">Assessment</span>
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Discover three simple actions to transform your life and find your
              highest possibility
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <motion.div
                className="bg-spiritual-gradient h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Question {currentStep + 1} of {questions.length}
            </p>
          </motion.div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl p-8 shadow-lg"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                {currentQuestion.question}
              </h2>

              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center space-x-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      currentQuestion.type === 'multiple'
                        ? (answers[currentQuestion.id] || []).includes(
                            option.value
                          )
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                        : answers[currentQuestion.id] === option.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <input
                      type={
                        currentQuestion.type === 'multiple'
                          ? 'checkbox'
                          : 'radio'
                      }
                      name={currentQuestion.id}
                      value={option.value}
                      checked={
                        currentQuestion.type === 'multiple'
                          ? (answers[currentQuestion.id] || []).includes(
                              option.value
                            )
                          : answers[currentQuestion.id] === option.value
                      }
                      onChange={() => {
                        if (currentQuestion.type === 'multiple') {
                          handleMultipleAnswer(
                            currentQuestion.id,
                            option.value
                          );
                        } else {
                          handleAnswer(currentQuestion.id, option.value);
                        }
                      }}
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 text-lg">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
              }`}
              aria-label="Previous question"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {currentStep === questions.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={
                  isLoading || Object.keys(answers).length < questions.length
                }
                className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  isLoading || Object.keys(answers).length < questions.length
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'btn-primary'
                }`}
                aria-label="Submit quiz and see results"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                disabled={!answers[currentQuestion.id]}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  !answers[currentQuestion.id]
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
                aria-label="Next question"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfCareQuiz;
