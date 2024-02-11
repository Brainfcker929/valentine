import { onUnmounted, ref } from "vue";

export function useEmojiDrop() {
  const emojiInterval = ref<number | null>(null);

  const dropEmojis = (selector: string) => {
    const mainEl: HTMLElement =
      document.querySelector(selector) || document.body;

    emojiInterval.value = window.setInterval(() => {
      createElement(mainEl, "💗");
      createElement(mainEl, "😍");
      createElement(mainEl, "🥰");
    }, 200);
  };

  const createElement = (mainElement: HTMLElement, emoji: string) => {
    const element = document.createElement("div");
    element.classList.add("emoji");
    element.textContent = emoji;
    element.style.left = `${Math.random() * 100}%`;
    element.style.animationDuration = `${Math.random() * 6 + 2}s`;
    element.style.fontSize = "2rem";
    mainElement.appendChild(element);

    element.addEventListener("animationend", () => {
      element.remove();
    });
  };

  onUnmounted(() => {
    if (emojiInterval.value) {
      clearInterval(emojiInterval.value);
    }
  });

  return { dropEmojis };
}
