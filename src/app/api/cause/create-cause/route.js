
import { NextResponse } from "next/server";
import axios from "axios";
import { BACKEND_URL } from "../../../../../urls";
import ERROR_MESSAGE from "@/utils/errorMessages";
export async function POST(request) {
    const formDataToSend = await request.formData();
    const token = formDataToSend.get('token');
    formDataToSend.delete('token');


    // Validate inputs
    if (!formDataToSend) {
        return NextResponse.json(
            { message: "Cause data is required" },
            { status: 400 }
        );
    }

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
    }

    // Forward the request to the backend
    const response = await axios.post(`${BACKEND_URL}/api/v1/causes`,
        formDataToSend,
        {
            headers
        }
    );

    // Return the response from the backend
    return NextResponse.json({
        data: response.data.data,
        status: response.status
    });

    // try {
    // } catch (error) {
    //     console.error("Login error:", error);
    //     return NextResponse.json(
    //         { data: error.response?.data },
    //         { status: 500 }
    //     );
    // }
} 