const toggleButton = document.getElementById("toggle");

chrome.storage.sync.get("darkMode", ({ darkMode }) => {
  if (darkMode) {
    toggleButton.textContent = "Mudar para o modo claro";
  } else {
    toggleButton.textContent = "Mudar para o modo escuro";
  }
});

toggleButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { toggleDarkMode: true });
  });

  chrome.storage.sync.get("darkMode", ({ darkMode }) => {
    chrome.storage.sync.set({ darkMode: !darkMode });
  });
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.toggleDarkMode) {
    document.body.classList.toggle("dark-mode");
  }
});

// Armazenar a preferência do usuário localmente
chrome.storage.sync.get("darkMode", ({ darkMode }) => {
  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
});
