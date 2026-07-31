import { execSync } from "child_process";
import process from "process";

try {
  if (process.platform === "win32") {
    console.log("Detecting Windows environment. Running standard 'next build'...");
    execSync("next build", { stdio: "inherit" });
  } else {
    console.log("Detecting Linux/Cloudflare environment. Running 'npx @cloudflare/next-on-pages'...");
    execSync("npx @cloudflare/next-on-pages", { stdio: "inherit" });
  }
} catch (error) {
  console.error("Build execution encountered an error:", error);
  process.exit(1);
}
