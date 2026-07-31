import { execSync } from "child_process";

try {
  console.log("Running standard 'next build'...");
  execSync("next build", { stdio: "inherit" });
} catch (error) {
  console.error("Build failed:", error);
  process.exit(1);
}
