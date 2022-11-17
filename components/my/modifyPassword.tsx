import React, {useEffect, useState} from "react";
import {Button, Input, Message, Space} from "@arco-design/web-react";
import Requester from "../../services/requester";
import {IPostApiModifyPassword, IPostApiSendCode} from "../../services/types";
import {APIS} from "../../services/config";
import shajs from "sha.js";

interface IModifyPassword {
  onSuccess: () => void
}

const ModifyPassword: React.FC<IModifyPassword> = (props) => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [sendCodeCD, setSendCodeCD] = useState(30)

  useEffect(() => {
    handleSendCode()
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      if (sendCodeCD < 30) {
        setSendCodeCD(sendCodeCD - 1)
      }
      if (sendCodeCD < 1) {
        setSendCodeCD(30)
      }
    }, 1000)
    return () => {
      clearInterval(t)
    }
  }, [sendCodeCD])

  function handleSubmit() {
    if (!/^[0-9]{4}$/.test(code)) {
      Message.error('验证码格式错误')
      return
    }
    if (password.length < 1) {
      Message.error('密码为空')
      return
    }

    const hashedPassword = shajs('sha256').update(password).digest('hex')

    const requester = new Requester<IPostApiModifyPassword>(APIS.POST_MODIFY_PASSWORD)

    setPending(true)

    requester.post({
      params: {
        authToken: localStorage.getItem('auth-token') || ''
      },
      body: {
        code,
        newPassword: hashedPassword
      }
    }).then(v => {
      if (v.success) {
        Message.success('修改成功')
        props.onSuccess()
      } else {
        Message.error(v?.msg || '修改失败')
      }
    }).catch(() => {
      Message.error('修改失败')
    }).finally(() => {
      setPending(false)
    })
  }

  function handleSendCode() {
    const requester = new Requester<IPostApiSendCode>(APIS.POST_SEND_CODE)
    setSendCodeCD(sendCodeCD - 1)
    requester.post({
      params: {
        authToken: localStorage.getItem('auth-token') || ''
      }
    }).then(v => {
      if (v.success) {
        Message.success('发送成功')
      } else {
        return Promise.reject()
      }
    }).catch(() => {
      Message.error('发送失败')
    })
  }

  return (
    <Space direction='vertical'>
      <Space>
        <Input value={code} onChange={v => setCode(v)} placeholder='6 位验证码'/>
        <Button onClick={handleSendCode} disabled={sendCodeCD < 30}>重新发送 {sendCodeCD < 30 ? sendCodeCD : ''}</Button>
      </Space>
      <Input value={password} onChange={v => setPassword(v)} placeholder='新密码' type='password'/>
      <Button onClick={handleSubmit} type='primary' loading={pending} className='mt-4'>修改密码</Button>
    </Space>
  )
}

export default ModifyPassword
