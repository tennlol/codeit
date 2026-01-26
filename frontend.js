// This is a frontend for the OpenAI server. Forking? Get a Vercel app and a OpenAI API key.
import { checkAndRecord } from "./limits.js";

async function askCodeIt() {
  const code = document.getElementById("userCode").value;
  const out = document.getElementById("output");

  // check limits first
  if (!checkAndRecord(code)) {
    out.innerHTML = `
      <div style="
        background:#fdd;
        color:#611;
        padding:12px;
        border-radius:8px;
        font-family:system-ui,sans-serif;
        border:1px solid #a33;
      ">
        ⚠️ You’ve hit your session limit! Take a breather before sending more prompts.
      </div>
    `;
    return;
  }

  out.textContent = "Generating...";

  try {
    const res = await fetch("https://codeit-two.vercel.app/api/codeit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: code })
    });

    const data = await res.json();
    out.textContent = data?.choices?.[0]?.message?.content ?? JSON.stringify(data) ?? "No response";
  } catch (err) {
    out.textContent = "error: " + err.message;
  }
}
