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

export default () => {
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
