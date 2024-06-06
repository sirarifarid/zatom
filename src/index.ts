/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StoreApi, UseBoundStore } from "zustand";
import { useShallow } from "zustand/react/shallow";

type SetState<T> = (p: T | ((p: T) => T)) => void;

type StoreProps<T, B> = {
  init: { state: T | B };
  setState: SetState<T>;
};

export const zatom = <T>(
  def: T
): UseBoundStore<StoreApi<StoreProps<T, typeof def>>> =>
  create((set) => ({
    init: { state: def },
    setState: (p) =>
      set((s) => ({
        ...s,
        init: { state: typeof p === "function" ? (p as any)(s.init.state) : p },
      })),
  }));

type ExtractStoreApiType<T> = T extends UseBoundStore<StoreApi<infer U>>
  ? U
  : never;

export const useAtom = <T extends UseBoundStore<StoreApi<any>>>(
  props: T
): [
  ExtractStoreApiType<T>["init"]["state"],
  SetState<ExtractStoreApiType<T>["init"]["state"]>
] => {
  type storeApiType = ExtractStoreApiType<T>;
  const update = props(useShallow((state) => state.setState));
  const state = props(
    useShallow((state) => state.init.state as storeApiType["init"]["state"])
  );

  return [state, update];
};
