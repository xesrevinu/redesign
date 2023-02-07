import clsx from "clsx";
import React from "react";
import { RequestModel } from "@/core/generate/schema";
import { TextGenerator } from "./Text";
import { UrlGenerator } from "./Url";
import { useGenerateStore } from "@/core/generate/hooks";

type GeneratorMode = "text" | "url";

export const Generator = () => {
  const { model, setModel, generating } = useGenerateStore();
  const [selectedMode, setMode] = React.useState<GeneratorMode>("text");

  const handleChangeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value as RequestModel);
  };

  const handleModeChange = (value: GeneratorMode) => {
    setMode(value);
  };

  return (
    <div className="mt-10 w-full px-6 min-w-[300px] sm:w-[520px] lg:mt-0 lg:w-[720px] mx-auto">
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-white">Redesign</h1>
        <p className="text-gray-300">
          Generate beautiful article summaries, with just a few clicks.
        </p>
      </div>
      <div className=" bg-white rounded-lg overflow-hidden p-4">
        <div className="flex flex-col justify-center w-full">
          <div className="flex justify-between items-center">
            <div className="btn-group">
              {["text", "url"].map((mode) => (
                <button
                  key={mode}
                  className={clsx("btn", mode === selectedMode && "btn-active")}
                  onClick={() => handleModeChange(mode as GeneratorMode)}
                >
                  {mode}
                </button>
              ))}
            </div>
            <select
              name="model"
              className="select"
              value={model}
              onChange={handleChangeMode}
              disabled={generating}
            >
              <option disabled selected>
                Pick your model
              </option>
              {/* TODO: replace */}
              {/* @ts-expect-error */}
              {RequestModel.ast.types.map((item) => (
                <option key={item.literal} value={item.literal}>
                  {item.literal}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 w-full">
            {selectedMode === "text" && <TextGenerator />}
            {selectedMode === "url" && <UrlGenerator />}
          </div>
        </div>
      </div>
    </div>
  );
};
