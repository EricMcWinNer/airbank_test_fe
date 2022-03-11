import { createApp, provide, h } from 'vue'
import { provideApolloClient } from '@vue/apollo-composable'
import App from "./App.vue";
import router from "./router";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/',
})

// Cache implementation
const cache = new InMemoryCache({
    addTypename: false
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp({
    setup () {
        provideApolloClient(apolloClient)
    },
  
    render: () => h(App),
  })

app.use(router);

app.mount("#app");
