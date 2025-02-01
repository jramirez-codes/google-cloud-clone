import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileIcon, FolderIcon, ImageIcon, LayoutDashboardIcon, StarIcon, TrashIcon } from "lucide-react"

const sidebarItems = [
  { icon: LayoutDashboardIcon, label: "My Drive" },
  { icon: StarIcon, label: "Starred" },
  { icon: FileIcon, label: "Documents" },
  { icon: ImageIcon, label: "Images" },
  { icon: TrashIcon, label: "Trash" },
]

export function Sidebar() {
  return (
    <div className="w-64 border-r bg-background">
      <div className="p-4">
        <Button className="w-full justify-start gap-2">
          <FolderIcon className="h-4 w-4" />
          New Folder
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="space-y-1 p-2">
          {sidebarItems.map((item, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start gap-2">
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

