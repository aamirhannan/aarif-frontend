
import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../../../../../urls";
import ERROR_MESSAGE from "@/utils/errorMessages";
export async function POST(request) {
    try {
        const { userID, token } = await request.json();
        // Validate inputs
        if (!userID) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        const headers = {
            "Authorization": `Bearer ${token}`
        }

        // Forward the request to the backend
        const response = await axios.get(`${BACKEND_URL}/api/v1/all-caused-by-user/${userID}`, { headers });


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