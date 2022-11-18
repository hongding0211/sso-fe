import React, {useEffect, useState} from "react"
import {Button, Input, Loading} from "@nextui-org/react";
import Requester from "../../services/requester";
import {
  IPostApiForgetPassword,
  IPostApiModifyPassword,
  IPostApiResetPassword,
  IPostApiSendCode
} from "../../services/types";
import {APIS} from "../../services/config";
import toast from "react-hot-toast";
import shajs from "sha.js";

interface IForgetPassword {
  onSuccess: () => void
}

const ForgetPassword: React.FC<IForgetPassword> = props => {
  const [emailInput, setEmailInput] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [sendCodeCD, setSendCodeCD] = useState(30)
  const [pending, setPending] = useState(false)

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

  function handleSendCode() {
    const phone = /^\d{11}$/.test(emailInput) ? emailInput : undefined
    const email = /^\S+@\S+.\w$/.test(emailInput) ? emailInput : undefined
    if (!phone && !email) {
      toast.error('邮箱 / 电话格式错误')
      return
    }
    const requester = new Requester<IPostApiForgetPassword>(APIS.POST_FORGET_PASSWORD)
    requester.post({
      body: {
        email: email || undefined,
        phone: phone || undefined,
      },
    }).then(v => {
      setSendCodeCD(sendCodeCD - 1)
      if (v.success) {
        toast.success('发送成功，请联系管理员获取验证码~', {
          duration: 3000
        })
      } else {
        toast.error(v?.msg || '修改失败')
      }
    }).catch(() => {
      toast.error('发送失败')
    })
  }

  function handleUpdatePassword() {
    const phone = /^\d{11}$/.test(emailInput) ? emailInput : undefined
    const email = /^\S+@\S+.\w$/.test(emailInput) ? emailInput : undefined
    if (!phone && !email) {
      toast.error('邮箱 / 电话格式错误')
      return
    }
    if (!/^[0-9]{4}$/.test(code)) {
      toast.error('验证码格式错误')
      return
    }
    if (password.length < 1) {
      toast.error('密码为空')
      return
    }

    const hashedPassword = shajs('sha256').update(password).digest('hex')

    const requester = new Requester<IPostApiResetPassword>(APIS.POST_RESET_PASSWORD)

    setPending(true)

    requester.post({
      body: {
        email,
        phone,
        code,
        newPassword: hashedPassword
      }
    }).then(v => {
      if (v.success) {
        toast.success('修改成功')
        props.onSuccess()
      } else {
        toast.error(v?.msg || '修改失败')
      }
    }).catch(() => {
      toast.error('修改失败')
    }).finally(() => {
      setPending(false)
    })
  }

  return (
    <>
      <div className='flex flex-col gap-y-4'>
        <Input
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
          label='邮箱 / 电话'
          fullWidth
          bordered
          autoComplete='new-password'
        />
        <Input
          value={code}
          onChange={e => setCode(e.target.value)}
          label='验证码'
          fullWidth
          bordered
          autoComplete='new-password'
        />
        <Input
          value={password}
          onChange={e => setPassword(e.target.value)}
          label='新密码'
          type='password'
          fullWidth
          bordered
          autoComplete='new-password'
        />
      </div>
      <Button className='my-2' onClick={handleSendCode} bordered disabled={sendCodeCD < 30}>发送验证码 {sendCodeCD < 30 ? `(${sendCodeCD})` : ''}</Button>
      <Button onClick={handleUpdatePassword} color='primary' disabled={pending}>
        {
          pending ? <Loading type="points" color="currentColor" size="sm" /> : <span>更新密码</span>
        }
      </Button>
    </>
  )
}

export default ForgetPassword
