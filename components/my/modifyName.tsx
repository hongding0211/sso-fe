import React, {useCallback, useState} from "react";
import {Button, Input, Message, Space} from "@arco-design/web-react";
import Requester from "../../services/requester";
import { IPatchApiUserInfo } from "../../services/types";
import { APIS } from '../../services/config';

interface IModifyName {
  name: string
  onSuccess: () => void
}

const ModifyName: React.FC<IModifyName> = (props) => {
  const [name, setName] = useState(props.name)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(() => {
    if (name === '') {
      Message.error('用户名不能为空')
      return
    }
    const requester = new Requester<IPatchApiUserInfo>(APIS.PATCH_USER_INFO)
    setLoading(true)
    requester.patch({
      params: {
        authToken: localStorage.getItem('auth-token') || '',
      },
      body: {
        name,
      },
    }).then(res => {
      if (!res?.success) {
        Message.error('修改失败')
        return
      }
      Message.success('修改成功')
      props.onSuccess()
    }).finally(() => {
      setLoading(false)
    })
  }, [name, props])

  return (
    <Space direction='vertical' style={{width: '100%'}}>
      <Input prefix='用户名' value={name} onChange={setName} />
      <Space className='mt-4'>
        <Button onClick={handleSubmit} type='primary' loading={loading} >修改用户名</Button>
      </Space>
    </Space>
  )
}

export default ModifyName
