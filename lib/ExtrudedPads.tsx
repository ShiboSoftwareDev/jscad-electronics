import type { AnyCircuitElement } from "circuit-json"
import { fp } from "@tscircuit/footprinter"
import { FootprintPad } from "./FootprintPad"
import { FootprintPlatedHole } from "./FootprintPlatedHole"

export const ExtrudedPads = ({
  soup,
  footprint,
}: { soup?: AnyCircuitElement[]; footprint?: string }) => {
  if (!soup && footprint) {
    soup = fp.string(footprint).circuitJson() as AnyCircuitElement[]
  }

  if (!soup) throw new Error("No soup or footprint provided to ExtrudedPads")

  return (
    <>
      {soup
        .filter((s) => s.type === "pcb_smtpad")
        .map((pad, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:
          <FootprintPad key={i} pad={pad} />
        ))}
      {soup
        .filter((s) => s.type === "pcb_plated_hole")
        .map((hole, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey:
          <FootprintPlatedHole key={i} hole={hole} />
        ))}
    </>
  )
}
