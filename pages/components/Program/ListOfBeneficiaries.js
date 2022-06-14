import { useState, useEffect, useRef } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Table,
  Tooltip,
  AutoComplete,
  Popconfirm,
  notification,
  message,
} from "antd";
import axios from "axios";

import titleText from "../../assets/js/TitleText";

export default ({
  programListModal,
  setProgramListModal,
  id,
  setId,
  title,
}) => {
  const [addClientModal, setAddClientModal] = useState(false);
  const [loader, setLoader] = useState("");
  const [list, setList] = useState();
  const [selected, setSelected] = useState();
  const timerRef = useRef(null);

  const [names, setSearchNames] = useState();
  const [trigger, setTrigger] = useState(1);

  const color = {
    Farmer: "green",
    Farmworker: "cyan",
    Fisherfolk: "blue",
  };

  const columns = [
    {
      title: "Name",
      render: (_, row) => (
        <Tooltip title='Click to view full profile.'>
          <a href='#' arial-label='full profile'>
            {titleText(`${row.name.name} ${row.name.lastName}`)}
          </a>
        </Tooltip>
      ),
    },
    // {
    //   title: "Date Availed",
    //   render: (_, row) => "sunod nani",
    // },
    {
      title: "Address",
      render: (_, row) => row?.address?.street + ", " + row?.address?.barangay,
    },
    {
      title: "Contact",
      render: (_, row) => row?.contactNum,
    },
    {
      title: "Type",
      align: "center",
      render: (_, row) => (
        <Space direction='vertical'>
          {row?.profile?.type.map((el, i) => (
            <Tag key={i} color={color[el]}>
              {el}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (_, row) => (
        <Popconfirm
          title='Are you sure to remove this person?'
          onConfirm={async () => {
            let { data } = await axios.get("/api/programs", {
              params: {
                mode: "remove-to-programs",
                livelihoodID: row?._id,
                programsID: id,
              },
            });

            if (data.success) setTrigger(trigger + 1);
          }}
          okText='Yes'
          cancelText='No'
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  const searchName = async (searchKeyword) => {
    let { data } = await axios.get("/api/programs", {
      params: {
        mode: "fetch-search",
        searchWord: searchKeyword,
      },
    });

    if (data.success) {
      data.data.map((el) => {
        setSearchNames((el2) => [
          ...el2,
          { value: `${el.name.name} ${el.name.lastName}`, id: el?._id },
        ]);
      });
    }
  };

  const runTimer = (searchKeyword) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(function () {
      searchName(searchKeyword);
    }, 500);
  };

  const handleAddProgram = async () => {
    if (Object.keys(selected).length > 0) {
      let { data } = await axios.post("/api/programs", {
        payload: {
          mode: "add-to-programs",
          programID: id,
          livelihoodID: selected.id,
          name: title,
        },
      });

      if (data.success) {
        setAddClientModal(false);
        notification["success"]({
          placement: "bottomRight",
          description: data.message,
        });
        setTrigger(trigger + 1);
      } else
        notification["error"]({
          placement: "bottomRight",
          description: data.message,
        });
    } else message.error("Select a profile is a must.");
  };

  useEffect(async () => {
    if (programListModal) {
      setLoader("fetch-list");
      let { data } = await axios.get("/api/programs", {
        params: {
          mode: "fetch-list",
          id,
        },
      });

      if (data.success) {
        setList(data.data);
        setLoader("");
      }
    }
  }, [programListModal, trigger]);

  return (
    /* modal for list of beneficiaries */
    <Modal
      visible={programListModal}
      width={800}
      closable={false}
      okButtonProps={{ style: { display: "none" } }}
      title={
        <>
          <Row>
            <Col span={12}>
              <Typography.Title level={5}>{title}</Typography.Title>
            </Col>
            <Col span={12}>
              <Button
                style={{ width: 130, float: "right" }}
                onClick={() => setAddClientModal(true)}
              >
                Add Client
              </Button>
            </Col>
          </Row>
        </>
      }
      onCancel={() => {
        setProgramListModal(false);
        setId("");
      }}
      destroyOnClose={true}
    >
      <Table
        columns={columns}
        dataSource={list}
        loading={loader == "fetch-list"}
        scroll={{ y: 400 }}
      />

      {/* modal to add client*/}
      <Modal
        visible={addClientModal}
        width={500}
        closable={false}
        title='Add CLient'
        destroyOnClose
        footer={null}
        onCancel={() => {
          setAddClientModal(false);
        }}
      >
        <Space
          direction='vertical'
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AutoComplete
            style={{
              width: 450,
            }}
            options={names}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            onChange={(_, e) => {
              setSelected(e);
              setSearchNames([]);
              runTimer(_);
            }}
            allowClear
          />
          <Button style={{ width: 130 }} onClick={handleAddProgram}>
            ADD
          </Button>
        </Space>
      </Modal>
      {/* end add client modal */}
    </Modal>
  );
};
