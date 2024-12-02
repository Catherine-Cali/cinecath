'use client';

import ApplicationLayout from "./design/ApplicationLayout";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ApplicationLayout>
      {children}
    </ApplicationLayout>
  );
}
