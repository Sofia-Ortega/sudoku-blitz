import InputBox from "./Tile";

export function Tiles() {
  return (
    <div className="flex justify-center items-center m-4 w-full">
      {Array.from({ length: 9 }, (_, i) => {
        return <InputBox key={i} num={i + 1} />;
      })}
    </div>
  );
}
