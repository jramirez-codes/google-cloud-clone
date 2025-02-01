export function humanReadableSize(bytes: number) {
  try {

    if (bytes < 0) throw new Error("Bytes value cannot be negative");

    const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
  catch (_) {
    return "-"
  }
}
