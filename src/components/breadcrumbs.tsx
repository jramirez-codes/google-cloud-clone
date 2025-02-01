import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[],
  areResultsLoading: boolean,
  setCurrDir: React.Dispatch<React.SetStateAction<string>>,
  setBreadcrumbs: React.Dispatch<React.SetStateAction<BreadcrumbItem[]>>
}

export function Breadcrumbs({ items, setCurrDir, setBreadcrumbs, areResultsLoading }: BreadcrumbsProps) {

  function handleBreadcrumbRouting(item: BreadcrumbItem, index: number) {
    if (!areResultsLoading) {
      setBreadcrumbs(e=>e.slice(0, index+1))
      setCurrDir(item.href)
    }
  }

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />}
            <div onClick={()=>{handleBreadcrumbRouting(item, index)}}
              className={`inline-flex items-center text-sm font-medium ${
                index === items.length - 1 ? "text-primary cursor-default" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

