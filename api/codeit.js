// Forking? Get a OpenAI API Key first. This handles the POST requests and the key. 
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "method not allowed" });
  }

  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "no input" });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GPT_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-5.2-nano",
      messages: [{ role: "user", content: input }],
      max_tokens: 800
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
