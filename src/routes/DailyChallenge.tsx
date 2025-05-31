import { InputProvider } from "../components/MainGame/InputContext";
import MainGame from "../MainGame";

export default function DailyChallenge() {
  return (
    <InputProvider>
      <MainGame dailyChallenge={true} />
    </InputProvider>
  );
}
