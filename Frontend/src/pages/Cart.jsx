import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';

function Cart() {
  const { user } = useAuthStore();
  const { cartItems, isLoading, error, fetchCartItems, removeFromCart, checkout } = useCartStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user, fetchCartItems]);

  const calculateTotal = () => {
    return Array.isArray(cartItems) ? 
      cartItems.reduce((total, item) => total + (item.foodItem.price * item.quantity), 0) : 0;
  };

  const handleRemoveItem = async (foodItemId) => {
    try {
      await removeFromCart(foodItemId);
      toast.success('Item removed from cart');
    } catch (err) {
      toast.error('Failed to remove item');
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsCheckingOut(true);
    try {
      // Place the order first - this now directly uses the OrderController.placeOrder endpoint
      const orderId = await checkout();
      
      if (!orderId) {
        throw new Error('Failed to create order');
      }
      
      // For now, assume payment is successful since we don't have a real payment gateway
      // In a real app, this would show a payment form
      toast.success('Order placed successfully!');
      navigate('/orders');
      
      // The following code would be used in a real payment flow:
      /*
      const paymentResult = await processPayment(orderId, { 
        method: 'credit_card',
        cardDetails: {
          number: '4242424242424242', 
          expiry: '12/25',
          cvv: '123'
        }
      });
      
      if (paymentResult) {
        toast.success('Order placed successfully!');
        navigate('/orders');
      } else {
        toast.error('Payment failed');
      }
      */
    } catch (err) {
      toast.error('Checkout failed');
      console.error(err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-red-600">{error}</p>
        <button 
          onClick={() => fetchCartItems()} 
          className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
        <Link
          to="/menu"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          {Array.isArray(cartItems) && cartItems.map((item) => (
            <div key={item.id} className="flex items-center py-4 border-b last:border-0">
              <img
                src={item.foodItem.image}
                alt={item.foodItem.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1 ml-6">
                <h3 className="text-lg font-semibold text-gray-900">{item.foodItem.name}</h3>
                <p className="text-gray-600">${item.foodItem.price.toFixed(2)} × {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="text-gray-400 hover:text-red-600"
                  onClick={() => handleRemoveItem(item.foodItem.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-orange-600">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>
          
          <button
            className={`w-full ${
              isCheckingOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'
            } text-white py-3 px-4 rounded-lg transition-colors`}
            onClick={handleCheckout}
            disabled={isCheckingOut}
          >
            {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart; 