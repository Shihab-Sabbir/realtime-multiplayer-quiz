/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleStartGame = async (roomId: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}/start`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to start game");
    }
  } catch (error) {
    console.error("Failed to start game:", error);
  }
};

export const handleSendMessage = async ( roomId: any, message: string ) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerName: sessionStorage.getItem("playerName"),
          message,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Failed to send message:", error);
  }
};
