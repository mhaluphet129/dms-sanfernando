import { Menu, Layout } from "antd";
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
        LOGO
      </div>
      <Menu defaultSelectedKeys={["1"]} mode='inline'>
        <Menu.Item
          key='1'
          onClick={() => {
            setPage({ title: "This is my dashboard, walay mag buot" });
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key='2'
          onClick={() => setPage({ title: "Mga admin ni diri ha" })}
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
