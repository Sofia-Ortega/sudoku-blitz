interface Props {
  num: number | null;
}

export function Box({ num }: Props) {
  return (
    <div className=" hover:bg-fuchsia-50 text-3xl w-32 h-32 border-1  flex justify-center items-center">
      <div>{num ? num : ""}</div>
    </div>
  );
}
