/* ============================================================
   memetic.exe — Authentication Core
   File: assets/js/auth.js
   ============================================================ */

/*
   What this script handles:
   --------------------------
   ✓ anonymous device login
   ✓ wallet login (Solana + EVM)
   ✓ unified session object
   ✓ redirect_after_login system
   ✓ logout
   ✓ dynamic header (login/logout + session badge)
   ✓ wallet provider detection
*/

console.log("auth.js loaded");

// LocalStorage keys
const KEY_SESSION   = "memetic_session_v1";
const KEY_REDIRECT  = "memetic_redirect_after_login";

/* ============================================================
   CREATOR WALLET ALLOWLIST
   ============================================================ */

const CREATOR_WALLETS = [
  "AZ7F5ZfzdTG2bBCtkVaYZLsSWWyYBTb9wmAFnsaFtS7o"
];

/* ============================================================
   Redirect Helpers
============================================================ */

export function setRedirect(url) {
  localStorage.setItem(KEY_REDIRECT, url);
}

export function consumeRedirect() {
  const url = localStorage.getItem(KEY_REDIRECT);
  if (url) localStorage.removeItem(KEY_REDIRECT);
  return url;
}

/* ============================================================
   Session Helpers
============================================================ */

export function getSession() {
  try {
    const raw = localStorage.getItem(KEY_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(obj) {
  localStorage.setItem(KEY_SESSION, JSON.stringify(obj));
}

export function clearSession() {
  localStorage.removeItem(KEY_SESSION);
}

/* ============================================================
   DEVICE LOGIN (Anonymous)
============================================================ */

export function loginDevice() {
  const deviceId =
    localStorage.getItem("memetic_device_id") || crypto.randomUUID();

  localStorage.setItem("memetic_device_id", deviceId);

  const session = {
    method: "device",
    id: deviceId,
    createdAt: Date.now(),
  };

  saveSession(session);
  return session;
}

/* ============================================================
   WALLET LOGIN (Solana + EVM)
============================================================ */

export async function loginWallet(walletObj) {
  const { provider, chain } = walletObj;

  try {
    let address;

    // Solana
    if (chain === "solana") {
      const resp = await provider.connect();
      address = resp.publicKey.toString();
    }
    // EVM
    else if (chain === "evm") {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      address = accounts[0];
    }

    // Signing message (proof of ownership)
    const message = `
memetic.exe login verification
This signature only proves you control this wallet.
No storage. No transactions.
Wallet: ${chain}:${address}
`;

    if (chain === "solana") {
      await provider.signMessage(
        new TextEncoder().encode(message),
        "utf8"
      );
    } else {
      await provider.request({
        method: "personal_sign",
        params: [message, address],
      });
    }

    // Privacy mode: do not store the full address
    const session = {
      method: "wallet",
      chain,
      addressHashed: btoa(address.slice(0, 6) + "..."),
      createdAt: Date.now(),
      creator: CREATOR_WALLETS.includes(address)
    };

    saveSession(session);
    return session;

  } catch (err) {
    console.error("Wallet login failed:", err);
    throw err;
  }
}

/* ============================================================
   LOGOUT
============================================================ */

export function logout() {
  clearSession();
  window.location.href = "index.html";
}

/* ============================================================
   HEADER BUTTON + SESSION BADGE
============================================================ */

function updateHeaderButton() {
  const session = getSession();
  const headerBtn = document.getElementById("accountBtn");
  const badge = document.getElementById("sessionBadge");

  if (!headerBtn || !badge) return;

  /* ----------------------------
     NO SESSION → login.exe
  ----------------------------- */
  if (!session) {
    headerBtn.textContent = "login.exe";

    headerBtn.onclick = () => {
      window.location.href = "login.html";
    };

    badge.style.display = "none";
    return;
  }

  /* ----------------------------
     SESSION EXISTS → logout.exe
  ----------------------------- */
  headerBtn.textContent = "logout.exe";

  headerBtn.onclick = () => {
    clearSession();
    window.location.href = "index.html";
  };

  /* ----------------------------
     SESSION BADGE (device/wallet/email)
  ----------------------------- */
  badge.style.display = "inline-block";
  badge.classList.remove("device", "wallet", "email");

  if (session.method === "wallet") {
    badge.textContent = "wallet.exe";
    badge.classList.add("wallet");
  }
  else if (session.method === "device") {
    badge.textContent = "device.exe";
    badge.classList.add("device");
  }
  else if (session.method === "email") {
    badge.textContent = "email.exe";
    badge.classList.add("email");
  }

  /* ----------------------------
     CREATOR BADGE
  ----------------------------- */
  const creatorBadge = document.getElementById("creatorBadge");

  if (creatorBadge) {
    if (session.creator) {
      creatorBadge.style.display = "inline-block";
      creatorBadge.textContent = "creator.exe";
    } else {
      creatorBadge.style.display = "none";
    }
  }

  /* ============================================================
     Inject Creator Dashboard Nav Link
  ============================================================ */
  const nav = document.getElementById("mainNav");
  const existingCreatorLink = document.getElementById("creatorNavLink");

  if (nav) {
    if (session.creator) {
      // Add nav link if not present
      if (!existingCreatorLink) {
        const link = document.createElement("a");
        link.id = "creatorNavLink";
        link.href = "creator-dashboard.html";
        link.className = "creator-nav";
        link.textContent = "creator.exe";
        nav.appendChild(link);
      }
    } else {
      // Remove nav link if present
      if (existingCreatorLink) {
        existingCreatorLink.remove();
      }
    }
  }
}

/* ============================================================
   Bulletproof Header Loader (MutationObserver)
============================================================ */

function attachHeaderLogic() {
  const btn = document.getElementById("accountBtn");
  const badge = document.getElementById("sessionBadge");

  if (!btn || !badge) return false;

  updateHeaderButton();
  return true;
}

const headerObserver = new MutationObserver(() => {
  if (attachHeaderLogic()) {
    headerObserver.disconnect();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Observe DOM for header injection
  headerObserver.observe(document.body, { childList: true, subtree: true });

  // Try immediately in case header already loaded
  attachHeaderLogic();
});

/* ============================================================
   WALLET DETECTION
============================================================ */

export function detectWalletProviders() {
  const providers = [];

  // Solana
  if (window.phantom?.solana)
    providers.push({
      name: "phantom",
      chain: "solana",
      provider: window.phantom.solana,
    });

  if (window.backpack?.solana)
    providers.push({
      name: "backpack",
      chain: "solana",
      provider: window.backpack.solana,
    });

  if (window.solflare?.isSolflare)
    providers.push({
      name: "solflare",
      chain: "solana",
      provider: window.solflare,
    });

  if (window.glowSolana)
    providers.push({
      name: "glow",
      chain: "solana",
      provider: window.glowSolana,
    });

  // EVM
  if (window.ethereum) {
    let n = "metamask";
    if (window.ethereum.isCoinbaseWallet) n = "coinbase";
    if (window.ethereum.isBraveWallet) n = "brave";

    providers.push({
      name: n,
      chain: "evm",
      provider: window.ethereum,
    });
  }

  return providers;
}
