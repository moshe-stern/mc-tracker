import { IAuthTokensResponse, IUser } from "tracker-config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserState {
  user?: Omit<IUser, "password">;
  tokens?: IAuthTokensResponse;
  setUser: (user: Omit<IUser, "password">) => void;
  clearUser: () => void;
  setTokens: (tokens: IAuthTokensResponse) => void;
  clearTokens: () => void;
  isAuthenticated: () => boolean;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      tokens: undefined,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: undefined }),
      setTokens: (tokens) => set({ tokens }),
      clearTokens: () => set({ tokens: undefined }),
      isAuthenticated: (): boolean => {
        const state = useUserStore.getState();
        if (!state.tokens) return false;
        return (
          new Date(state.tokens.access.expires).getTime() >=
          new Date().getTime()
        );
      },
    }),
    {
      name: "currentUser",
      storage: createJSONStorage(() => sessionStorage),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as UserState),
      }),
    }
  )
);
