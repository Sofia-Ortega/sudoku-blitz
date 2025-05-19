export default function GameOver() {
  return (
    <div className="text-slate-700">
      <div className="text-center text-3xl font-bold my-2">Good Game!</div>
      <div className="bg-sky-50 w-[396px] h-[369px] rounded-2xl shadow-sm ">
        <div className="flex flex-col justify-between h-full py-4">
          <div className="flex items-center justify-center  text-xl">
            <span className="mr-1">Time:</span>
            <span className="font-bold text-3xl">30</span>
          </div>
          <div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="text-2xl font-bold text-right self-center ">
                Accuracy:
              </div>
              <div className="self-center text-blue-800 font-bold text-5xl">
                95%
              </div>
              <div className="text-2xl font-bold text-right self-center ">
                Score:
              </div>
              <div className="self-center text-blue-800 font-bold text-5xl">
                12
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2  justify-center items-center">
            <button className="bg-purple-800 text-white font-bold w-32 py-0.5 rounded-sm shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
              Share
            </button>
            <button className=" text-blue-800 border border-blue-800 font-bold w-32 py-0.5 rounded-sm shadow-sm cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
              Play Again
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
