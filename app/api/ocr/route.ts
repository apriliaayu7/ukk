import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "OCR API ready" })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const image = body?.image

    if (!image || typeof image !== "string") {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      )
    }

    // sementara return dummy dulu supaya build jalan
    // dan flow assign-items tidak error
    return NextResponse.json({
      success: true,
      items: [
        {
          id: 1,
          name: "Contoh Item",
          price: 10000,
        },
      ],
    })
  } catch (error) {
    console.error("OCR ERROR:", error)

    return NextResponse.json(
      { error: "Failed to process OCR" },
      { status: 500 }
    )
  }
}