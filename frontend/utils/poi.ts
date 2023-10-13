export const generatePoiMessageTemplate = (encryptedData: string) => {
  return `https://example.com wants you to sign a message to save your interaction:

I prove that I have interacted with a physical interface with the following details:
    
Encrypted Data: ${encryptedData}
`;
};
