/* eslint-disable no-restricted-globals */
import React, { Component } from "react";
import {
  Layout,
  Button,
  Modal,
  Empty,
  Typography,
  Menu,
  Tree,
  Tabs,
  Alert,
} from "antd";

import { CubeLoader } from "./cubeloader";
import PrismCode from "./prismcode";
import { AppContextConsumer } from "./appcontext";

import "antd/dist/antd.css";

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

// import { AppContextConsumer } from '../../components/AppContext';
const { Content, Sider } = Layout;
const { TreeNode } = Tree;
const { TabPane } = Tabs;
const schemasMap = {};
const schemaToTreeData = (schemas) =>
  Object.keys(schemas).map((schemaName) => ({
    title: schemaName,
    key: schemaName,
    treeData: Object.keys(schemas[schemaName]).map((tableName) => {
      const key = `${schemaName}.${tableName}`;
      schemasMap[key] = [schemaName, tableName];
      return {
        title: tableName,
        key,
      };
    }),
  }));

export const playgroundAction = (name, options = {}) => {
  event("Playground Action", Object.assign({ name }, options));
};

export function playgroundFetch(url, options = {}) {
  const { retries = 0 } = options,
    restOptions = __rest(options, ["retries"]);
  return fetch(url, restOptions)
    .then(async (r) => {
      if (r.status === 500) {
        let errorText = await r.text();
        try {
          const json = JSON.parse(errorText);
          errorText = json.error;
        } catch (e) {
          // Nothing
        }
        throw errorText;
      }
      return r;
    })
    .catch((e) => {
      if (e.message === "Network request failed" && retries > 0) {
        return playgroundFetch(url, { options, retries: retries - 1 });
      }
      throw e;
    });
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      activeTab: "schema",
      files: [],
      isDocker: null,
    };
  }
  async componentDidMount() {
    await this.loadDBSchema();
    await this.loadFiles();
  }
  onExpand(expandedKeys) {
    playgroundAction("Expand Tables");
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck(checkedKeys) {
    playgroundAction("Check Tables");
    this.setState({ checkedKeys });
  }
  onSelect(selectedKeys) {
    this.setState({ selectedKeys });
  }
  async loadDBSchema() {
    this.setState({ schemaLoading: true });
    try {
      const res = await playgroundFetch("/playground/db-schema");
      const result = await res.json();
      this.setState({
        tablesSchema: result.tablesSchema,
      });
    } catch (e) {
      this.setState({ schemaLoadingError: e });
    } finally {
      this.setState({ schemaLoading: false });
    }
  }
  async loadFiles() {
    const res = await playgroundFetch("/playground/files");
    const result = await res.json();
    this.setState({
      files: result.files,
    });
  }
  async generateSchema() {
    const { checkedKeys, tablesSchema } = this.state;
    const { history } = this.props;
    playgroundAction("Generate Schema");
    const res = await playgroundFetch("/playground/generate-schema", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tables: checkedKeys
          .filter((k) => !!schemasMap[k])
          .map((e) => schemasMap[e]),
        tablesSchema,
      }),
    });
    if (res.status === 200) {
      playgroundAction("Generate Schema Success");
      await this.loadFiles();
      this.setState({ checkedKeys: [], activeTab: "files" });
      Modal.success({
        title: "Schema files successfully generated!",
        content: "You can start building the charts",
        okText: "Build",
        cancelText: "Close",
        okCancel: true,
        onOk() {
          history.push("/build");
        },
      });
    } else {
      playgroundAction("Generate Schema Fail", { error: await res.text() });
    }
  }
  selectedFileContent() {
    const file = this.selectedFile();
    return file && file.content;
  }
  selectedFile() {
    const { files, selectedFile } = this.state;
    return files.find((f) => f.fileName === selectedFile);
  }
  renderFilesMenu() {
    const { selectedFile, files } = this.state;
    return React.createElement(
      Menu,
      {
        mode: "inline",
        onClick: ({ key }) => {
          playgroundAction("Select File");
          this.setState({ selectedFile: key });
        },
        selectedKeys: selectedFile ? [selectedFile] : [],
      },
      files.map((f) =>
        React.createElement(Menu.Item, { key: f.fileName }, f.fileName)
      )
    );
  }
  render() {
    const {
      schemaLoading,
      schemaLoadingError,
      tablesSchema,
      selectedFile,
      expandedKeys,
      autoExpandParent,
      checkedKeys,
      selectedKeys,
      activeTab,
      isDocker,
    } = this.state;
    const renderTreeNodes = (data) =>
      data.map((item) => {
        if (item.treeData) {
          return (
            // @ts-ignore
            React.createElement(
              TreeNode,
              { title: item.title, key: item.key, dataRef: item },
              renderTreeNodes(item.treeData)
            )
          );
        }
        return React.createElement(TreeNode, Object.assign({}, item));
      });
    const renderTree = () =>
      Object.keys(tablesSchema || {}).length > 0
        ? React.createElement(
            Tree,
            {
              checkable: true,
              onExpand: this.onExpand.bind(this),
              expandedKeys: expandedKeys,
              autoExpandParent: autoExpandParent,
              onCheck: this.onCheck.bind(this),
              checkedKeys: checkedKeys,
              onSelect: this.onSelect.bind(this),
              selectedKeys: selectedKeys,
            },
            renderTreeNodes(schemaToTreeData(tablesSchema || {}))
          )
        : React.createElement(Alert, {
            message: "Empty DB Schema",
            description: "Please check connection settings",
            type: "warning",
          });
    const renderTreeOrError = () =>
      schemaLoadingError
        ? React.createElement(Alert, {
            "data-testid": "schema-error",
            message: "Error while loading DB schema",
            description: schemaLoadingError.toString(),
            type: "error",
          })
        : renderTree();
    return React.createElement(
      Layout,
      { style: { height: "100%" } },
      React.createElement(
        Sider,
        { width: 340, className: "schema-sidebar" },
        React.createElement(
          Tabs,
          {
            activeKey: activeTab,
            onChange: (tab) => this.setState({ activeTab: tab }),
            tabBarExtraContent: React.createElement(
              Button,
              {
                disabled: !checkedKeys.length,
                type: "primary",
                onClick: () => this.generateSchema(),
              },
              "Generate Schema"
            ),
          },
          React.createElement(
            TabPane,
            { tab: "Tables", key: "schema" },
            schemaLoading
              ? React.createElement(CubeLoader, null)
              : renderTreeOrError()
          ),
          React.createElement(
            TabPane,
            { tab: "Files", key: "files" },
            this.renderFilesMenu()
          )
        )
      ),
      React.createElement(
        Content,
        {
          style: {
            minHeight: 280,
            padding: 24,
          },
        },
        selectedFile &&
          React.createElement(Alert, {
            message: isDocker
              ? React.createElement(
                  "span",
                  null,
                  "Schema files are located and can be edited in the mount volume directory.",
                  " ",
                  React.createElement(
                    Typography.Link,
                    {
                      href: "https://cube.dev/docs/getting-started-cubejs-schema",
                      target: "_blank",
                    },
                    "Learn more about working with Cube.js data schema in the docs"
                  )
                )
              : React.createElement(
                  "span",
                  null,
                  "This file can be edited at\u00A0",
                  React.createElement("b", null, this.selectedFile().absPath)
                ),
            type: "info",
            style: { paddingTop: 10, paddingBottom: 11 },
          }),
        selectedFile
          ? React.createElement(PrismCode, {
              code: this.selectedFileContent(),
              style: {
                padding: 0,
                marginTop: 24,
              },
            })
          : React.createElement(Empty, {
              style: { marginTop: 50 },
              description: "Select tables to generate Cube.js schema",
            }),
        React.createElement(AppContextConsumer, {
          onReady: ({ playgroundContext }) =>
            this.setState({
              isDocker:
                playgroundContext === null || playgroundContext === void 0
                  ? void 0
                  : playgroundContext.isDocker,
            }),
        })
      )
    );
  }
}
