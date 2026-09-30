"use client";

import { useCallback, useEffect, useState } from "react";
import { isLearningModeOn } from "@/domain/learning-mode";
import { api } from "@/lib/client";

export const LEARNING_MODE_EVENT = "mindbook-learning";

export function useLearningMode() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  const reload = useCallback(() => {
    void api<{ settings: { learning_mode?: string } }>("/api/settings")
      .then((res) => {
        setEnabled(isLearningModeOn(res.settings.learning_mode));
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  useEffect(() => {
    reload();
    window.addEventListener(LEARNING_MODE_EVENT, reload);
    return () => window.removeEventListener(LEARNING_MODE_EVENT, reload);
  }, [reload]);

  async function setLearningMode(next: boolean) {
    setEnabled(next);
    await api("/api/settings", {
      method: "PUT",
      body: JSON.stringify({ learning_mode: next ? "on" : "off" }),
    });
    window.dispatchEvent(new Event(LEARNING_MODE_EVENT));
  }

  return { enabled, ready, setLearningMode };
}
