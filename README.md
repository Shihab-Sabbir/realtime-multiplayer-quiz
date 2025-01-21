# Multiplayer Realtime Quiz Frontend Documentation

## Overview
The **Multiplayer Realtime Quiz** frontend is built using **Next.js** and styled with **Tailwind CSS**. It provides a responsive and interactive user interface for creating and joining quiz rooms, enabling real-time multiplayer gameplay. The live deployment is available at [Susko Quiz](https://susko-quiz.vercel.app/).

---

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (React-based framework for server-side rendering and static site generation)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS framework for styling)
- **Real-Time Communication**: WebSocket (via backend integration, e.g., Socket.io or similar)

---

## Key Features

### 1. **Create Room**
   - Allows users to create a quiz room.
   - Generates a unique room ID to share with other players.
   - Assigns the creator as the room leader.

### 2. **Join Room**
   - Enables users to join an existing room using a valid room ID.
   - Verifies the validity of the room ID before joining.
   
### 3. **Session Management**
   - Utilizes the `sessionStorage` API to store temporary data, such as:
     - Player Name
     - Team ID
     - Leader Status
   - Automatically clears session data upon page load for a fresh user experience.

### 4. **Responsive Design**
   - Ensures compatibility with different screen sizes using Tailwind CSS.
   - Mobile-first design optimized for both mobile and desktop users.

### 5. **Real-Time Updates**
   - Integrates with a backend for live updates during gameplay.
   - Enables instant feedback and synchronization across all players in the room.

---

## Project Structure

### Components
1. **`CreateRoom` Component**
   - Renders a form to create a new quiz room.
   - Handles user input and room creation logic.

2. **`JoinRoom` Component**
   - Displays a form for users to join existing rooms.
   - Validates the room ID and connects to the backend.

3. **`HomePage` Component**
   - Acts as the landing page of the application.
   - Clears session data on initial render using `useEffect`.
   - Displays the `CreateRoom` and `JoinRoom` components.

### Pages
- **`index.js`**: Entry point rendering the `HomePage`.
- Additional pages for the quiz interface and results (if implemented).

---

## Styling
Tailwind CSS is used for consistent and efficient styling. Key classes include:

- **Background Gradient**: `bg-gradient-to-b from-gray-900 to-gray-800`
- **Container and Spacing**: `container mx-auto px-4 py-8`
- **Typography**: `text-4xl font-bold text-center mb-8`
- **Grid Layout**: `grid md:grid-cols-2 gap-8 max-w-4xl mx-auto`

---

## Deployment
The project is deployed on [Vercel](https://vercel.com/), utilizing its seamless integration with Next.js for fast and reliable hosting.

- **Live URL**: [Susko Quiz](https://susko-quiz.vercel.app/)
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

---

## Future Improvements
1. **Enhanced Validation**
   - Implement stricter room ID validation to prevent unauthorized access.

2. **Error Handling**
   - Display user-friendly messages for network or session errors.

3. **Improved State Management**
   - Replace `sessionStorage` with a state management library like Redux or Zustand for better scalability.

4. **Real-Time Feedback**
   - Add animations or visual cues for real-time updates during gameplay.

5. **Leaderboard and History**
   - Display quiz results and maintain a history of past games.

---

## Conclusion
The **Multiplayer Realtime Quiz Frontend** is a robust and scalable application for real-time quiz gameplay. With a clean architecture and modern technologies like Next.js and Tailwind CSS, it offers a seamless user experience. The live version showcases its functionality and responsiveness effectively.

