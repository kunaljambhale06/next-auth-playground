"use client"; 
import { useRouter } from "next/navigation"; 

export default function LandingPage() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-xl text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-600">
          Before they sold out readymade gluten
        </h1>
        <p className="text-gray-600 mb-6">
          Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic turmeric truffaut hexagon try-hard chambray.
        </p>
        <div className="flex justify-center gap-8">
          <button
            onClick={() => router.push("/login")}
            className="w-40 px-10 py-4 text-lg bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="px-10 py-4 text-lg bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
