"use client";
import { baselightTheme } from "@/app/lib/dashboard/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
