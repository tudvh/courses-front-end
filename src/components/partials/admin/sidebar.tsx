import { Gauge, Package, Package2, Users } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { SheetClose } from '@/components/ui'
import { cn } from '@/lib/utils'

type SidebarProps = {
  isMobile?: boolean
}

const SIDEBAR_ITEMS = [
  { icon: Gauge, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: Users, label: 'Người dùng', href: '/admin/users' },
  { icon: Package, label: 'Khóa học', href: '/admin/courses' },
]

export const Sidebar = (props: SidebarProps) => {
  const { isMobile } = props
  const pathName = usePathname()

  return (
    <div className="flex h-full w-full flex-col gap-2 border-r bg-muted">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2">
          <Package2 className="h-6 w-6" />
          <span className="text-lg font-bold">Courses Steam Admin</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 font-medium lg:px-4">
          {SIDEBAR_ITEMS.map((item, index) => {
            const { icon: Icon, href, label } = item
            const isActive = pathName.startsWith(href)
            const linkContent = (
              <Link
                key={index}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                  isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary',
                )}
              >
                <Icon className="size-5" />
                <span>{label}</span>
              </Link>
            )
            return isMobile ? <SheetClose asChild>{linkContent}</SheetClose> : linkContent
          })}
        </nav>
      </div>
    </div>
  )
}
