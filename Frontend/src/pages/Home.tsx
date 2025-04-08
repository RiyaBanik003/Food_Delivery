import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, UtensilsCrossed } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative h-[500px] rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070"
          alt="Delicious food spread"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <UtensilsCrossed className="w-16 h-16 text-white mb-6" />
          <h1 className="text-5xl font-bold text-white mb-6">
            Delicious Food, Delivered to Your Door
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Experience restaurant-quality meals in the comfort of your home. Fresh ingredients, expert chefs, and lightning-fast delivery.
          </p>
          <Link
            to="/menu"
            className="flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            View Our Menu <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Fresh Ingredients</h3>
          <p className="text-gray-600">
            We source only the finest ingredients from local suppliers to ensure quality in every bite.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Expert Chefs</h3>
          <p className="text-gray-600">
            Our skilled chefs prepare each dish with passion and precision for an exceptional dining experience.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
          <p className="text-gray-600">
            Quick and reliable delivery ensures your food arrives hot and fresh, right to your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
}