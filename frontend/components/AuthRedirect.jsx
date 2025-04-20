import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRedirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");
    
        if (!code) {
            console.error("No authorization code found in URL.");
            return;
        }
    
        console.log("✅ Authorization Code Received:", code);
        exchangeCodeForToken(code);
    }, []);
    

    const exchangeCodeForToken = async (code) => {
        try {
            const response = await fetch("https://ap-south-1j6ymetniw.auth.ap-south-1.amazoncognito.com/oauth2/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: "1t0j6445ocr77jghvt0qo1sd6h",
                    code: code,
                    redirect_uri: "https://d84l1y8p4kdic.cloudfront.net"
                })
            });

            const data = await response.json();
            console.log("Token Response:", data);

            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token);
                navigate("/dashboard"); // Redirect to protected route
            } else {
                console.error("Failed to get access token:", data);
            }
        } catch (error) {
            console.error("Error fetching token:", error);
        }
    };

    return <h2>Processing login...</h2>;
};

export default AuthRedirect;
