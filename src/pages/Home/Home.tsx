import { Breadcrumbs } from "../../components/breadcrumbs"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { FileIcon, FolderIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { S3File, S3Breadcrumbs } from "./types/s3File"
import React from "react"
import { fetchListOfFiles} from "./util/fetch-list-of-files"

// const breadcrumbItems = [
//   { label: "My Drive", href: "" },
//   { label: "Dev Folder", href: "dev_folder/" },
//   { label: "Dev Folder", href: "" },
// ]

// const files = [
//   { name: "Project Proposal", type: "file", size: "2.3 MB", modified: "2023-06-01" },
//   { name: "Design Assets", type: "folder", size: "-", modified: "2023-05-28" },
//   { name: "Client Meeting Notes", type: "file", size: "145 KB", modified: "2023-05-25" },
//   { name: "Backend Code", type: "folder", size: "-", modified: "2023-05-20" },
//   { name: "Frontend Code", type: "folder", size: "-", modified: "2023-05-18" },
// ]

export default function Home() {
  const [files, setFiles] = React.useState<S3File[]>([])
  const [currDir, setCurrDir] = React.useState("")
  const [areResultsLoading, setAreResultsLoading] = React.useState(false)
  const [breadcrumbItems, setBreadcrumbs] = React.useState<S3Breadcrumbs[]>([{
    label: 'Home',
    href:''
  }])

  React.useEffect(()=>{
    const asyncFunc = async () => {
      if(!areResultsLoading) {
        setAreResultsLoading(_=>true)
        setFiles(await fetchListOfFiles(currDir))
        setAreResultsLoading(_=>false)
      }
    }
    asyncFunc()
  },[currDir])

  function handleFolerFileClick(file: S3File) {
    if(file.type === 'folder') {
      const newDir = breadcrumbItems[breadcrumbItems.length - 1].href + file.name+'/'
      const newCrumb: S3Breadcrumbs = {
        label: file.name,
        href: newDir
      }
      setBreadcrumbs(e=>[...e,newCrumb])
      setCurrDir(newDir)
    }
  }

  return (
    <div className="space-y-4 p-3">
      <div className="flex items-center justify-between">
        <Breadcrumbs areResultsLoading={areResultsLoading} items={breadcrumbItems} setCurrDir={setCurrDir} setBreadcrumbs={setBreadcrumbs}/>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </div>
      {/* <h1 className="text-2xl font-bold">Web Development</h1> */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50%]">Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead className="w-[5%]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.name}>
              <TableCell className="font-medium" onClick={()=>{handleFolerFileClick(file)}}>
                <div className="flex items-center gap-2">
                  {file.type === "folder" ? (
                    <FolderIcon className="h-4 w-4 text-blue-500" />
                  ) : (
                    <FileIcon className="h-4 w-4 text-gray-500" />
                  )}
                  {file.name}
                </div>
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.modified}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

