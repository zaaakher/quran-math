import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { getMessages } from "next-intl/server";
import { Locale, locales } from "@/i18n/config";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <Providers locale={locale} messages={messages}>
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
      </body>
    </html>
  );
}
