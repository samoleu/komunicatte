// streamClient.ts
import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_KEY;
console.log("API Key:", apiKey); // This should output your API key

if (!apiKey) {
  throw new Error("Stream API key is missing from environment variables.");
}

const client = StreamChat.getInstance(apiKey);

export { client };
