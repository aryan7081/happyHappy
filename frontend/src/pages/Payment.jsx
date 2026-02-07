import { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import config from '../config';
import { CreditCard, Smartphone, Building, CheckCircle } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const membership_id = queryParams.get("membership_id");
  const amount = queryParams.get("amount");

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const paid = localStorage.getItem("payment_done");
    if (paid === "true") {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${user.token}`,
        },
        body: JSON.stringify({ membership_id, amount }),
      };
  
      // Step 1: Create Razorpay Order
      const response = await fetch(`${config.apiBaseUrl}/api/payments/`, payload);
      const data = await response.json();
  
      if (!data.razorpay_order_id) {
        alert("Failed to initiate payment");
        setIsProcessing(false);
        return;
      }
  
      // Step 2: Launch Razorpay Checkout
      const options = {
        key: data.razorpay_key,
        amount: data.amount,
        currency: "INR",
        name: "Rao Fitness",
        description: "Membership Payment",
        order_id: data.razorpay_order_id,
        handler: async function (response) {
          const verifyPayload = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${user.token}`,
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              transaction_id: data.transaction_id,
              payment_method: paymentMethod,
            }),
          };
  
          // Step 3: Verify Payment
          const verifyResponse = await fetch(`${config.apiBaseUrl}/api/payments/verify/`, verifyPayload);
          const verifyData = await verifyResponse.json();
          console.log("Payment verification response:", verifyData);
  
          if (verifyResponse.ok) {
            setIsProcessing(false);
            setPaymentComplete(true);
            localStorage.setItem("payment_done", "true");
            setTimeout(() => {
              navigate("/home", { replace: true });
            }, 3000);
          } else {
            setIsProcessing(false);
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: user.username,
          email: user.email,
        },
        theme: {
          color: "#2563eb",
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      setIsProcessing(false);
      alert("Payment failed: " + error.message);
    }
  };

  const paymentMethods = [
    { value: 'upi', label: 'UPI Payment', icon: Smartphone, description: 'Pay using UPI apps like GPay, PhonePe, Paytm' },
    { value: 'card', label: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay cards accepted' },
    { value: 'netbanking', label: 'Net Banking', icon: Building, description: 'All major banks supported' }
  ];

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your membership has been activated</p>
            <div className="bg-gray-50 p-4 rounded-xl mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Membership ID:</span>
                <span className="font-mono text-sm text-gray-900">{membership_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Amount Paid:</span>
                <span className="font-semibold text-sm text-green-600">₹{amount}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-4">Redirecting to dashboard in 3 seconds...</p>
            <button 
              onClick={() => navigate("/home", { replace: true })}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition duration-300"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h2>
          <p className="text-gray-600">Secure payment for your fitness membership</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Membership Type</span>
                <span className="font-medium text-gray-900">Premium Membership</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Membership ID</span>
                <span className="font-mono text-sm text-gray-900">{membership_id}</span>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{amount}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <h4 className="font-medium text-blue-900 mb-2">What's Included:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 24/7 Gym Access</li>
                <li>• Personal Training Sessions</li>
                <li>• Group Classes (HIIT, Yoga, Pilates)</li>
                <li>• Nutrition Guidance</li>
                <li>• Progress Tracking</li>
              </ul>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h3>

            <div className="space-y-4 mb-6">
              {paymentMethods.map((method) => {
                const IconComponent = method.icon;
                return (
                  <div
                    key={method.value}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === method.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod(method.value)}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600 mr-3"
                      />
                      <IconComponent className="w-5 h-5 text-gray-600 mr-3" />
                      <div>
                        <div className="font-medium text-gray-900">{method.label}</div>
                        <div className="text-sm text-gray-500">{method.description}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full font-semibold py-4 rounded-full transition duration-300 ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay ₹${amount}`
              )}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your payment is secured with 256-bit SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}