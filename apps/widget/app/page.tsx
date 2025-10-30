"use client";

import { Button } from "@workspace/ui/components/button";
import { useVapi } from "@/modules/widget/hooks/use-vapi";

export default function Page() {
  const {
    startCall,
    endCall,
    isSpeaking,
    isConnected,
    isConnecting,
    transcript,
  } = useVapi();

  return (
    <div className="flex flex-col items-center justify-center min-h-svh mx-auto w-full gap-4">
      <Button onClick={() => startCall()}>Start Call</Button>
      <Button onClick={() => endCall()} variant="destructive">
        End Call
      </Button>
      <p>isConnected: {isConnected ? "true" : "false"}</p>
      <p>isConnecting: {isConnecting ? "true" : "false"}</p>
      <p>isSpeaking: {isSpeaking ? "true" : "false"}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  );
}
