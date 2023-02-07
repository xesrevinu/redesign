import { useContext } from "react";
import { GenerateContext } from "@/core/generate/context";
import { useStore } from "zustand";
import { shallow } from "zustand/shallow";
import { identity } from "@fp-ts/core/Function";

export const useGenerateContext = () => {
  const context = useContext(GenerateContext);

  if (context === null) {
    throw new Error("useGenerateContext must be used within a GenerateContext");
  }

  return context;
};

export const useGenerateStore = () => {
  const context = useGenerateContext();

  return useStore(context, identity, shallow);
};
