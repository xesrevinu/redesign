import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Share() {
  const { query } = useRouter();
  const { id } = query;

  return <>id: {id}</>;
}
