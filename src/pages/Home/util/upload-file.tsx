async function createUploadUrl(prefix: string, content_type: string) {
  const options = {
    method: "GET",
    headers: new Headers({ "content-type": "application/json", "Access-Control-Allow-Origin": "*" }),
  }
  let sleepTime = 1000
  while (true) {
    try {
      sleepTime *= 2
      let res = await fetch(import.meta.env.VITE_API + `/upload_link?bucket_name=${import.meta.env.VITE_S3_BUCKET}&prefix=${prefix}&content_type=${content_type}`, options)
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

export async function uploadFile(file: any, filename: string) {
  try {
    const s3Url = (await createUploadUrl(filename, file.type))
    const uploadResponse = await fetch(s3Url, {
      method: "PUT",
      body: file,
      headers: new Headers({
        "content-type": file.type,
      }),
    });

    if (!uploadResponse.ok) {
      throw new Error("Upload failed");
    }
    return true
  } catch (error) {
    return false
  }
}