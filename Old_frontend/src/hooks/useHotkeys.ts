import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useHotkeys() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === "INPUT") return;

      switch (e.key.toLowerCase()) {
        case "h":
          navigate("/");
          break;
        case "j":
          navigate("/jobs");
          break;
        case "m":
          navigate("/migrate");
          break;
        case "r":
          navigate("/migrate#rollback");
          break;
        case "s":
          navigate("/settings");
          break;
        case "/":
          const search = document.querySelector("input[type='search']");
          search?.focus();
          break;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
}
