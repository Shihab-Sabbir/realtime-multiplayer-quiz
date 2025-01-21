'use client'

import { CreateRoom } from '../components/create-room'
import { JoinRoom } from '../components/join-room'

export default function HomePage() {
      sessionStorage.removeItem("playerName");
      sessionStorage.removeItem("teamId");
      sessionStorage.removeItem("isLeader");
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Multiplayer Quiz Game
        </h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <CreateRoom />
          <JoinRoom />
        </div>
      </main>
    </div>
  )
}

