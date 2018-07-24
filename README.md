# react-firestore-mobx

[![Typescript Version](https://img.shields.io/badge/Typescript-2.8-2f69f4.svg?style=flat)](https://www.npmjs.com/package/next)
[![Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://prettier.io/)

A lightweight library to build a request-queue model for firebase functions, leveraging firestore as the centralised request API.

Simply create requests inside of a `requests` collection in firestore, and trigger corresponding cloud functions to handle the request's execution.

## Why?

Because GraphQL adds dependency, infrastructure, and cognitive overhead - but REST isn't descriptive or intuitive enough.

Because you want to use firestore as-per-usual for all downstream data queries, but use something powerful and flexible (`firestore-request`) as your single upstream mutation service. `firestore-request` allows your clients to use a _single_, consistent data API - firestore - without managing new infrastructure or new dependencies.

## How

Usage is simple and straightforward, and requires no more infrastructure setup than a Firebase Functions project, and a Firebase client.

### From the client

The client simply create a request object under a particular firestore collection. The client can optionally listen to the added request, to listen for `status` changes, or can simply attach watchers to the expected output - in this case, listen to all todos on the `todos` collection.

```
const request = {
  requestType: 'createTodo',
  payload: {
    name: 'Add firestore-request to your app!',
    dueDate: 1532410227,
    status: 'incomplete'
  }
};

firestore()
    .collection("requests")
    .doc("root")
    .collection(request.requestType)
    .add(request);
```

### From a Functions project

The functions request handler uses `firestore-request` to read the request payload, and handle whatever business logic needs to be executed. If the handler returns correctly or returns a resolved promise, `firestore-request` will mark the request `status` as `complete` - or else it will mark it as `failed`.

```
import { functions } from 'firestore-request';

const createTodo = functions
  .request('createTodo')
  .onRequest((params, context) => {
    const { payload } = params.data();

    return admin.firestore()
      .collection('todos')
      .add(payload);
  });
```

