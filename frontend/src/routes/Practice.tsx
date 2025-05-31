import { InputProvider } from "../components/MainGame/InputContext";
import MainGame from "../components/MainGame/MainGame";

export default function Practice() {
  return (
    <InputProvider>
      <MainGame dailyChallenge={false} />
    </InputProvider>
  );
}
