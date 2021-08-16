import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";

export const AppContext = createContext({});

export function useAppContext() {
  return useContext(AppContext);
}

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

export function AppContextProvider(_a) {
  var { children } = _a,
    contextProps = __rest(_a, ["children"]);
  const [context, setContextState] = useState(contextProps || null);
  const setContext = useCallback((context) => {
    setContextState((currentContext) =>
      Object.assign(Object.assign(Object.assign({}, currentContext), context), {
        playgroundContext: Object.assign(
          Object.assign(
            {},
            currentContext === null || currentContext === void 0
              ? void 0
              : currentContext.playgroundContext
          ),
          context === null || context === void 0
            ? void 0
            : context.playgroundContext
        ),
      })
    );
  }, []);
  return React.createElement(
    AppContext.Provider,
    {
      value: Object.assign(
        Object.assign(
          { apiUrl: null, schemaVersion: 0, ready: false },
          context
        ),
        {
          token:
            (context === null || context === void 0 ? void 0 : context.token) ||
            null,
          playgroundContext:
            (context === null || context === void 0
              ? void 0
              : context.playgroundContext) || {},
          setContext,
        }
      ),
    },
    children
  );
}

export function AppContextConsumer({ onReady }) {
  const context = useAppContext();
  useEffect(() => {
    onReady(context);
  }, [context]);
  return null;
}
