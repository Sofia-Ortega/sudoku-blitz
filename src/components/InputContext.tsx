import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InputContextType = {
  inputNumber: string;
  setInputNumber: Dispatch<SetStateAction<string>>;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export function InputProvider({ children }: { children: ReactNode }) {
  const [inputNumber, setInputNumber] = useState<string>("");

  return (
    <InputContext.Provider value={{ inputNumber, setInputNumber }}>
      {children}
    </InputContext.Provider>
  );
}

export const useInput = (): InputContextType => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInput must be used within an InputProvider");
  }
  return context;
};
