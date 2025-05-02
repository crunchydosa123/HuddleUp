import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col">

      {/* Navbar */}
      <nav className="w-full py-4 flex justify-between items-center px-6 bg-opacity-75">
        <div className="text-3xl font-bold">HuddleUp</div>
        <div className="space-x-6">
          <Link to="/signup" className="text-lg font-semibold hover:underline">Sign Up</Link>
          <Link to="/login" className="text-lg font-semibold hover:underline">Log In</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-opacity-50 bg-gradient-to-r from-blue-600 to-indigo-700">
        <h1 className="text-6xl font-extrabold leading-tight max-w-3xl mx-auto">
          Connect. Collaborate. Communicate. All in One App.
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">
          HuddleUp is your go-to platform for team messaging. Whether you're working remotely or in the office, we make communication easy, secure, and instant.
        </p>
        <div className="mt-8">
          <Link to="/signup" className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition">Get Started</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white text-gray-800">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold">Features That Make HuddleUp Unique</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a range of features to help your team stay connected and organized, no matter where you are.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6">
          {/* Feature 1 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Instant Messaging</h3>
            <p className="text-gray-700">
              Send and receive messages instantly with real-time updates, ensuring smooth communication across your team.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Secure & Private</h3>
            <p className="text-gray-700">
              Your conversations are encrypted, ensuring privacy and security with every message shared on HuddleUp.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Group Chats & Rooms</h3>
            <p className="text-gray-700">
              Create dedicated spaces for your team to collaborate and discuss projects, without distractions.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Voice & Video Calls</h3>
            <p className="text-gray-700">
              Jump on a quick voice or video call to discuss important matters in real-time, all within the app.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">File Sharing</h3>
            <p className="text-gray-700">
              Share important documents, images, and files quickly and easily to keep everyone on the same page.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Cross-Platform Sync</h3>
            <p className="text-gray-700">
              Stay connected on all your devices with HuddleUp's cross-platform synchronization for seamless communication.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-700 text-white text-center py-16">
        <h2 className="text-3xl font-semibold mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-8">Join thousands of teams who trust HuddleUp to stay connected and boost productivity.</p>
        <Link to="/signup" className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition">Create Your Account</Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p>&copy; 2025 HuddleUp. All Rights Reserved.</p>
        <div className="mt-4 space-x-6">
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </footer>
      
    </div>
  )
}

export default Homepage
