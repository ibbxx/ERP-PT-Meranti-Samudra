import Link from "next/link";
import Card from "@/components/Card";

export default function DemoPage() {
  return (
    <section className="mx-auto w-full max-w-4xl space-y-6 px-6 py-10">
      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
          Demo Guide
        </p>
        <h1 className="font-display text-3xl text-ink">
          GM walkthrough (5 minutes)
        </h1>
        <p className="mt-2 text-sm text-ink/60">
          Use this quick path to show the full ERP flow from login to approvals.
        </p>
      </Card>

      <Card className="p-6">
        <ol className="space-y-4 text-sm text-ink/70">
          <li>
            <span className="font-semibold text-ink">1) Login as GM</span>
            <div>
              Go to{" "}
              <Link className="btn-ghost" href="/login">
                /login
              </Link>
              , select role GM, enter a name, then click Enter Dashboard.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">2) Dashboard</span>
            <div>
              Review GM overview and KPI cards, then jump to Calls.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">3) Calls list</span>
            <div>
              Open any call from the table to show operational details.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">4) Call detail</span>
            <div>
              Highlight the stepper, switch to Costs tab, and add a new cost item
              to create a pending approval.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">5) Approvals</span>
            <div>
              Go to Approvals to approve/reject and see the cost status update
              back in the call detail.
            </div>
          </li>
        </ol>
      </Card>

      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
          Role Scenarios
        </p>
        <ol className="mt-4 space-y-4 text-sm text-ink/70">
          <li>
            <span className="font-semibold text-ink">Ops update status</span>
            <div>
              Login as Operation Head or PIC OPS, open a call, update the step
              status in Timeline.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">Finance submit cost</span>
            <div>
              Login as Finance, open a call, add a cost item (OPEX/COGS) to
              create a pending approval.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">GM approve &lt; 5jt</span>
            <div>
              Login as GM, go to Approvals, approve costs below Rp 5.000.000.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">
              Direktur approve &gt; 5jt
            </span>
            <div>
              Login as Director, open Approvals and approve any cost above
              Rp 5.000.000.
            </div>
          </li>
          <li>
            <span className="font-semibold text-ink">
              Logistics vendor compare & delivery
            </span>
            <div>
              Login as Admin Logistik, open Logistics & Vendor Compare, then
              check Delivery status.
            </div>
          </li>
        </ol>
      </Card>

      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/40">
          Quick Links
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link className="btn-secondary" href="/login">
            /login
          </Link>
          <Link className="btn-secondary" href="/dashboard">
            /dashboard
          </Link>
          <Link className="btn-secondary" href="/calls">
            /calls
          </Link>
          <Link className="btn-secondary" href="/approvals">
            /approvals
          </Link>
        </div>
      </Card>
    </section>
  );
}
