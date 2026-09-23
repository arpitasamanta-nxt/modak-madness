import { MODAK_SIZE, type Modak } from "@/utils/gameUtils";

// A single falling modak. Golden modaks glow and are worth more points.
export default function FallingModak({ modak }: { modak: Modak }) {
  return (
    <div
      className="absolute transition-transform"
      style={{
        left: `${modak.x}%`,
        top: `${modak.y}%`,
        width: `${MODAK_SIZE}%`,
      }}
    >
      <ModakShape isGolden={modak.isGolden} />
    </div>
  );
}

export function ModakShape({ isGolden = false }: { isGolden?: boolean }) {
  return (
    <div
      className={`relative aspect-square w-full ${isGolden ? "animate-sway" : ""}`}
      aria-hidden="true"
    >
      <div
        className={`absolute inset-x-[18%] top-0 h-[28%] rounded-t-full ${
          isGolden ? "bg-gold" : "bg-accent"
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-[78%] rounded-[45%_45%_50%_50%/60%_60%_40%_40%] border-2 ${
          isGolden
            ? "border-gold-foreground/30 bg-gold glow-gold"
            : "border-primary/25 bg-accent"
        }`}
      >
        <div className="absolute inset-x-[22%] top-[22%] h-[10%] rounded-full bg-primary/25" />
        <div className="absolute inset-x-[14%] top-[48%] h-[10%] rounded-full bg-primary/20" />
      </div>
    </div>
  );
}
