import * as GenerateSchema from "@/core/generate/schema";
import { ReactNode, createContext, useState } from "react";
import { StoreApi, create, createStore } from "zustand";

export type GenerateContextState = {
  model: GenerateSchema.RequestModel;
  setModel: (model: GenerateSchema.RequestModel) => void;

  generating: boolean;
  setGenerating: (generating: boolean) => void;

  result: {
    title: string;
    content: string;
  } | null;
};

export function makeStore() {
  return createStore<GenerateContextState>((set) => {
    return {
      model: "text-davinci-003",
      setModel: (model: GenerateSchema.RequestModel) => {
        set({ model });
      },
      generating: false,
      setGenerating: (generating: boolean) => {
        set({ generating });
      },
      result: null,
    };
  });
}

export const GenerateContext =
  createContext<StoreApi<GenerateContextState> | null>(null);

export const GenerateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [store] = useState(() => {
    return makeStore();
  });

  return (
    <GenerateContext.Provider value={store}>
      {children}
    </GenerateContext.Provider>
  );
};
