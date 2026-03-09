import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    return NextResponse.json({ message: 'Custom route' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
