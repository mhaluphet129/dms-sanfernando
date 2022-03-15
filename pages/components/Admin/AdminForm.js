import {
  Form,
  Typography,
  Input,
  Button,
  Space,
  Modal,
  Card,
  notification,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";

export const AdminAddForm = () => {
  return (
    <Card title='Add an admin' hoverable>
      <Form
        layout='horizontal'
        onFinish={async (val) => {
          if (!val.email) {
            notification["warning"]({
              message: "Input is empty",
            });
            return;
          }
          let { data } = await axios.post("/api/admin", {
            payload: {
              email: val.email,
              timeline: {
                time: moment(),
                label: "Account is created",
              },
            },
          });

          if (data.success) message.success(data.message);
          else message.error(data.message);
        }}
      >
        <Form.Item
          name='email'
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
          ]}
        >
          <Input type='email' placeholder='Enter an email...' allowClear />
        </Form.Item>
        <Form.Item>
          <Button style={{ width: "100%" }} type='primary' htmlType='submit'>
            Add Admin
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export const UpdateModal = ({ visible, onCancel, datas }) => {
  return (
    <Modal
      title={
        <>
          <Typography.Text>Update Admin</Typography.Text>
          <br />
          <Typography.Text type='secondary' style={{ fontSize: 12 }}>
            You can edit the email and the rest are required if they are empty
            in the system
          </Typography.Text>
        </>
      }
      visible={visible}
      footer={null}
      onCancel={() => onCancel()}
      destroyOnClose
    >
      <Form
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 18 }}
        layout='horizontal'
        onFinish={async (val) => {
          // let obj = { ...val, id: datas._id };
          // let { data } = await axios.put("/api/admin", {
          //   payload: obj,
          // });
          // if (data.success) {
          //   notification["success"]({
          //     message: data.message,
          //   });
          // } else message.error(data.message);
        }}
      >
        <Space direction='vertical' style={{ width: "100%" }}>
          <Form.Item name='email' label='Email'>
            <Input type='email' placeholder='Enter an email...' allowClear />
          </Form.Item>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: !datas?.name ? true : false }]}
          >
            <Input placeholder='Enter a name...' allowClear />
          </Form.Item>
          <Form.Item
            name='lastname'
            label='Last Name'
            rules={[{ required: !datas?.lastname ? true : false }]}
          >
            <Input placeholder='Enter a lastname...' allowClear />
          </Form.Item>
          <Form.Item
            name='username'
            label='Username'
            rules={[{ required: !datas?.username ? true : false }]}
          >
            <Input placeholder='Enter a username...' allowClear />
          </Form.Item>
          <Form.Item
            name='password'
            label='password'
            rules={[{ required: !datas?.password ? true : false }]}
          >
            <Input.Password placeholder='Enter a new password' />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 5,
              span: 18,
            }}
          >
            <Button style={{ width: "100%" }} type='primary' htmlType='submit'>
              Save
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
