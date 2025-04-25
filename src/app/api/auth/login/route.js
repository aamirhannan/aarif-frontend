import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../../../../../urls";
import ERROR_MESSAGE from "@/utils/errorMessages";

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // Validate inputs
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        const payload = {
            email,
            password
        }

        // Forward the request to the backend
        const response = await axios.post(`${BACKEND_URL}/api/v1/login`, payload);

        // Return the response from the backend
        return NextResponse.json({
            data: response.data.data,
            status: response.status
        });
    } catch (error) {
        console.error("Login error:", error.response?.data);
        return NextResponse.json(
            { data: error.response?.data?.message || ERROR_MESSAGE.LOGIN_FAILED },
            { status: 500 }
        );
    }
} 