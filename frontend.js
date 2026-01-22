async function askCodeIt() {
  const code = document.getElementById("userCode").value;
  const out = document.getElementById("output");
  out.textContent = "thinking...";

  try {
    const res = await fetch("https://codeit-two.vercel.app/api/codeit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: code })
    });

    const data = await res.json();
    out.textContent = data.choices?.[0]?.message?.content || "no response";
  } catch (err) {
    out.textContent = "error: " + err.message;
  }
}
