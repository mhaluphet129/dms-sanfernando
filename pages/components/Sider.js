import { Menu, Layout, Typography, Row, Col } from "antd";
import { AdminAddForm } from "./Admin/AdminForm";
import AdminList from "./Admin/AdminList";
import RecentTable from "./Admin/RecentTable";
import FarmersAddForm from "./Clients/Farmers/AddForm";
import AddForm from "./Clients/AddForm";
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
                  <Col span={6}></Col>
                  <Col span={16}>
                    <RecentTable />
                  </Col>
                </Row>
              ),
            })
          }
        >
          Admins
        </Menu.Item>
        <Menu.SubMenu key='3' title='Clients'>
          <Menu.Item
            key='a'
            onClick={() => {
              setPage({
                children: (
                  <>
                    <FarmersAddForm />
                  </>
                ),
              });
            }}
          >
            Farmers
          </Menu.Item>
          <Menu.Item key='b'>Fisheries</Menu.Item>
          <Menu.Item
            key='c'
            onClick={() => {
              setPage({
                children: (
                  <>
                    <AddForm />
                  </>
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
