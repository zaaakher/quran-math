import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { getMessages } from "next-intl/server";
import { Locale, localeDirections } from "@/i18n/config";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/lib/locale-context";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const initialLocale = rawLocale as Locale;
  const initialMessages = await getMessages({ locale: initialLocale });

  return (
    <LocaleProvider>
      <Providers initialLocale={initialLocale} initialMessages={initialMessages}>
        <div className="[--header-height:calc(--spacing(14))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4">
                  {children}
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div>
      </Providers>
    </LocaleProvider>
  );
}
