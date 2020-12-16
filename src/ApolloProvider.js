import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
//import { setContext } from "apollo-link-context";
import App from "./App";

const link = new createHttpLink({
  uri: "http://localhost:1337/graphql"
});

// const authHeader = setContext(() => {
//   const token = localStorage.getItem("jwt");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
