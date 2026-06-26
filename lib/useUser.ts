"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "./supabase/client";

/**
 * Hook de sesión: devuelve el usuario actual, si es Premium, y un indicador
 * de carga. Se suscribe a los cambios de sesión.
 */
export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = useMemo(
    () => (isSupabaseConfigured ? createClient() : null),
    []
  );

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    async function loadProfile(u: User | null) {
      setUser(u);
      if (u) {
        const { data } = await supabase!
          .from("profiles")
          .select("is_premium, premium_until")
          .eq("id", u.id)
          .single();
        setIsPremium(
          Boolean(
            data?.is_premium &&
              (!data.premium_until || new Date(data.premium_until) > new Date())
          )
        );
      } else {
        setIsPremium(false);
      }
      setLoading(false);
    }

    supabase.auth.getUser().then(({ data }) => loadProfile(data.user ?? null));

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      loadProfile(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
  }

  return { user, isPremium, loading, signOut };
}
