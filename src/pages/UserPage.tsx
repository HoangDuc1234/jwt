import { Table } from "antd";
import { getUserApi } from "../util/api";
import { useEffect, useState } from "react";
import type { User } from "../util/api";
const UserPage = () => {
  const [dataSource, setDataSource] = useState<User[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserApi();
      console.log(res);
      if (res) {
        setDataSource(res as unknown as User[]);
      }
    };
    fetchUser();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];
  return (
    <div style={{ padding: "30px" }}>
      <Table
        dataSource={dataSource}
        columns={columns}
        bordered
        rowKey={"_id"}
      />
    </div>
  );
};
export default UserPage;
