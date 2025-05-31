import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type InputContextType = {
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  timerSelection: number;
  setTimerSelection: Dispatch<SetStateAction<number>>;
};

const InputContext = createContext<InputContextType | undefined>(undefined);

export function InputProvider({ children }: { children: ReactNode }) {
  const [userInput, setUserInput] = useState<string>("");
  const [timerSelection, setTimerSelection] = useState<number>(0);

  return (
    <InputContext.Provider
      value={{ userInput, setUserInput, timerSelection, setTimerSelection }}
    >
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
