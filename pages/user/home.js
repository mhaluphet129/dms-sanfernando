import { useState } from "react";
import { Layout } from "antd";
const { Footer, Content } = Layout;
import Page from "../components/Page";
import { SidePane } from "../components/Sider";
import Cookies from "js-cookie";

export default () => {
  const [page, setPage] = useState();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <SidePane setPage={setPage} />
        <Content>
          <Page {...page} />
        </Content>
      </Layout>
    </Layout>
  );
};
