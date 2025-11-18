import { useCallback } from "react";
import { useAppStore } from "@/stores/useAppStore";
import { useVibration } from "./useVibration";

export type SynthPreset = {
  name: string;
};

// Legacy preset names preserved so existing UI still renders predictable labels
export const SYNTH_PRESETS: Record<string, SynthPreset> = {
  classic: { name: "Classic" },
  ethereal: { name: "Ethereal" },
  digital: { name: "Digital" },
  retro: { name: "Retro" },
  off: { name: "Off" },
};

/**
 * Lightweight shim that keeps the previous typing-synth API surface without
 * performing any audio synthesis. We still trigger a short vibration so users
 * get minimal haptic feedback when enabled.
 */
export function useChatSynth() {
  const vibrate = useVibration(50, 30);
  const { synthPreset, setSynthPreset } = useAppStore((state) => ({
    synthPreset: state.synthPreset ?? "classic",
    setSynthPreset: state.setSynthPreset,
  }));

  const playNote = useCallback(() => {
    vibrate();
  }, [vibrate]);

  const changePreset = useCallback(
    (presetKey: string) => {
      if (!SYNTH_PRESETS[presetKey]) return;
      setSynthPreset(presetKey);
    },
    [setSynthPreset]
  );

  return {
    playNote,
    currentPreset: synthPreset,
    changePreset,
    isAudioReady: false,
  };
}
