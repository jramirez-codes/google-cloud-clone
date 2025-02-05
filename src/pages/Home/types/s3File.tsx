export interface S3File {
  name: string,
  key: string
  type: string,
  modified: string,
  size: number
}

export interface S3Breadcrumbs {
  label: string,
  href: string
}