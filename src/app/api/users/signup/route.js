import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjss from 'bcryptjs'

connect()

export default async function POST(){
    try {
        const reqBody= await request.json()
    } catch (error) {
        
    }

}