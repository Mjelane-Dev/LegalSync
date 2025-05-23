import Link from "next/link";

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();

  return (
    <div className="h-screen bg-[#1d3a57]">
      <div className="mx-auto flex max-w-7xl flex-col space-y-14 ">
        <header className="admin-header">
          <Link href="/" className="cursor-pointer">
            <text className="mb-12 text-lg font-bold">LegalSync</text>
          </Link>

          <p className="text-16-semibold">Admin Dashboard</p>
        </header>

        <main className="admin-main">
          <section className="w-full space-y-4">
            <h1 className="header">Welcome ,Admin</h1>
            <p className="text-dark-700">
              Start the day with managing new appointments
            </p>
          </section>

          <section className="admin-stat">
            <StatCard
              type="appointments"
              count={appointments.scheduledCount}
              label="Scheduled appointments"
              icon={"/assets/icons/appointments.svg"}
            />
            <StatCard
              type="pending"
              count={appointments.pendingCount}
              label="Pending appointments"
              icon={"/assets/icons/pending.svg"}
            />
            <StatCard
              type="cancelled"
              count={appointments.cancelledCount}
              label="Cancelled appointments"
              icon={"/assets/icons/cancelled.svg"}
            />
          </section>

          <DataTable columns={columns} data={appointments.documents} />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
