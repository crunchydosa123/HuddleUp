import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: "ap-south-1_J6yMeTnIW",
    ClientId: "1t0j6445ocr77jghvt0qo1sd6h",
}

export default new CognitoUserPool(poolData);