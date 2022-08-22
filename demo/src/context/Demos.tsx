import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

export type DemoId = "general" | "button" | "link";

export interface DemoValues {
  demo: DemoId | null;
  openDemo: (id: DemoId) => void;
  closeDemo: () => void;
}

const Demos = createContext<DemoValues>({
  demo: null,
  openDemo: () => {},
  closeDemo: () => {},
} as DemoValues);

export function useDemos() {
  return useContext(Demos);
}

export function DemosProvider({ children }: PropsWithChildren<{}>) {
  const [demo, setDemo] = useState<DemoId | null>(null);

  const openDemo = (id: DemoId) =>
    setDemo((current) => {
      if (current !== id) {
        return id;
      }
      return current;
    });

  const closeDemo = () => setDemo(null);

  return (
    <Demos.Provider
      value={{
        demo,
        openDemo,
        closeDemo,
      }}
    >
      {children}
    </Demos.Provider>
  );
}
