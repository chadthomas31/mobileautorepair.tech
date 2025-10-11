"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import Orb with no SSR to avoid hydration issues
const Orb = dynamic(() => import("@/components/ui/orb").then(mod => ({ default: mod.Orb })), { 
  ssr: false,
  loading: () => (
    <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] flex items-center justify-center">
      <div className="animate-pulse bg-blue-200 rounded-full w-32 h-32"></div>
    </div>
  )
});

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
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [conversationStartTime, setConversationStartTime] = useState<number | null>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Detect if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log("connected");
      setConversationStartTime(Date.now());
      setConversationMessages([]);
    },
    onDisconnect: () => {
      console.log("disconnected");
      // Log conversation when it ends
      if (conversationStartTime && conversationMessages.length > 0) {
        logConversation();
      }
    },
    onError: error => {
      console.log(error);
      alert("An error occurred during the conversation");
    },
    onMessage: message => {
      console.log(message);
      setConversationMessages(prev => [...prev, message]);
    }
  });

  async function logConversation() {
    if (!conversationStartTime) return;
    
    const duration = Math.round((Date.now() - conversationStartTime) / 1000);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const durationStr = `${minutes}m ${seconds}s`;
    
    // Build transcript from messages
    const transcript = conversationMessages
      .map(msg => {
        const role = msg.source === 'user' ? 'Customer' : 'AI Assistant';
        const text = msg.message || JSON.stringify(msg);
        return `[${role}]: ${text}`;
      })
      .join('\n\n');
    
    try {
      await fetch('/api/chatbot-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: `CONV-${conversationStartTime}`,
          transcript: transcript || 'No transcript available',
          duration: durationStr,
          customerInfo: {
            // Add any customer info extracted from conversation if available
          }
        })
      });
    } catch (error) {
      console.error('Failed to log conversation:', error);
    }
  }

  async function startConversation() {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      alert("Microphone permission is required to use the voice assistant");
      return;
    }
    try {
      console.log("Fetching signed URL...");
      const signedUrl = await getSignedUrl();
      console.log("Signed URL received, starting session...");
      const conversationId = await conversation.startSession({
        signedUrl
      });
      console.log("Conversation started:", conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(`Failed to start conversation: ${errorMessage}`);
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

  // Simple mobile-friendly indicator
  const SimpleMicIndicator = () => (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          conversation.status === "connected" 
            ? conversation.isSpeaking 
              ? "bg-blue-500 animate-pulse scale-110" 
              : "bg-green-500 animate-pulse"
            : "bg-gray-300"
        }`}
      />
      <div className="relative z-10">
        {conversation.status === "connected" ? (
          <Mic className="h-16 w-16 text-white" />
        ) : (
          <MicOff className="h-16 w-16 text-white" />
        )}
      </div>
    </div>
  );

  if (!isClient) {
    return null; // Avoid hydration mismatch
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
            {conversation.status === "disconnected" && (
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-center text-gray-700 font-medium mb-2">
                  💬 Ask me about:
                </p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Service pricing and availability</li>
                  <li>• What's included in diagnostics</li>
                  <li>• Service areas we cover</li>
                  <li>• Scheduling an appointment</li>
                </ul>
              </div>
            )}
          </CardHeader>
          <div className={"flex flex-col gap-y-4 text-center items-center"}>
            {isMobile ? (
              <SimpleMicIndicator />
            ) : (
              <Orb 
                agentState={getAgentState()} 
                className={"w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]"}
                colors={["#2563eb", "#60a5fa"]}
              />
            )}

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
