I need you to be my partner developing code for a project I will provide you with the readme requirements for it and the idea I'll be working on
------------------------------------------------------------------------------------------------------------------------------------------------------------------

# 23 Final Project: MERN Stack Single-Page Application

Projects have played a key role in your journey to becoming a full-stack web developer. As you apply for development jobs, your portfolio is absolutely vital to opening doors to opportunities. Your portfolio showcases high-quality deployed examples of your work, and you can use your finished projects for that very purpose.

This project is a fantastic opportunity to show employers your collaborative skills and coding abilities, especially in the context of a scalable, user-focused MERN app. Remember that employers want to see what you can do, but they also want to see how you work with other developers. The more examples of deployed collaborative work you have in your portfolio, the more likely you are to get an interview and a job.

## Project Requirements

Your group will use everything you’ve learned throughout this course to create a MERN stack single-page application that works with real-world data to solve a real-world challenge, with a focus on data and user demand. This project will provide you with the best opportunity to demonstrate your problem-solving skills, which employers will want to see during interviews. Once again, the user story and acceptance criteria will depend on the project that you create, but your project must fulfill the following requirements:

* Use React for the front end.

* Use GraphQL with a Node.js and Express.js server.

* Use MongoDB and the Mongoose ODM for the database.

* Use queries and mutations for retrieving, adding, updating, and deleting data.

* Be deployed using Heroku (with data).

* Have a polished UI.

* Be responsive.

* Be interactive (i.e., accept and respond to user input).

* Include authentication (JWT).

* Protect sensitive API key information on the server.

* Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, high-quality comments, etc.).

* Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

### CSS Styling

Instead of using a CSS library like Bootstrap, consider one of the following suggestions:

* Look into the concept of CSS-in-JS, which abstracts CSS to the component level, using JavaScript to describe styles in a declarative and maintainable way. Some popular libraries include [styled-components](https://styled-components.com/) and [Emotion](https://emotion.sh/docs/introduction).

* Try using a component library, such as [Semantic UI](https://semantic-ui.com/), [Chakra UI](https://chakra-ui.com/), or [Ant Design](https://ant.design/).

* Create all the CSS for your application just using CSS.

Ultimately, it doesn't matter which of these options you choose&mdash;it just needs to look professional and be mobile-friendly.

### Payment Platform

Consider integrating the Stripe payment platform. Even if you don’t create an e-commerce application, you could set up your site to accept charitable donations.

### Bonus

Although this is not a requirement for your project, see if you can also implement functionality to meet the minimum requirements of a PWA:

* Uses a web manifest

* Uses a service worker for offline functionality

* Is installable

## Presentation Requirements

Use this [project presentation template](https://docs.google.com/presentation/d/10QaO9KH8HtUXj__81ve0SZcpO5DbMbqqQr4iPpbwKks/edit?usp=sharing) to address the following:

* Elevator pitch: a one minute description of your application

* Concept: What is your user story? What was your motivation for development?

* Process: What were the technologies used? How were tasks and roles broken down and assigned? What challenges did you encounter? What were your successes?

* Demo: Show your stuff!

* Directions for Future Development

* Links to the deployed application and the GitHub repository. Use the [Guide to Deploy with Heroku and MongoDB Atlas](https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-heroku-and-mongodb-atlas) on The Full-Stack Blog if you need a reminder on how to deploy to Heroku.

## Grading Requirements

This project is graded based on the following criteria:

### Technical Acceptance Criteria: 25%

* Satisfies the following code requirements:

  * Application uses React for the front end.

  * Application has a GraphQL API with a Node.js and Express.js server, and uses queries and mutations for retrieving, adding, updating, and deleting data.

  * Application uses MongoDB and the Mongoose ODM for the database and protects sensitive API key information on the server.

  * Application includes user authentication using JWT.

### Concept 10%

* Application should be a unique and novel idea.

* Your group should clearly and concisely articulate your project idea.

### Deployment: 20%

* Application deployed at live URL on Heroku and loads with no errors.

* Application GitHub URL submitted.

### Repository Quality: 10%

* Repository has a unique name.

* Repository follows best practices for file structure and naming conventions.

* Repository follows best practices for class and id naming conventions, indentation, quality comments, etc.

* Repository contains multiple descriptive commit messages.

* Repository contains a high-quality README file with description, screenshot, and link to deployed application.

### Application Quality: 15%

* Application user experience is intuitive and easy to navigate.

* Application user interface style is clean and polished.

* Application is responsive.

### Presentation 10%

* Your group should present using a slide deck.

* Every group member should speak during the presentation.

* Your presentation should follow the [Project Presentation Template](https://docs.google.com/presentation/d/10QaO9KH8HtUXj__81ve0SZcpO5DbMbqqQr4iPpbwKks/edit?usp=sharing).

### Collaboration 10%

* There are no major disparities in the number of GitHub contributions between group members.

### Bonus

Fulfilling all three of the following requirements to turn your app into a PWA will add 10 points to your grade. Note that the highest grade you can achieve is still a 100:

* Uses a web manifest

* Uses a service worker for offline functionality

* Is installable

## How to Submit Your MERN Stack Single-Page Application

**Each member of your group** is required to submit the following for review:

* The URL of the deployed application.

* The URL of the GitHub repository, with a unique name and a README describing the project.

my idea is building a  simple parking lot page and I'll share with you what do I want it to do
now after reviewing the requirements and my project idea I'll share with you the code I have till now and move forward till we finish the whole project
----------------------------------------------------------------------------------------------------------------------------------------------------------------

server side code
1.package.json
{
  "name": "parking-lot",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "watch": "nodemon server.js",
    "seed": "node config/seeds.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "apollo-server-express": "^4.7.2",
    "bcrypt": "^4.0.1",
    "cors": "^2.8.5",
    "dotenv": "^16.0.1",
    "express": "^4.17.2",
    "graphql": "^16.6.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^7.0.2",
    "stripe": "^8.67.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.2"
  }
}
2.server.js
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Start Apollo Server and apply middleware
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use('/images', express.static(path.join(__dirname, '../client/images')));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // MongoDB connection event listeners
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });

  db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
};

// Call the async function to start the server
startApolloServer();

3. .env
PORT=3001
DB_URI=mongodb://localhost:27017/myParkingLotApp
JWT_SECRET=mysecretkey

4. utils/auth.js
require('dotenv').config();
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = '12h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  signToken: function ({ username, _id }) {
    const payload = { username, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};

5. config/connection.js
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/myParkingLotApp');

module.exports = mongoose.connection;

after you review those files I will share the modals, schemas and other files
------------------------------------------------------------------------------------------------------------------------------

great 
now 
6. modals
index.js
const User = require('./User');
const ParkingSpace = require('./ParkingSpace')

module.exports = { User, ParkingSpace };

User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
}, {
  timestamps: true // Add timestamps to record createdAt and updatedAt
});

userSchema.pre('save', async function(next) {
  try {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

ParkingSpace.js
const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  customerName: {
    type: String,
    default: ''
  },
  customerContact: {
    type: String,
    default: ''
  },
  carMake: {
    type: String,
    default: '',
  },
  carModel: {
    type: String,
    default: '',
  },
  parkedAt: {
    type: Date,
    default: null
  },
  leftAt: {
    type: Date,
    default: null
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  hourlyRate: {
    type: Number,
    default: 10
  }
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;

review those and then I'll share the schemas
----------------------------------------------------------------------------------------------------------------------------------------------

schemas

index.js
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = { typeDefs, resolvers };

typeDefs.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
  }

  type ParkingSpace {
    _id: ID
    name: String
    customerName: String
    customerContact: String
    carMake: String
    carModel: String
    parkedAt: String
    leftAt: String
    isOccupied: Boolean
    hourlyRate: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    parkingSpaces: [ParkingSpace]
    parkingSpace(name: String!): ParkingSpace
  }

  type PaymentResult {
    success: Boolean
    chargeId: String
  }

  type Mutation {
    login(username: String!, password: String!): Auth
    addUser(username: String!, password: String!): Auth
    addParkingSpace(name: String!): ParkingSpace
    updateParkingSpace(name: String!, carOwnerName: String, carMake: String, carModel: String): ParkingSpace
    removeCarFromParkingSpace(name: String!): ParkingSpace
    updateHourlyRate(name: String!, hourlyRate: Float!): ParkingSpace
    processPayment(name: String!, hours: Int!, sourceToken: String!): PaymentResult
  }
`;

module.exports = typeDefs;

resolvers.js

const { User, ParkingSpace } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    // Get all parking spaces
    parkingSpaces: async () => {
      return await ParkingSpace.find();
    },
    // Get a single parking space by name
    parkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOne({ name });
    },
    // Get the logged-in user
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    // User login
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add new user
    addUser: async (parent, { username, password }) => {
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error('User already exists with this username');
      }

      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },

    // Add a new parking space
    addParkingSpace: async (parent, { name }) => {
      // Check if parking space already exists
      const existingSpace = await ParkingSpace.findOne({ name });
      if (existingSpace) {
        throw new Error('Parking space already exists with this name');
      }

      return await ParkingSpace.create({ name });
    },

    // Update a parking space with car and customer details
    updateParkingSpace: async (parent, { name, customerName, customerContact, carMake, carModel }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        { customerName, customerContact, carMake, carModel, parkedAt: new Date(), isOccupied: true },
        { new: true }
      );
    },

    // Remove a car from a parking space
    removeCarFromParkingSpace: async (parent, { name }) => {
      return await ParkingSpace.findOneAndUpdate(
        { name },
        {
          customerName: '',
          customerContact: '',
          carMake: '',
          carModel: '',
          parkedAt: null,
          leftAt: new Date(),
          isOccupied: false
        },
        { new: true }
      );
    },

    // Process payment (Stripe integration)
processPayment: async (parent, { name, hours, sourceToken }, context) => {
  if (!context.user) {
    throw new AuthenticationError('Not logged in');
  }

  const parkingSpace = await ParkingSpace.findOne({ name });
  if (!parkingSpace || !parkingSpace.isOccupied) {
    throw new Error('Parking space not occupied');
  }

  if (hours <= 0) {
    throw new Error('Invalid hours');
  }

  const amount = parkingSpace.hourlyRate * hours * 100; // Amount in cents

  try {
    // Create Stripe charge
    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source: sourceToken,
      description: `Charge for ${hours} hours at ${parkingSpace.name}`,
    });

    // Update parking space status
    await ParkingSpace.findOneAndUpdate(
      { _id: parkingSpace._id },
      {
        isOccupied: false,
        leftAt: new Date()
      }
    );

    return { success: true, chargeId: charge.id };
  } catch (error) {
    // Handle Stripe errors or other errors appropriately
    console.error('Payment processing error:', error);
    throw new Error('Payment processing failed');
  }
},

  },
};

module.exports = resolvers;

review those then I will have another 2 files 
-----------------------------------------------------------------------------------------------------------------------------------------

ok now 
config/cleanDB.js

const mongoose = require('mongoose');

module.exports = async (collectionName) => {
  try {
    const collections = await mongoose.connection.db.listCollections({ name: collectionName }).toArray();

    if (collections.length > 0) {
      await mongoose.connection.db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
};

seeds.js

const db = require('./connection');
const { User, ParkingSpace } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Clean existing data
    await cleanDB('users');
    await cleanDB('parkingspaces');

    // Seed Users
    await User.create([
      {
        username: 'Sal',
        password: 'password123'
      },
      {
        username: 'Amiko',
        password: 'password123'
      }
    ]);
    console.log('Users seeded');

    // Seed Parking Spaces
    await ParkingSpace.create([
      { name: 'A1', hourlyRate: 10 },
      { name: 'A2', hourlyRate: 12, isOccupied: true, customerName: 'John', customerContact: '1234567890', carMake: 'Toyota', carModel: 'Camry' },
      { name: 'B1', hourlyRate: 8 },
      { name: 'B2', hourlyRate: 15, isOccupied: true, customerName: 'Adam', customerContact: '1234567890', carMake: 'Honda', carModel: 'civic' },
    ]);
    console.log('Parking spaces seeded');

  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1); // Exit with error code
  }

  process.exit();
});

review those and if they are all fine let's move to the frontend side code
-------------------------------------------------------------------------------------------------------------------------------------------------------

all those file in the utils folder on the frontend side

1. auth.js

import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();

2. helpers.js

export function formatDateTime(dateTime) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '12', minute: '2-digit' };
    return new Date(dateTime).toLocaleDateString('en-US', options);
  }
  
  export function calculateParkingFee(hours, rate) {
    return hours * rate;
  }


3. GlobalState.jsx

import { createContext, useContext, useReducer } from "react";
import { reducer } from './reducers'

const StoreContext = createContext();
const { Provider } = StoreContext;

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    parkingSpaces: [],   // Array of parking spaces
    currentUser: null,   // Current logged-in user
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };

4. actions.js

export const SET_PARKING_SPACES = 'SET_PARKING_SPACES';
export const UPDATE_PARKING_SPACE = 'UPDATE_PARKING_SPACE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const LOGOUT_USER = 'LOGOUT_USER';

// Action creators:

export const setParkingSpaces = (parkingSpaces) => ({
  type: SET_PARKING_SPACES,
  parkingSpaces,
});

export const updateParkingSpace = (space) => ({
  type: UPDATE_PARKING_SPACE,
  space,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  user,
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

5. reducers.js

import {
    SET_PARKING_SPACES,
    UPDATE_PARKING_SPACE,
    SET_CURRENT_USER,
    LOGOUT_USER
  } from './actions';
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case SET_PARKING_SPACES:
        return {
          ...state,
          parkingSpaces: [...action.parkingSpaces],
        };
  
      case UPDATE_PARKING_SPACE:
        return {
          ...state,
          parkingSpaces: state.parkingSpaces.map((space) => {
            if (action.space._id === space._id) {
              return action.space;
            }
            return space;
          }),
        };
  
      case SET_CURRENT_USER:
        return {
          ...state,
          currentUser: action.user,
        };
  
      case LOGOUT_USER:
        return {
          ...state,
          currentUser: null,
        };
  
  
      default:
        return state;
    }
  };
     review those and then I'll share mutations and queries
  --------------------------------------------------------------------------------------------------------------------------------------------------------

  now lets move on the mutations.js

  import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_PARKING_SPACE = gql`
  mutation updateParkingSpace($name: String!, $customerName: String, $customerContact: String, $carMake: String, $carModel: String) {
    updateParkingSpace(name: $name, customerName: $customerName, customerContact: $customerContact, carMake: $carMake, carModel: $carModel) {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      isOccupied
    }
  }
`;


export const REMOVE_CAR_FROM_PARKING_SPACE = gql`
  mutation removeCarFromParkingSpace($name: String!) {
    removeCarFromParkingSpace(name: $name) {
      _id
      name
      customerName
      customerContact
      isOccupied
    }
  }
`;


export const PROCESS_PAYMENT = gql`
  mutation processPayment($name: String!, $hours: Int!, $sourceToken: String!) {
    processPayment(name: $name, hours: $hours, sourceToken: $sourceToken) {
      success
      chargeId
    }
  }
`;

queries.js

import { gql } from '@apollo/client';

export const GET_PARKING_SPACES = gql`
  query parkingSpaces {
    parkingSpaces {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      leftAt
      isOccupied
      hourlyRate
    }
  }
`;

export const GET_SINGLE_PARKING_SPACE = gql`
  query parkingSpace($name: String!) {
    parkingSpace(name: $name) {
      _id
      name
      customerName
      customerContact
      carMake
      carModel
      parkedAt
      leftAt
      isOccupied
      hourlyRate
    }
  }
`;


export const GET_CURRENT_USER = gql`
  query me {
    me {
      _id
      username
    }
  }
`;

review those if everything is fine let's move forward I'll share the other files I have
-----------------------------------------------------------------------------------------------------------------------------------------------------
now let's work on the main.jsx, App.jsx, pages and components
I'll share what I have till now for those

Step 1: Setting Up main.jsx and App.jsx

Step 2: Creating a Navigation Bar
The navigation bar should include:

The parking lot name.
The current date and time.
A logout button (visible after login).
A '+' icon to add parking spaces (visible after login).
You can use Bootstrap for styling the navigation bar. Bootstrap's navbar component would be ideal for this.

Step 3: Implementing Authentication Flow
Login Page: The default view when the user is not logged in. It should have a form for username and password.
Dashboard: After successful login, the user should be directed to the dashboard. The dashboard will have the navigation bar and the main content area.
Step 4: Dashboard Functionalities
Adding Parking Spaces: The '+' icon on the navbar should open a sidebar or a modal where the employee can add a new parking space.
Displaying Parking Spaces: Show parking spaces as cards, each card displaying an image, the parking space name, and options to add car and customer info.
Checkout and Receipt: Implement functionality to checkout a car, which should lead to a receipt page displaying the parking fee and other details.
Implementation Steps:
Setup Routing: Use React Router to manage navigation between the login page, dashboard, and receipt page.

Create Components:

Navigation Bar
Login Form
Dashboard
Add Parking Space Form (Sidebar or Modal)
Parking Space Card
Checkout/Receipt Page
State Management: Use Redux or React Context API for managing the application state, such as the current user, parking spaces, etc.

Data Fetching and Updating: Use Apollo Client to fetch data from and mutate data on your GraphQL server.

Styling: Use Bootstrap for CSS styling to make the UI responsive and visually appealing.

------------------------------------------------------------------------------------------------------------------------------------------

main.jsx 

import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard.jsx';
import Checkout from './pages/Checkout';
import NoMatch from './pages/NoMatch';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NoMatch />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/checkout',
        element: <Checkout />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

does it needs any modifications if not I'll share the app.jsx
---------------------------------------------------------------------------------------------------------------------------------------

app.jsx

import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import { useStoreContext } from './utils/GlobalState';
import AuthService from './utils/auth';
import { setCurrentUser, logoutUser } from './utils/actions';

// Setup Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const navigate = useNavigate();
  const [, dispatch] = useStoreContext();

  useEffect(() => {
    if (AuthService.loggedIn()) {
      // Update global state with current user
      const user = AuthService.getProfile();
      dispatch(setCurrentUser(user));
    } else {
      navigate('/');
      // Dispatch logout action to update global state
      dispatch(logoutUser());
    }
  }, [navigate, dispatch]);

  return (
    <ApolloProvider client={client}>
        <Nav />
        <Outlet />
    </ApolloProvider>
  );
}

export default App;

---------------------------------------------------------------------------------------------------------------------------

Nav.jsx component

import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { logoutUser } from '../utils/actions';
import AuthService from '../utils/auth';

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();

  // Function to get current date and time in a formatted string
  const getCurrentDateTime = () => {
    return new Date().toLocaleString();
  };

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logoutUser());
    navigate('/');
  };

  const renderAddParkingSpaceButton = () => {
    if (state.currentUser) {
      // Placeholder for the functionality to add a parking space
      const handleAddParkingSpace = () => {
        // Implement the logic or navigate to the form/modal
      };

      return (
        <button className="btn btn-primary mr-2" onClick={handleAddParkingSpace}>
          +
        </button>
      );
    }
  };

  const renderAuthLinks = () => {
    if (state.currentUser) {
      return (
        <>
          <span className="navbar-text mr-2">
            Welcome, {state.currentUser.username}
          </span>
          {renderAddParkingSpaceButton()}
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link className="btn btn-primary mr-2" to="/signup">
            Signup
          </Link>
          <Link className="btn btn-secondary" to="/">
            Login
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/dashboard">
        Parking Lot Manager
      </Link>
      <div className="navbar-text ml-auto mr-2">
        {getCurrentDateTime()}
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            {renderAuthLinks()}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;










import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../utils/GlobalState';
import { logoutUser } from '../utils/actions';
import AuthService from '../utils/auth';
import decode from 'jwt-decode';
import { useMutation } from '@apollo/client';
import { ADD_PARKING_SPACE } from '../utils/mutations';
import '../style/Navbar.css';

const Nav = () => {
  const [state, dispatch] = useStoreContext();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [parkingSpaceName, setParkingSpaceName] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const [addParkingSpace] = useMutation(ADD_PARKING_SPACE, {
    refetchQueries: ['GET_USER_PARKING_SPACES'],
  });
  const [currentTime, setCurrentTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDateTime() {
    return new Date().toLocaleString();
  }

  const handleLogout = () => {
    AuthService.logout();
    dispatch(logoutUser());
    navigate('/');
  };

  const handleAddParkingSpaceClick = () => {
    setShowModal(true);
    setErrorMessage('');
  };

  const handleAddParkingSpaceSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const token = AuthService.getToken();
    const decoded = token ? decode(token) : null;
    const userId = decoded?.data?._id;

    if (!userId) {
      setErrorMessage("Error: User ID is not available.");
      return;
    }

    try {
      await addParkingSpace({
        variables: {
          name: parkingSpaceName,
          hourlyRate: 10.0,
          userId: userId
        },
      });
      setParkingSpaceName('');
      setShowModal(false);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage('Error: A parking space with this name already exists.');
    }
  };
  
  const renderAuthButtons = () => {
    if (state.currentUser) {
      return (
        <div className="auth-buttons">
          <Link className="btn btn-outline-light" to="/dashboard">
            Dashboard
          </Link>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="auth-buttons">
          <Link className="btn btn-outline-light" to="/signup">
            Signup
          </Link>
          <Link className="btn btn-outline-light" to="/">
            Login
          </Link>
        </div>
      );
    }
  };

  const renderAddParkingSpaceButton = () => {
    if (state.currentUser) {
      return (
        <>
          <button className="btn btn-outline-light add-space-btn" onClick={handleAddParkingSpaceClick}>
            +
          </button>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={() => setShowModal(false)}>
                  &times;
                </span>
                <form onSubmit={handleAddParkingSpaceSubmit}>
                  <label htmlFor="parkingSpaceName">Parking Space Name:</label>
                  <input
                    type="text"
                    id="parkingSpaceName"
                    value={parkingSpaceName}
                    onChange={(e) => setParkingSpaceName(e.target.value)}
                    required
                  />
                  <button type="submit">Add Parking Space</button>
                </form>
              </div>
            </div>
          )}
        </>
      );
    }
    return null;
  };

  return (
    <nav className="navbar custom-nav-bg">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {state.currentUser && renderAddParkingSpaceButton()}
      <div className="nav-center">
        <h1 className="navbar-brand">Parking Lot Manager</h1>
        <div className="navbar-text">{currentTime}</div>
  </div>
  {renderAuthButtons()}
</nav>
  );
};

export default Nav;
