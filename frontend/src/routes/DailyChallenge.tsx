import { InputProvider } from "../components/MainGame/InputContext";
import MainGame from "../components/MainGame/MainGame";

export default function DailyChallenge() {
  return (
    <InputProvider>
      <MainGame dailyChallenge={true} />
    </InputProvider>
  );
}
