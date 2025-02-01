import { Breadcrumbs } from "../../components/breadcrumbs"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { FileIcon, FolderIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react"
import { S3File, S3Breadcrumbs } from "./types/s3File"
import React from "react"
import { fetchListOfFiles } from "./util/fetch-list-of-files"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { downloadFile } from "./util/download-file"
import { uploadFile } from "./util/upload-file"
import { toast } from "sonner"
import { humanReadableSize } from "./util/human-readable-data-size"
import { deleteFile } from "./util/delete-file"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

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
    href: ''
  }])
  const fileInputRef = React.useRef<any>(null)
  const [folderCreationDialog, setFolderCreationDialog] = React.useState(false)

  React.useEffect(() => {
    const asyncFunc = async () => {
      if (!areResultsLoading) {
        setAreResultsLoading(_ => true)
        setFiles(await fetchListOfFiles(currDir))
        setAreResultsLoading(_ => false)
      }
    }
    asyncFunc()
  }, [currDir])

  function handleFolderClick(file: S3File) {
    if (file.type === 'folder') {
      const newDir = breadcrumbItems[breadcrumbItems.length - 1].href + file.name + '/'
      const newCrumb: S3Breadcrumbs = {
        label: file.name,
        href: newDir
      }
      setBreadcrumbs(e => [...e, newCrumb])
      setCurrDir(newDir)
    }
  }

  function handleFileDownload(file: S3File) {
    downloadFile(file.key)
  }

  async function handleFileUpload(event: any) {
    setAreResultsLoading(_ => true)
    if (await uploadFile(event.target.files[0], currDir + event.target.files[0].name)) {
      toast.success(`Upload Success`, { description: `${event.target.files[0].name} as uploaded!` })
      const dateString = (new Date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      setFiles(e => [...e.filter(a => a.key !== currDir + event.target.files[0].name), ({
        name: event.target.files[0].name,
        key: currDir + event.target.files[0].name,
        type: "file",
        size: NaN,
        modified: dateString
      } as S3File)])
    }
    else {
      toast.error(`Upload Failed`, { description: `${event.target.files[0].name} has failed to upload, please try again!` })
    }
    setAreResultsLoading(_ => false)
  }

  function handleFileInputUi() {
    if (fileInputRef && fileInputRef.hasOwnProperty('current')) {
      fileInputRef?.current?.click()
    }
  }

  function handleFileDelete(file: S3File) {
    if (window.confirm(`Are you sure you want to delete: ${file.name}`)) {
      deleteFile(file.key)
      setFiles(e => e.filter(s => s.key !== file.key))
    }
  }

  function handleFolderCreationDialog() {
    setFolderCreationDialog(true)
  }

  function handleFolderCreation(filename: string) {
    if (filename !== '' && !filename.includes('/')) {
      setFiles(e => [...e, {
        name: filename,
        key: currDir + filename,
        type: "folder",
        size: NaN,
        modified: "-"
      }])
    }
    else {
      if (filename == "") {
        toast.error('Please enter a filename')
      }
      else {
        toast.error('Please remove \'/\' from your file name.')
      }
    }
    setFolderCreationDialog(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Breadcrumbs areResultsLoading={areResultsLoading} items={breadcrumbItems} setCurrDir={setCurrDir} setBreadcrumbs={setBreadcrumbs} />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button>
              <PlusIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => { handleFolderCreationDialog() }}>
              Create Folder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => { handleFileInputUi() }}>
              Upload File
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
          {areResultsLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <>
              {files.map((file) => (
                <TableRow key={file.name}>
                  <TableCell className="font-medium" onClick={() => { handleFolderClick(file) }}>
                    <div className="flex items-center gap-2">
                      {file.type === "folder" ? (
                        <FolderIcon className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileIcon className="h-4 w-4 text-gray-500" />
                      )}
                      {file.name}
                    </div>
                  </TableCell>
                  <TableCell>{humanReadableSize(file.size)}</TableCell>
                  <TableCell>{file.modified}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {file.type !== 'folder' && <DropdownMenuItem onClick={() => { handleFileDownload(file) }}>Download</DropdownMenuItem>}
                        <DropdownMenuItem onClick={() => { handleFileDelete(file) }}>Delete</DropdownMenuItem>
                        {/* <DropdownMenuItem>Move</DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      <input type="file" ref={fileInputRef} onChange={e => { handleFileUpload(e) }} style={{ display: "none" }} />
      <Dialog onOpenChange={() => { setFolderCreationDialog(e => !e) }} open={folderCreationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Please name your folder.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e: any) => {
            e.preventDefault()
            handleFolderCreation(e?.target[0]?.value)
          }}>

            <Input placeholder="Folder Name" />
            <Button type="submit" className="w-full mt-2">Create</Button>
          </form>
        </DialogContent>
      </Dialog>

    </div>
  )
}

