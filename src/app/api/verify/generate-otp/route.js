
import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../../../../../urls";
import ERROR_MESSAGE from "@/utils/errorMessages";
export async function POST(request) {
    try {
        const { phone } = await request.json();
        // Validate inputs
        if (!phone) {
            return NextResponse.json(
                { message: "Phone number is required" },
                { status: 400 }
            );
        }

        // if (!token) {
        //     return NextResponse.json(
        //         { message: "Token is required" },
        //         { status: 400 }
        //     );
        // }

        // const headers = {
        //     "Authorization": `Bearer ${token}`
        // }

        const payload = {
            phone
        }

        // Forward the request to the backend
        const response = await axios.post(`${BACKEND_URL}/api/v1/claimer/generate-otp`, {
            ...payload
        });

        // Return the response from the backend
        return NextResponse.json({
            data: response.data.data,
            status: response.status
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { data: error.response?.data?.message || ERROR_MESSAGE.LOGIN_FAILED },
            { status: 500 }
        );
    }
} 