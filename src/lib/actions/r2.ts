"use server";

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ImageDataSchema } from "@/lib/zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.IMAGE_BUCKET_URL!,
  credentials: {
    accessKeyId: process.env.IMAGE_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.IMAGE_BUCKET_ACCESS_KEY_SECRET!
  }
});

export async function generatePresignedUrlForImageUpload(params: {
  name: string;
  type: string;
  size: number;
}) {
  const { name, type, size } = ImageDataSchema.parse(params);
  const putCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_IMAGE_BUCKET_NAME!,
    Key: name,
    ContentType: type,
    ContentLength: size
  });

  const url = await getSignedUrl(r2, putCommand, { expiresIn: 60 });

  return {
    success: true as const,
    url
  };
}

export async function generatePresignedUrlForImageDelete(imageLink: string) {
  const putCommand = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_IMAGE_BUCKET_NAME!,
    Key: imageLink.replace(`${process.env.NEXT_PUBLIC_IMAGE_BUCKET_URL!}/`, "")
  });

  const url = await getSignedUrl(r2, putCommand, { expiresIn: 60 });

  return {
    success: true as const,
    url
  };
}
