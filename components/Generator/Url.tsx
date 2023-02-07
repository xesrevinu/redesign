import React, { useRef } from "react";

export const UrlGenerator = () => {
  const ref = useRef<HTMLInputElement>(null);

  const handleGenerate = () => {
    const text = ref.current?.value;

    if (!text) {
      return;
    }

    console.log("Generating text...", text);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full"
        maxLength={500}
        minLength={0}
        ref={ref}
      />
      <div className="flex justify-end mt-4">
        <button className="btn btn-primary" onClick={handleGenerate}>
          Generate
        </button>
      </div>
    </div>
  );
};
