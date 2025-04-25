import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../../../../../urls";
import ERROR_MESSAGE from "@/utils/errorMessages";
export async function POST(request) {
    try {
        const { name, email, password, mobNumber, role } = await request.json();

        // Validate inputs
        if (!name || !email || !password || !mobNumber || !role) {
            return NextResponse.json(
                { message: "Name, email, password, mobNumber and role are required" },
                { status: 400 }
            );
        }

        const payload = {
            name,
            email,
            password,
            mobNumber,
            role
        }

        // Forward the request to the backend
        const response = await axios.post(`${BACKEND_URL}/api/v1/register`, payload);

        // Return the response from the backend
        return NextResponse.json({
            data: response.data.data,
            status: response.status
        });
    } catch (error) {
        console.error("Signup error:", error.response?.data);
        return NextResponse.json(
            { data: error.response?.data?.message },
            { status: 500 }
        );
    }
} 