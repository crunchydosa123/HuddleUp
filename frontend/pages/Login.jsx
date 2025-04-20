const Login = () => {
    const loginUrl = "https://ap-south-1j6ymetniw.auth.ap-south-1.amazoncognito.com/login?client_id=1t0j6445ocr77jghvt0qo1sd6h&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fd84l1y8p4kdic.cloudfront.net";

    return (
        <div>
            <h2>Login</h2>
            <a href={loginUrl}>Login with Cognito</a>
        </div>
    );
};

export default Login;
