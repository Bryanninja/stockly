"use client";

import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarButtonProps {
  href: string;
  children: React.ReactNode;
}

const SidebarButton = ({ href, children }: SidebarButtonProps) => {
  const pathname = usePathname();

  return (
    <Button
      render={<Link href={href} />}
      nativeButton={false}
      variant={pathname === `${href}` ? "secondary" : "ghost"}
      size="lg"
      className="justify-start"
    >
      {children}
    </Button>
  );
};

export default SidebarButton;
