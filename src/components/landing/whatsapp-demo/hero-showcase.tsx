"use client";

import { useState } from "react";

import { heroConversation, heroConversationDays } from "@/lib/landing-content";
import { cn } from "cn";

import { PanelCard } from "./panel-card";
import { WhatsappConversationDemo, type DemoStage } from "./whatsapp-conversation-demo";

/**
 * Phone + the professional's month card. The card never covers the chat:
 * from lg it slides out from behind the phone, vertically centred, with its right edge
 * tucked under the device like an extension of it; below lg it slides down from behind
 * the phone, a little narrower than it, with its top edge hidden under the bezel.
 */
export function HeroShowcase({ className }: { className?: string }) {
  const [stage, setStage] = useState<DemoStage>("charge");

  return (
    <div className={cn("hero-fade hero-step-1 relative", className)}>
      <WhatsappConversationDemo
        conversation={heroConversation}
        dayLabels={heroConversationDays}
        onStageChange={setStage}
        className="hero-rise-device hero-step-1 relative z-20"
      />
      <PanelCard
        stage={stage}
        className={cn(
          "relative z-10 mx-3 -mt-12 pt-16",
          "lg:absolute lg:z-10 lg:m-0 lg:pt-5 lg:right-[calc(100%-3rem)] lg:top-1/2 lg:w-[15.5rem] lg:-translate-y-1/2 lg:pr-[4.25rem] xl:w-[18.5rem]",
          "panel-slide-out"
        )}
      />
    </div>
  );
}
