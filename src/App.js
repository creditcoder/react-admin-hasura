import React, { useState, useEffect } from "react";

import { Admin, Resource } from "react-admin";
import polyglotI18nProvider from "ra-i18n-polyglot";
import { TodoList, TodoEdit, TodoCreate } from "./todos";
import "./App.css";
import authProvider from "./authProvider";
import { UserList, UserShow } from "./users";
import buildHasuraProvider from "ra-data-hasura-graphql";
import themeReducer from "./themeReducer";
import { Login, Layout } from "./layout";
import { Dashboard } from "./dashboard";
import PostIcon from "@material-ui/icons/Book";
import UserIcon from "@material-ui/icons/Group";

// import customRoutes from "./routes";
import englishMessages from "./i18n/en";

// const uri = "https://low-code-api.herokuapp.com/v1/graphql";
const uri = "https://fitness-service.herokuapp.com/v1/graphql";

const i18nProvider = polyglotI18nProvider(locale => {
  if (locale === "es") {
    return import("./i18n/es").then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
}, "en");

const headers = {
  "content-type": "application/json",
  authorization: "bearer <token>"
};
const App = async () => {
  const hasuraDataProvider = await buildHasuraProvider({
    clientOptions: { uri: uri }
  });

  return () => (
    <Admin
      dataProvider={hasuraDataProvider}
      customReducers={{ theme: themeReducer }}
      // customRoutes={customRoutes}
      // authProvider={authProvider}
      // dashboard={Dashboard}
      // loginPage={Login}
      // layout={Layout}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="todos"
        icon={PostIcon}
        list={TodoList}
        edit={TodoEdit}
        create={TodoCreate}
      />
      <Resource name="users" icon={UserIcon} list={UserList} show={UserShow} />
    </Admin>
  );
};

export default App;
