"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConversation } from "@elevenlabs/react";
import { Orb } from "@/components/ui/orb";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch {
    console.error("Microphone permission denied");
    return false;
  }
}

async function getSignedUrl(): Promise<string> {
  const response = await fetch("/api/signed-url");
  if (!response.ok) {
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw Error(`Failed to get signed url: ${errorData.error || 'Unknown error'}`);
  }
  const data = await response.json();
  return data.signedUrl;
}

export function ConvAI() {
  const conversation = useConversation({
    onConnect: () => {
      console.log("connected");
    },
    onDisconnect: () => {
      console.log("disconnected");
    },
    onError: error => {
      console.log(error);
      alert("An error occurred during the conversation");
    },
    onMessage: message => {
      console.log(message);
    }
  });

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("Microphone permission is required to use the voice assistant");
      return;
    }
    try {
      const signedUrl = await getSignedUrl();
      const conversationId = await conversation.startSession({
        signedUrl
      });
      console.log(conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      alert("Failed to start conversation. Please check that your ElevenLabs API key has the 'convai_write' permission.");
    }
  }

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  function getAgentState() {
    if (conversation.status === "connected" && conversation.isSpeaking) {
      return "talking";
    }
    if (conversation.status === "connected") {
      return "listening";
    }
    if (conversation.status === "disconnected") {
      return null;
    }
    return null;
  }

  return (
    <div className={"flex justify-center items-center px-4"}>
      <Card className={"rounded-3xl border-blue-600/20 bg-gradient-to-br from-blue-50 to-white shadow-xl w-full max-w-md"}>
        <CardContent className="p-4 md:p-6">
          <CardHeader className="p-0 pb-4">
            <CardTitle className={"text-center py-2 text-blue-900 text-lg md:text-xl"}>
              {conversation.status === "connected"
                ? conversation.isSpeaking
                  ? `AI Assistant is speaking`
                  : "AI Assistant is listening"
                : "Voice Assistant"}
            </CardTitle>
          </CardHeader>
          <div className={"flex flex-col gap-y-4 text-center items-center"}>
            <Orb 
              agentState={getAgentState()} 
              className={"w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]"}
              colors={["#2563eb", "#60a5fa"]}
            />

            <Button
              variant={"outline"}
              className={"rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-blue-600 w-full sm:w-auto"}
              size={"lg"}
              disabled={
                conversation.status !== "disconnected"
              }
              onClick={startConversation}
            >
              Start conversation
            </Button>
            <Button
              variant={"outline"}
              className={"rounded-full border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto"}
              size={"lg"}
              disabled={conversation.status === "disconnected"}
              onClick={stopConversation}
            >
              End conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
