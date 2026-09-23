import { BASKET_TOP, BASKET_WIDTH } from "@/utils/gameUtils";

// The plate/basket the player moves left and right.
export default function Basket({ x }: { x: number }) {
  return (
    <div
      className="absolute transition-[left] duration-100 ease-out"
      style={{ left: `${x}%`, top: `${BASKET_TOP}%`, width: `${BASKET_WIDTH}%` }}
    >
      <div className="relative">
        <div className="h-2 rounded-full bg-leaf/70" />
        <div className="mt-[2px] h-[2.2rem] rounded-b-[999px] border-4 border-b-8 border-secondary bg-primary shadow-festive sm:h-[2.8rem]">
          <div className="mx-auto mt-1 flex w-[80%] justify-between opacity-60">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-5 w-[2px] rounded bg-secondary" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
