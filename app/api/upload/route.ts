import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { checkAdminAuth } from '@/lib/auth'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: Request) {
  const authed = await checkAdminAuth()
  if (!authed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('image') as File | null

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'blog-covers', resource_type: 'image' },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result)
      }
    ).end(buffer)
  })

  return NextResponse.json({ url: result.secure_url })
}
