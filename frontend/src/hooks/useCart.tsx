// ─── External Dependencies ────────────────────────────────────────────────
import { useCallback, useState } from "react";

// ─── Internal Utilities & Context ─────────────────────────────────────────
import { getCartItems } from "@utils/api/cartApi";
import { setCartItems } from "@context/global/globalActions";
import { useGlobalDispatch, useGlobalState } from "@context/global/globalContext";

// ─── Hook ─────────────────────────────────────────────────────────────────
export const useCart = () => {
  const dispatch = useGlobalDispatch();
  const { user } = useGlobalState();
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!user?.email) {
      setCartItems(dispatch, []);
      setError("User not authenticated");
      return;
    }

    try {
      const items = await getCartItems();
      setCartItems(dispatch, items);
      setError(null);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Cart fetch failed";
      setCartItems(dispatch, []);
      setError(errorMsg);
    }
  }, [dispatch, user]);

  return { fetchCart, error };
};