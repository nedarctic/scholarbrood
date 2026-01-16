import { Suspense } from "react";
import SubscriptionsGate from "./SubscriptionsGate";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SubscriptionsGate />
    </Suspense>
  );
}
