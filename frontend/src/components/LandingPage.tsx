import { UtensilsCrossed, ChefHat, Users, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-4 rounded-2xl shadow-lg">
              <UtensilsCrossed className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            Welcome to Foodie
          </h1>
          <p className="text-xl text-gray-700 mb-2">Smart Campus Canteen System</p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Skip the queues, save your time. Pre-order your favorite campus meals and pick them up when ready!
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Student Card */}
          <button
            onClick={() => navigate('/student-login')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-orange-500 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl mb-3 text-gray-900">Join as Student</h3>
              <p className="text-gray-600 mb-6">
                Browse menu, pre-order meals, and skip the queue with smart pickup times
              </p>
              <div className="space-y-2 text-sm text-left w-full">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Live menu browsing</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Pre-order with pickup time</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Group ordering feature</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Real-time rush hour updates</span>
                </div>
              </div>
              <div className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl group-hover:shadow-lg transition-shadow">
                Continue as Student →
              </div>
            </div>
          </button>

          {/* Canteen Card */}
          <button
            onClick={() => navigate('/canteen-login')}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-purple-500 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-6 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <ChefHat className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl mb-3 text-gray-900">Join as Canteen</h3>
              <p className="text-gray-600 mb-6">
                Manage orders efficiently with priority queue and analytics dashboard
              </p>
              <div className="space-y-2 text-sm text-left w-full">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Priority order queue</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Real-time order management</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Menu & stock control</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Daily analytics & insights</span>
                </div>
              </div>
              <div className="mt-6 w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-xl group-hover:shadow-lg transition-shadow">
                Continue as Canteen →
              </div>
            </div>
          </button>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
            <div className="bg-gradient-to-br from-green-400 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-gray-900 mb-2">Save Time</h4>
            <p className="text-gray-600 text-sm">
              Skip long queues and save precious break time
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-gray-900 mb-2">Smart Priority</h4>
            <p className="text-gray-600 text-sm">
              Intelligent queue system based on pickup times
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-xl p-6 text-center">
            <div className="bg-gradient-to-br from-pink-400 to-rose-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-gray-900 mb-2">Group Orders</h4>
            <p className="text-gray-600 text-sm">
              Order together, pay separately, eat together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}