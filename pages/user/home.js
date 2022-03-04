import { useState } from "react";
import { Layout } from "antd";
const { Header, Footer, Content } = Layout;
import Page from "../components/Homepage";
import { SidePane } from "../components/Sider";
import Cookies from "js-cookie";

export default () => {
  const init = { title: "This is my dashboard, walay mag buot" };
  const [page, setPage] = useState(init);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <SidePane setPage={setPage} />
        <Content>
          <Page {...page} />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};
