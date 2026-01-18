import { Suspense } from "react";
import SubscriptionsGate from "./SubscriptionsGate";
import SubscriptionsFallback from "./SubscriptionsFallback";

export default function Page() {
  return (
    <Suspense fallback={<SubscriptionsFallback />}>
      <SubscriptionsGate />
    </Suspense>
  );
}
