import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  Typography,
  Tooltip,
  Row,
  Col,
  Popconfirm,
  notification,
} from "antd";
import moment from "moment";
import axios from "axios";

import ListOfBeneficiaries from "./ListOfBeneficiaries";
import ViewProgam from "./ViewProgam";
import AddProgramForm from "./AddProgramForm";

export default () => {
  const [visible, setVisible] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [addProgramModal, setAddProgramModal] = useState(false);
  const [loader, setLoader] = useState("");
  const [data, setData] = useState();
  const [modalData, setModalData] = useState();
  const [listID, setListID] = useState();

  // trigger
  const [trigger, setTrigger] = useState(0);

  const handleRemoveProgram = async (id) => {
    let { data } = await axios.get("/api/programs", {
      params: {
        mode: "remove",
        id,
      },
    });

    if (data.success) {
      notification["success"]({
        placement: "bottomRight",
        description: data.message,
      });
      setTrigger(trigger + 1);
    }
  };

  const columns = [
    {
      title: "Name",
      render: (_, row) => (
        <Tooltip title='Click to view program details.'>
          <Button
            type='link'
            onClick={() => {
              setViewModal(true);
              setModalData(row);
            }}
          >
            {row?.name}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Date Created",
      render: (_, row) => moment(row?.createdAt).format("MMM DD, YYYY"),
    },
    {
      title: "Program In-charge",
      dataIndex: "inCharge",
      key: "inCharge",
    },
    {
      title: "No. of Benificiaries",
      align: "center",
      render: (_, row) => (
        <Tooltip title='Click to view list.'>
          <Button
            type='link'
            onClick={() => {
              setVisible(true);
              setListID(row?._id);
            }}
          >
            {row?.total}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      render: (_, row) => (
        <Typography.Text type={row?.status ? "success" : "danger"}>
          {row?.status ? "Active" : "Expired"}
        </Typography.Text>
      ),
    },
    {
      title: "Function",
      align: "center",
      render: (_, row) => (
        <Popconfirm
          title='Are you sure to remove this program?'
          onConfirm={() => handleRemoveProgram(row?._id)}
          okText='Yes'
          cancelText='No'
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(async () => {
    setLoader("fetching");
    let { data } = await axios.get("/api/programs", {
      params: {
        mode: "fetch",
      },
    });

    if (data.success) {
      setData(data.data);
      setLoader("");
    }
  }, [trigger]);

  return (
    <>
      <ListOfBeneficiaries
        programListModal={visible}
        setProgramListModal={setVisible}
        id={listID}
        setId={setListID}
      />
      <AddProgramForm
        visible={addProgramModal}
        setVisible={setAddProgramModal}
        cb={() => setTrigger(trigger + 1)}
      />
      <ViewProgam
        viewModal={viewModal}
        setViewModal={setViewModal}
        modalData={modalData}
        cb={() => setTrigger(trigger + 1)}
      />
      <Row>
        <Col span={12}>
          <Typography.Title level={4}>List of Program</Typography.Title>
        </Col>
        <Col span={12}>
          <Button
            style={{ width: 130, float: "right" }}
            onClick={() => setAddProgramModal(true)}
            type='primary'
          >
            Add Program
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        loading={loader == "fetching"}
        scroll={{ y: 500 }}
      />
    </>
  );
};
