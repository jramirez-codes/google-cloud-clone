import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BellIcon, SearchIcon, FolderIcon, StarIcon, FileIcon, ImageIcon, TrashIcon } from "lucide-react"

const navItems = [
  { icon: FolderIcon, label: "My Drive" },
  { icon: StarIcon, label: "Starred" },
  { icon: FileIcon, label: "Documents" },
  { icon: ImageIcon, label: "Images" },
  { icon: TrashIcon, label: "Trash" },
]

export function Header() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center flex-1">
          <Input
            type="search"
            placeholder="Search in Drive"
            className="w-full max-w-sm"
            // leftIcon={<SearchIcon className="h-4 w-4 text-muted-foreground" />}
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="@username" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">username</p>
                  <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <nav className="flex items-center gap-1 px-6 py-2 overflow-x-auto">
        {navItems.map((item, index) => (
          <Button key={index} variant="ghost" className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </header>
  )
}

