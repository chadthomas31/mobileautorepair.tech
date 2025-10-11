"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useCallback, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useConversation } from "@elevenlabs/react";
import { Mic, MicOff, Phone, Calendar, AlertTriangle, ExternalLink, Languages } from "lucide-react";
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

export function ConvAI({ autoStart = false }: { autoStart?: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [conversationStartTime, setConversationStartTime] = useState<number | null>(null);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [showConversionButtons, setShowConversionButtons] = useState(false);
  const [capturedInfo, setCapturedInfo] = useState({ name: '', vehicle: '', location: '', issue: '' });
  const [isEmergency, setIsEmergency] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  useEffect(() => {
    setIsClient(true);
    // Detect if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);

    // Auto-start if requested (from Book Your Service button)
    if (autoStart && conversation.status === "disconnected") {
      setTimeout(() => startConversation(), 500);
    }
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
      
      // Emergency detection
      const messageText = (message.message || '').toLowerCase();
      const emergencyKeywords = ['freeway', 'shoulder', 'highway', 'smell of gas', 'gas smell', 'smoke', 'fire', 'stranded', 'accident'];
      if (emergencyKeywords.some(keyword => messageText.includes(keyword))) {
        setIsEmergency(true);
      }
      
      // Simple info capture detection (basic pattern matching)
      // In production, this would be handled by the AI agent's structured output
      if (messageText.includes('name') || messageText.includes('my name is')) {
        // Trigger conversion buttons after capturing basic info
        setTimeout(() => setShowConversionButtons(true), 2000);
      }
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
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-center text-gray-700 font-medium mb-2">
                    💬 {language === 'es' ? 'Pregúntame sobre:' : 'Ask me about:'}
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• {language === 'es' ? 'Precios y disponibilidad' : 'Service pricing and availability'}</li>
                    <li>• {language === 'es' ? 'Qué incluye el diagnóstico' : "What's included in diagnostics"}</li>
                    <li>• {language === 'es' ? 'Áreas de servicio' : 'Service areas we cover'}</li>
                    <li>• {language === 'es' ? 'Programar una cita' : 'Scheduling an appointment'}</li>
                  </ul>
                </div>
                
                {/* Spanish Language Toggle */}
                <button
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300 rounded-lg hover:from-green-100 hover:to-blue-100 transition-all"
                >
                  <Languages className="h-4 w-4 text-green-700" />
                  <span className="text-sm font-semibold text-green-800">
                    {language === 'en' ? '¿Hablas español?' : 'Switch to English'}
                  </span>
                </button>
              </div>
            )}
          </CardHeader>
          {/* Emergency Fast-Lane */}
          {isEmergency && (
            <div className="mb-4 bg-red-50 border-2 border-red-500 rounded-lg p-4 animate-pulse">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <h4 className="font-bold text-red-900 mb-2">
                    {language === 'es' ? '⚠️ Situación de Emergencia Detectada' : '⚠️ Emergency Situation Detected'}
                  </h4>
                  <p className="text-sm text-red-800 mb-3">
                    {language === 'es' 
                      ? 'Si estás en peligro inmediato, llama al 911. Para asistencia de emergencia en carretera:'
                      : 'If you\'re in immediate danger, call 911. For emergency roadside assistance:'}
                  </p>
                  <a href="tel:+16577894652">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                      <Phone className="h-4 w-4 mr-2" />
                      {language === 'es' ? 'Llamar Ahora: (657) 789-4652' : 'Call Now: (657) 789-4652'}
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Conversion Path Buttons */}
          {showConversionButtons && conversation.status === "connected" && !isEmergency && (
            <div className="mb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-3 text-center">
                {language === 'es' ? '¿Qué te gustaría hacer?' : 'What would you like to do next?'}
              </p>
              <div className="grid grid-cols-1 gap-3">
                <a href="#booking">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-auto py-4"
                    onClick={() => stopConversation()}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-bold">
                        {language === 'es' ? 'Reservar Ventana de Diagnóstico' : 'Book a Diagnostic Window'}
                      </div>
                      <div className="text-xs opacity-90">
                        {language === 'es' ? 'Sujeto a disponibilidad' : 'Subject to availability; we\'ll text to confirm'}
                      </div>
                    </div>
                  </Button>
                </a>
                <a href="tel:+16577894652">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 h-auto py-4"
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-bold">
                        {language === 'es' ? 'Que un Técnico me Llame' : 'Have a Tech Call Me'}
                      </div>
                      <div className="text-xs opacity-75">
                        {language === 'es' ? 'Habla directamente con un experto' : 'Speak directly with an expert'}
                      </div>
                    </div>
                  </Button>
                </a>
              </div>
            </div>
          )}

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
              {language === 'es' ? 'Iniciar conversación' : 'Start conversation'}
            </Button>
            <Button
              variant={"outline"}
              className={"rounded-full border-red-600 text-red-600 hover:bg-red-50 w-full sm:w-auto"}
              size={"lg"}
              disabled={conversation.status === "disconnected"}
              onClick={stopConversation}
            >
              {language === 'es' ? 'Terminar conversación' : 'End conversation'}
            </Button>
          </div>

          {/* Trust Anchors Footer */}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <p className="text-xs text-gray-600 text-center leading-relaxed">
              {language === 'es' 
                ? 'Estimaciones basadas en RepairPal; crédito de diagnóstico aplicado con reparación aprobada.'
                : 'RepairPal-benchmarked estimates; diagnostic credit applied with approved repair.'}
            </p>
            <a 
              href="#services" 
              className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              <ExternalLink className="h-3 w-3" />
              {language === 'es' ? 'Ver política de precios' : 'View pricing policy'}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
