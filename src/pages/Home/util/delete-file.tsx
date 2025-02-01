export async function deleteFile(prefix: string) {
  const options = {
    method: "GET",
    headers: new Headers({ "content-type": "application/json", "Access-Control-Allow-Origin": "*" }),
  }
  let sleepTime = 1000
  while (true) {
    try {
      sleepTime *= 2
      let res = await fetch(import.meta.env.VITE_API + `/delete_file?bucket_name=${import.meta.env.VITE_S3_BUCKET}&prefix=${prefix}`, options)
      if (res.ok) {
        return await res.json()
      }
      else {
        await new Promise(r => setTimeout(r, sleepTime));
      }
    }
    catch (e) {
      await new Promise(r => setTimeout(r, sleepTime));
    }
  }
}
