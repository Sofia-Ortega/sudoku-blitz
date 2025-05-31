import { InputProvider } from "../components/MainGame/InputContext";
import MainGame from "../MainGame";

export default function Practice() {
  return (
    <InputProvider>
      <MainGame dailyChallenge={false} />
    </InputProvider>
  );
}
