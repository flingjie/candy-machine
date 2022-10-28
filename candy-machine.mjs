import fs from 'fs'
import path from 'path'
import { create } from 'ipfs-http-client';
import { mint } from './sui.mjs'

const baseDir = './data'
const client = create('http://127.0.0.1:5001')

async function upload (f) {
  const filePath = path.join(baseDir, f)
  console.log('upload===>',)
  let content = fs.readFileSync(filePath, 'utf8');
  const added = await client.add(content)
  console.log(added)
  return `ipfs://${added.path}`
}

async function initData () {
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