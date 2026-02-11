"use client";

import { useLocaleContext } from "@/lib/locale-context";
import {
    DropdownMenu,
    DropdownMenuContent,

    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SikkaLogo from "./sikka-logo";
import Link from "next/link";

export function SikkaDropdown() {

    const { locale } = useLocaleContext();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    className="h-8 w-8"
                    variant="outline"
                    size="icon"
                    title="Switch Language"
                >
                    <SikkaLogo className="h-3.75 w-3.75" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={locale === "ar" ? "start" : "end"}>
                <div className="flex flex-col px-2 py-1 text-sm font-medium text-muted-foreground">
                    <span className="text-xs text-muted-foreground">Designed & Developed by</span>
                    <Link
                        href="https://sikka.io" target="_blank" rel="noopener noreferrer"
                        className="text-lg font-bold text-primary">
                        Sikka Software
                    </Link>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
