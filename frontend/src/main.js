import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import 'bulma/css/bulma.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import './assets/styles/clock.css'
import './assets/styles/navbarIndex.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import Cookies from 'js-cookie'
import { ApolloLink, concat } from 'apollo-link'

// Cookies.withAttributes({sameSite: "none", secure: true})

// const httpLink = new HttpLink({
//   // URL to graphql server, you should use an absolute URL here
//   uri: 'https://exception-kmitl-backend.herokuapp.com/graphql',
//   credentials: "include"
// })

// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// })

const httpLink = new HttpLink({ uri: "https://exception-kmitl-backend.herokuapp.com/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
const tokenUser = Cookies.get('tokenUser');
const tokenAdmin = Cookies.get('tokenAdmin')
  operation.setContext({
    headers: {
      authorization: tokenUser ? `Bearer ${tokenUser}` : tokenAdmin ? `Bearer ${tokenAdmin}` : "",
    },
  });
  return forward(operation);
});
export const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

Vue.config.productionTip = false
Vue.use(VueSweetalert2)
Vue.use(Vuelidate)
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  // add router here
  router,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
