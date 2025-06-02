import { useEffect } from "react";

const useChatbase = () => {
  useEffect(() => {
    const existing = document.getElementById("tadK3yuLBhabD7fIZC_WJ");
    if (existing) return; // prevent duplicates

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "tadK3yuLBhabD7fIZC_WJ";
    script.setAttribute("domain", "www.chatbase.co");
    document.body.appendChild(script);

    return () => {
      // Optional: clean up if needed
      script.remove();
    };
  }, []);
};

export default useChatbase;
