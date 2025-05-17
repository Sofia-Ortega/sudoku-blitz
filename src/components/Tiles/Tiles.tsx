import InputBox from "./Tile";

export function Tiles() {
  return (
    <div className="flex justify-around items-center my-4">
      {Array.from({ length: 9 }, (_, i) => {
        return <InputBox key={i} num={i + 1} />;
      })}
    </div>
  );
}
