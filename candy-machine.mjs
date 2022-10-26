import fs from 'fs'
import path from 'path'
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0')

async function upload (f) {
  console.log('upload===>', f)
  const added = await client.add(f)
  console.log(added)
  return f
}

async function initData () {
  const baseDir = './data'
  console.log("starting init data ...");

  const result = []
  const fileList = await fs.promises.readdir(baseDir)
  const jsonFiles = fileList.filter(f => f.endsWith('.json'))
  for (const f of jsonFiles) {
    const c = fs.readFileSync(path.join(baseDir, f), 'utf-8')
    const metadata = JSON.parse(c)
    metadata["image"] = await upload(metadata["image"])
    result.push(metadata)
  }
  return result
}

async function mint (item) {
  console.log("start mint:", JSON.stringify(item, null, 2))
}

async function main () {
  const data = await initData()
  for (const item of data) {
    await mint(item)
  }

}


(async () => {
  try {
    await main()
  } catch (err) {
    console.error('Something bad=>', err)
  }
})()