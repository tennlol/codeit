// This is a frontend for the OpenAI server. Forking? Get a Vercel app and a OpenAI API key.
(function initCodeIt() {
  const output = document.getElementById("output");
  const promptInput = document.getElementById("userCode");
  const submitButton = document.getElementById("submitPrompt");
  const limits = window.CodeItLimits;

  async function askCodeIt() {
    const code = promptInput ? promptInput.value.trim() : "";

    if (!output || !promptInput) return;

    if (!code) {
      output.textContent = "Enter a prompt before sending.";
      promptInput.focus();
      return;
    }

    if (limits && !limits.checkAndRecord(code)) {
      output.innerHTML = `
        <div style="
          background:#f2cdcd;
          color:#7d2d3c;
          padding:12px;
          border-radius:12px;
          font-family:system-ui,sans-serif;
          border:1px solid #d20f39;
        ">
          Session limits have been reached for now. Please try again later.
        </div>
      `;
      return;
    }

    output.textContent = "Generating response...";
    submitButton?.setAttribute("disabled", "disabled");

    try {
      const res = await fetch("https://codeit-two.vercel.app/api/codeit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: code })
      });

      const data = await res.json();

      if (!res.ok) {
        output.textContent = data?.error || "Request failed.";
        return;
      }

      output.textContent = data?.choices?.[0]?.message?.content ?? JSON.stringify(data) ?? "No response.";
    } catch (err) {
      output.textContent = "Error: " + err.message;
    } finally {
      submitButton?.removeAttribute("disabled");
    }
  }

  submitButton?.addEventListener("click", askCodeIt);

  promptInput?.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      askCodeIt();
    }
  });

  window.askCodeIt = askCodeIt;

  if (output && output.textContent.trim() === "Response output will appear here.") {
    output.textContent = "Ready when you are.";
  }
})();
