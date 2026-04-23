export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      async authorize(credentials, req) {
        console.log(credentials);
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
};
