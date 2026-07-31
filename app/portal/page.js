import { auth } from "@/auth.js";
import Header from "@/components/Header.js";
import LoginForm from "./LoginForm.js";
import CreatorDashboard from "./CreatorDashboard.js";
import styles from "./portal.module.css";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default async function CreatorPortalPage() {
  const session = await auth();

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        {session ? (
          <CreatorDashboard user={session.user} />
        ) : (
          <LoginForm />
        )}
      </main>
      <footer className={styles.footer}>
        <span>PORTAL: SECURE</span>
        <span>STATUS: {session ? "LOGGED IN" : "STANDBY"}</span>
      </footer>
    </div>
  );
}
