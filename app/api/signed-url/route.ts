import { NextResponse } from "next/server";
import { ElevenLabsClient } from "elevenlabs";

export async function GET() {
  const agentId = process.env.AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;
  
  if (!agentId) {
    return NextResponse.json(
      { error: "AGENT_ID is not set in environment variables" },
      { status: 500 }
    );
  }
  
  if (!apiKey) {
    return NextResponse.json(
      { error: "ELEVENLABS_API_KEY is not set in environment variables" },
      { status: 500 }
    );
  }
  
  try {
    console.log("Creating ElevenLabs client with API key:", apiKey.substring(0, 10) + "...");
    console.log("Using Agent ID:", agentId);
    
    const client = new ElevenLabsClient({
      apiKey: apiKey,
    });
    const response = await client.conversationalAi.getSignedUrl({
      agent_id: agentId,
    });
    console.log("Successfully got signed URL");
    return NextResponse.json({ signedUrl: response.signed_url });
  } catch (error) {
    console.error("Error getting signed URL:", error);
    const errorDetails = error instanceof Error ? {
      message: error.message,
      stack: error.stack,
      // @ts-ignore
      statusCode: error.statusCode,
      // @ts-ignore
      body: error.body
    } : String(error);
    
    return NextResponse.json(
      { 
        error: "Failed to get signed URL", 
        details: errorDetails,
        agentId: agentId,
        apiKeyPrefix: apiKey.substring(0, 10) + "..."
      },
      { status: 500 }
    );
  }
}
