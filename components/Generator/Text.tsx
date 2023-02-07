import * as T from "@effect/io/Effect";
import React, { useRef } from "react";
import type { RequestSchema } from "@/core/generate/schema";
import type { GenerateApiResponse } from "@/core/generate/schema";

import * as Fetch from "@/core/fetch";
import { pipe } from "@fp-ts/core/Function";
import { useGenerateStore } from "@/core/generate/hooks";

export const TextGenerator = () => {
  const { model, generating, setGenerating } = useGenerateStore();
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleGenerate = async () => {
    if (generating) {
      return;
    }

    const text = ref.current?.value;

    if (!text) {
      return;
    }

    setGenerating(true);

    const data: RequestSchema = {
      type: "text",
      data: {
        content: text,
        model,
      },
    };

    try {
      const result = await pipe(
        Fetch.request<GenerateApiResponse>("/api/generate", {
          method: "POST",
          data: data,
        }),
        T.runPromise
      );

      console.log("Result", result);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <textarea
        className="textarea textarea-bordered w-full min-h-[120px] max-h-[240px]"
        placeholder="Content"
        maxLength={5000}
        minLength={0}
        ref={ref}
      />
      <div className="flex justify-end mt-4">
        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={generating}
        >
          {generating ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
};
