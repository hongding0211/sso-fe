import React, {useEffect, useState} from "react";
import {Button, Input, Space} from "@arco-design/web-react";
import Requester from "../../services/requester";
import {IPostApiModifyPassword, IPostApiSendCode} from "../../services/types";
import {APIS} from "../../services/config";

const ModifyPassword: React.FC = () => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    handleSendCode()
  }, [])

  function handleSubmit() {
    // TODO
  }

  function handleSendCode() {
    const requester = new Requester<IPostApiSendCode>(APIS.POST_SEND_CODE)
    requester.post({
      params: {
        authToken: localStorage.getItem('auth-token') || ''
      }
    }).then(res => {
      // TODO
    })
  }

  return (
    <Space direction='vertical'>
      <Space>
        <Input value={code} onChange={v => setCode(v)} placeholder='6 位验证码' />
        <Button onClick={handleSendCode}>重新发送</Button>
      </Space>
      <Input value={password} onChange={v => setPassword(v)} placeholder='新密码' type='password'/>
      <Button onClick={handleSubmit} type='primary'>修改密码</Button>
    </Space>
  )
}

export default ModifyPassword
