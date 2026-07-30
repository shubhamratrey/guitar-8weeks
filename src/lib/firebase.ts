"use client";

import type { FirebaseApp } from "firebase/app";
import type { Auth, User } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import type { AppData } from "./types";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/**
 * Firebase is optional on purpose. Without config the app runs entirely on
 * localStorage, which means it works the moment you open it — no console
 * setup standing between you and day 1.
 */
export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);

let cached: { app: FirebaseApp; auth: Auth; db: Firestore } | null = null;

async function getFirebase() {
  if (!firebaseConfigured) return null;
  if (cached) return cached;

  const [{ initializeApp, getApps, getApp }, { getAuth }, { getFirestore }] =
    await Promise.all([
      import("firebase/app"),
      import("firebase/auth"),
      import("firebase/firestore"),
    ]);

  const app = getApps().length ? getApp() : initializeApp(config as Record<string, string>);
  cached = { app, auth: getAuth(app), db: getFirestore(app) };
  return cached;
}

export async function signInWithGoogle(): Promise<User | null> {
  const fb = await getFirebase();
  if (!fb) return null;
  const { GoogleAuthProvider, signInWithPopup } = await import("firebase/auth");
  const result = await signInWithPopup(fb.auth, new GoogleAuthProvider());
  return result.user;
}

export async function signOutOfFirebase(): Promise<void> {
  const fb = await getFirebase();
  if (!fb) return;
  const { signOut } = await import("firebase/auth");
  await signOut(fb.auth);
}

export async function watchAuth(cb: (user: User | null) => void): Promise<() => void> {
  const fb = await getFirebase();
  if (!fb) {
    cb(null);
    return () => {};
  }
  const { onAuthStateChanged } = await import("firebase/auth");
  return onAuthStateChanged(fb.auth, cb);
}

const docPath = (uid: string) => ["players", uid] as const;

export async function fetchRemote(uid: string): Promise<AppData | null> {
  const fb = await getFirebase();
  if (!fb) return null;
  const { doc, getDoc } = await import("firebase/firestore");
  const snap = await getDoc(doc(fb.db, ...docPath(uid)));
  return snap.exists() ? (snap.data() as AppData) : null;
}

export async function pushRemote(uid: string, data: AppData): Promise<void> {
  const fb = await getFirebase();
  if (!fb) return;
  const { doc, setDoc } = await import("firebase/firestore");
  await setDoc(doc(fb.db, ...docPath(uid)), data);
}
