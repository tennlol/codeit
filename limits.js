// Forking? Make a OpenAI key, get credits (Minimum: $5) and get a Vercel app.
(function initLimits() {
  const MAX_REQUESTS = 10;
  const MAX_TOKENS = 2000; // 2000 need to be my limit, its enough and I NEED to save credits. I don't have any more money.

  let requestCount = 0;
  let usedTokens = parseInt(localStorage.getItem("usedTokens") || 0, 10);

  function canRequest(estimatedTokens) {
    if (requestCount >= MAX_REQUESTS) return false;
    if (usedTokens + estimatedTokens > MAX_TOKENS) return false;
    return true;
  }

  function recordRequest(estimatedTokens) {
    requestCount++;
    usedTokens += estimatedTokens;
    localStorage.setItem("usedTokens", usedTokens);
  }

  function estimateTokens(text) {
    return text.split(/\s+/).length * 1.5;
  }

  function checkAndRecord(text) {
    const tokens = estimateTokens(text);
    if (!canRequest(tokens)) {
      return false;
    }
    recordRequest(tokens);
    return true;
  }

  function resetLimits() {
    requestCount = 0;
    usedTokens = 0;
    localStorage.setItem("usedTokens", 0);
  }

  window.CodeItLimits = {
    checkAndRecord,
    resetLimits
  };
})();
