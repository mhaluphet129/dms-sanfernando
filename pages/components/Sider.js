import { Menu, Layout, Typography, Row, Col } from "antd";
import { AdminAddForm } from "./Admin/AdminForm";
import AdminList from "./Admin/AdminList";
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
              children: (
                <Row justify='space-around'>
                  <Col span={6}>
                    <AdminAddForm />
                  </Col>
                  <Col span={16}>
                    <AdminList />
                  </Col>
                </Row>
              ),
            })
          }
        >
          Admins
        </Menu.Item>
        <Menu.SubMenu key='4' title='User'></Menu.SubMenu>
        <Menu.SubMenu key='5' title='Team'>
          <Menu.Item key='a'>Team 1</Menu.Item>
          <Menu.Item key='b'>Team 2</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key='6'>Files</Menu.Item>
      </Menu>
    </Sider>
  );
};
