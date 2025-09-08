import { useEffect } from "react";

// Listening to a keypress event
export function useKey(Key: string, action: () => void) {
  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        const target = e.target as HTMLElement;

        // don't trigger if user is typing or the input is active
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }

        if (e.key.toLowerCase() === Key.toLowerCase()) {
          e.preventDefault();
          e.stopPropagation();
          action();
          console.log(`${Key} pressed`);
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [Key, action]
  );
}
