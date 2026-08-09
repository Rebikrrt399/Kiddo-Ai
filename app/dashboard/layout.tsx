import { Sidebar } from "@/components/dashboard/sidebar";
import { RoleGate } from "@/components/role-gate";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RoleGate allowedRole="parent">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </RoleGate>
  );
}
