import { CircleUser, LogOut, Menu } from 'lucide-react'
import Image from 'next/image'

import UserAvatarDefault from '@/assets/images/user-avatar-default.webp'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui'
import { useAdminAuth, useLoading } from '@/contexts'
import { Sidebar } from './sidebar'

export const Header = () => {
  const { logout } = useAdminAuth()
  const { openLoading, closeLoading } = useLoading()
  const { adminUserData } = useAdminAuth()

  const handleLogout = async () => {
    openLoading()
    await logout()
    closeLoading()
  }

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="visible md:invisible">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar isMobile />
        </SheetContent>
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="size-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="flex justify-between items-center gap-3">
            <Image
              src={UserAvatarDefault}
              width={20}
              height={20}
              alt={`admin-${adminUserData.id}`}
              className="rounded-full size-6 object-cover"
            />
            <span>
              {adminUserData.firstName} {adminUserData.lastName}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button className="w-full flex gap-3" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Đăng xuất</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
