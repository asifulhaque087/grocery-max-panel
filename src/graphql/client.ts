// import { withApollo as createWithApollo } from "next-apollo";

// import { ApolloClient, createHttpLink } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import cache from "./cache";

// let uri: any;

// if (process.env.NODE_ENV === "production") {
//   uri = "https://grocery-max-server.herokuapp.com/graphql";
// } else {
//   uri = "http://localhost:5000/graphql";
// }

// const httpLink = createHttpLink({
//   uri,
// });

// const authLink = setContext(() => {
//   const token = sessionStorage.getItem("jwtToken");
//   return {
//     headers: {
//       Authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache,
// });

// export default client;

import { ApolloClient, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cache from './cache';

let uri: any;

if (process.env.NODE_ENV === 'production') {
  // uri = "https://grocery-max-server.onrender.com/graphql";
  // uri = "https://grocery-max-server.onrender.com/graphql";
  uri = 'http://grocery-max-server.asifulmridul.xyz/graphql';
} else {
  uri = 'http://localhost:5000/graphql';
}

const httpLink = createHttpLink({
  uri,
});

const authLink = setContext(() => {
  const token =
    typeof window !== 'undefined' && sessionStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

export default client;

// export const withApollo = createWithApollo(apolloClient);

//   uri: "https://api.graph.cool/simple/v1/cixmkt2ul01q00122mksg82pn",
