const dev = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-dev-serverlessdeploymentbucket-1fefyww696m7l"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://tuvkx2uly3.execute-api.us-east-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_FGp46MZkA",
    APP_CLIENT_ID: "412n32nqg66iqlitrkvougl9gu",
    IDENTITY_POOL_ID: "us-east-1:5d6b0ba4-1ad6-4548-8d7e-b1ea0a173ed7"
  },
  STRIPE_KEY: "pk_test_6TL0a6WIugGBrgjeA0UlvHqr"
};

const prod = {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-2-api-prod-serverlessdeploymentbucket-16p74ekhpkc3p"
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://jybl4s9wz1.execute-api.us-east-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_EtBmufut4",
    APP_CLIENT_ID: "2u8rbq8147mbobgs18rcqk45re",
    IDENTITY_POOL_ID: "us-east-1:f9e722cd-656e-48d7-9d77-5ebdcebde532"
  },
  STRIPE_KEY: "pk_test_6TL0a6WIugGBrgjeA0UlvHqr"

};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
