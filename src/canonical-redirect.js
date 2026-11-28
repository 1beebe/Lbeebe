const CANONICAL_HOST = "lbeebe.com";

function isSiteHost(hostname) {
  const host = hostname.toLowerCase();
  return host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();
    const needsRedirect =
      isSiteHost(host) && (host !== CANONICAL_HOST || url.protocol === "http:");

    if (needsRedirect) {
      url.hostname = CANONICAL_HOST;
      url.protocol = "https:";
      url.port = "";
      return new Response(null, {
        status: 301,
        headers: { Location: url.href },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
