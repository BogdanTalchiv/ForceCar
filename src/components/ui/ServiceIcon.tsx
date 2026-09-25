import { CarFront, Cog, Disc3, Gauge, ScanSearch, Settings2, SprayCan, Wrench, type LucideProps } from "lucide-react";
import type { ServiceIcon as ServiceIconName } from "@/config/services";

const icons: Record<ServiceIconName, React.ComponentType<LucideProps>> = {
  diagnostics: ScanSearch,
  engine: Gauge,
  timing: Cog,
  brakes: Disc3,
  suspension: Settings2,
  mechanical: Wrench,
  bodywork: CarFront,
  paint: SprayCan,
};

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & LucideProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" strokeWidth={1.75} {...props} />;
}
