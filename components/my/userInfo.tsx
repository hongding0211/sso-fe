import {Descriptions} from "@arco-design/web-react";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {DataType} from "@arco-design/web-react/es/Descriptions/interface";

export default function UserInfo() {
  const [data, setData] = useState<DataType | undefined>(undefined)

  const user = useSelector(state => state.user)

  useEffect(() => {
    setData([
      {
        label: '用户名',
        value: user.name
      },
      {
        label: '邮箱',
        value: user.email || '-'
      },
      {
        label: '电话',
        value: user.phone || '-'
      },
    ])
  }, [user])

  return (
    <>
      {
        data &&
        <Descriptions
          column={1}
          title='用户信息'
          data={data}
        />
      }
    </>
  )
}
