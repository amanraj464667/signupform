import { useState } from "react";
import toast from 'react-hot-toast';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Server Error");

      const data = await res.json();
      setSuccessMsg(data.message || "Feedback submitted!");
      toast.success("Feedback submitted successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting feedback", err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbacks = async () => {
    setLoadingFeedbacks(true);
    try {
      const res = await fetch("http://localhost:5000/feedbacks");
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      toast.error("Failed to fetch feedbacks.");
      console.error(err);
    } finally {
      setLoadingFeedbacks(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f0f4ff] to-[#e0ecff] flex items-center justify-center px-4 overflow-hidden">
      {/* 3D layered background effect */}
      <div className="absolute -z-10 w-[600px] h-[600px] bg-blue-300 blur-[120px] rounded-full opacity-30 transform -rotate-12"></div>
      <div className="absolute -z-10 w-[500px] h-[500px] bg-purple-300 blur-[120px] rounded-full opacity-30 bottom-0 right-0"></div>

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-gray-200 backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Feedback Form</h2>

        {!isAdmin ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                <textarea
                  name="message"
                  placeholder="Write your feedback here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200 font-semibold disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Feedback"}
              </button>
              {successMsg && (
                <p className="text-green-600 text-sm text-center mt-2">{successMsg}</p>
              )}
            </form>

            {/* Admin Button */}
            <button
              onClick={() => {
                setIsAdmin(true);
                fetchFeedbacks();
              }}
              className="mt-6 w-full text-sm text-blue-500 hover:underline hover:text-blue-700 transition text-center"
            >
              If you are an admin, click here
            </button>
          </>
        ) : (
          <div className="text-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Admin Panel</h3>
              <button
                onClick={() => setIsAdmin(false)}
                className="text-sm text-blue-500 hover:underline"
              >
                Go back to form
              </button>
            </div>

            {loadingFeedbacks ? (
              <p className="text-center text-gray-500">Loading feedbacks...</p>
            ) : feedbacks.length === 0 ? (
              <p className="text-center text-gray-500">No feedbacks yet.</p>
            ) : (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {feedbacks.map((fb) => (
                  <div key={fb._id} className="p-4 rounded-xl border bg-gray-50 shadow-sm">
                    <p className="font-semibold text-blue-600">{fb.name} ({fb.email})</p>
                    <p className="text-gray-700 mt-1">{fb.message}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted on {new Date(fb.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <footer className="text-center text-gray-400 text-xs mt-8 pt-4 border-t">
          Built by Aman Raj
        </footer>
      </div>
    </div>
  );
}
