import type { InjectionKey, Ref, ComputedRef } from "vue";
import type { UserType } from "~/types/user";

export const userInjectionKey: InjectionKey<Ref<UserType | undefined>> =
  Symbol() as InjectionKey<Ref<UserType | undefined>>;

export const isAuthInjectionKey: InjectionKey<ComputedRef<boolean>> =
  Symbol() as InjectionKey<ComputedRef<boolean>>;

export const signInInjectionKey: InjectionKey<(targetUser: UserType) => void> =
  Symbol() as InjectionKey<(targetUser: UserType) => void>;

 export const signOutInjectionKey: InjectionKey<() => void> =
  Symbol() as InjectionKey<() => void>;