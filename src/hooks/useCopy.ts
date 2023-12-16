import { useEffect, useState } from "react";

let timeoutId: number;

export default function useCopy() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setCopied(false), 4000) as unknown as number;
  }, [copied]);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return {copy, copied};
}
