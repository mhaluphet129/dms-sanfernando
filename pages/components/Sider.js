import { Menu, Layout, Typography, Row, Col } from "antd";
import Admin from "../components/Admin/Admin";
// import Dashboard from "../components/dashboard";
import Livelihood from "./Livelihood/AddForm";
const { Sider } = Layout;

export const SidePane = ({ setPage }) => {
  return (
    <Sider collapsible theme='light'>
      <div
        style={{
          width: "90%",
          margin: "3% 5%",
          textAlign: "center",
          backgroundColor: "#eee",
          paddingBottom: 30,
          paddingTop: 30,
        }}
      >
        <Typography.Text keyboard>LOGO</Typography.Text>
      </div>
      <Menu defaultSelectedKeys={["1"]} mode='inline'>
        <Menu.Item
          key='1'
          onClick={() => {
            setPage({
              children: <>TEST</>,
            });
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key='2'
          onClick={() =>
            setPage({
              children: <Admin />,
            })
          }
        >
          Admins
        </Menu.Item>
        <Menu.SubMenu key='3' title='Clients'>
          <Menu.Item key='a'>Farmers</Menu.Item>
          <Menu.Item key='b'>Fisheries</Menu.Item>
          <Menu.Item
            key='c'
            onClick={() => {
              setPage({
                children: (
                  <div style={{ margin: 10 }}>
                    <Livelihood />
                  </div>
                ),
              });
            }}
          >
            Add
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </Sider>
  );
};
