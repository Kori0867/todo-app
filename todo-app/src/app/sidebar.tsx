"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "~/lib/utils"
import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet"
import { Menu, Plus, List, Pencil, Trash } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/todo/view",
      label: "View All",
      icon: List,
    },
    {
      href: "/todo/create",
      label: "Create",
      icon: Plus,
    },
    {
      href: "/todo/update",
      label: "Update",
      icon: Pencil,
    },
    {
      href: "/todo/delete",
      label: "Delete",
      icon: Trash,
    },
  ]

  const SidebarContent = (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
      <div className="flex flex-col space-y-2">
        {routes.map((route) => (
          <Button
            key={route.href}
            asChild
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === route.href && "bg-muted hover:bg-muted"
            )}
          >
            <Link href={route.href}>
              <route.icon className="mr-2 h-4 w-4" />
              {route.label}
            </Link>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )

  return (
    <>
      <aside className="hidden w-[200px] flex-col md:flex">
        <ScrollArea className="flex-1">
          {SidebarContent}
        </ScrollArea>
      </aside>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    </>
  )
}