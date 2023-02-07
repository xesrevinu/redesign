import React, { CSSProperties } from "react";

interface PostProps {
  title: string;
  image: string;
  content: string;
  containerStyles: CSSProperties;
  imageStyles: CSSProperties;
  titleStyles: CSSProperties;
  contentStyles: CSSProperties;
}

export const Post = (props: PostProps) => {
  return (
    <div className="w-full min-w-[300px] sm:w-[420px] py-5 px-4 relative rounded-[30px] ">
      <div
        className="absolute inset-0 min-h-full bg-cover bg-no-repeat blur-sm bg-center scale-110 rounded-lg"
        style={{
          zIndex: -1,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1671058370178-7a7d3bcb4196?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80)",
        }}
      />
      <div
        className="w-full h-full p-4 relative"
        style={{
          zIndex: 1,
          ...props.containerStyles,
        }}
      >
        <div
          className="absolute inset-0 min-h-full bg-center"
          style={{
            zIndex: -1,
            borderColor: "rgba(223, 223, 223, 0.22)",
            borderRadius: "29px",
            background: "rgba(0, 0, 0, 0.6)",
            // background:
            //   "linear-gradient(170.67deg, rgba(214, 135, 118, 0.284) 4.58%, rgba(55, 123, 54, 0) 58.07%, rgba(42, 83, 188, 0.069) 90.9%)",
            filter: "blur(5px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1))",
          }}
        />
        <div className="text-white">
          <img src="" alt="" style={props.imageStyles} />
          <h1 className="text-2xl font-bold mb-2" style={props.titleStyles}>
            {props.title}
          </h1>
          <div className="" style={props.contentStyles}>
            {props.content}
          </div>
        </div>
      </div>
    </div>
  );
};
