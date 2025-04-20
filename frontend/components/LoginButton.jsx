const clientId = "397mavpe8vhvqiuc70jcqfbbt2";
const userPoolDomain = "your-user-pool-domain";
const redirectUri = "http://localhost:5173"; // or your production URL

const login = () => {
    const loginUrl = `https://${userPoolDomain}.auth.ap-south-1.amazoncognito.com/login?client_id=${clientId}&response_type=code&scope=email+openid&redirect_uri=${redirectUri}`;
    window.location.href = loginUrl;
};

export default function LoginButton() {
    return <button onClick={login}>Login with Cognito</button>;
}
