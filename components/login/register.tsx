import {Avatar, Button, Input, Loading, Spacer, useInput} from "@nextui-org/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft, faUpload, faUser} from "@fortawesome/free-solid-svg-icons"
import React, {ChangeEvent, useRef, useState} from "react";
import toast from "react-hot-toast";
import shajs from 'sha.js'
import Requester from "../../services/requester";
import {IPostApiRegister} from "../../services/types";
import {APIS, UPLOAD_SECRET} from "../../services/config";

type IRegister = {
  onBack: () => void
  onRegistered: (data: IPostApiRegister['IRes']['data']) => void
}

const Register: React.FunctionComponent<IRegister> = props =>  {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState('')
  const [uploading, setUploading] = useState(false)
  const [pending, setPending] = useState(false)

  const { value: emailPhone, bindings } = useInput('')

  const inputRef = useRef<HTMLInputElement>(null)

  const helper: {
    color: "success" | "error" | "default" | "primary" | "secondary" | "warning" | undefined
  } = React.useMemo(() => {
    if (!emailPhone)
      return {
        color: undefined,
      };
    const isValid = validateEmailPhone(emailPhone);
    return {
      color: isValid ? "default" : "error",
    };
  }, [emailPhone])

  function validateEmailPhone(value: string) {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i) || value.match(/^\d{11}$/)
  }

  function handleUpload() {
    if (uploading) {
      toast.error('文件上传中')
      return
    }
    if (pending) {
      return
    }
    if (inputRef.current?.click) {
      inputRef.current.click()
    }
  }

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]

      if (file.size > 10 * 1024 * 1024) {
        toast.error('文件大小超过 10MB')
        return
      }

      setUploading(true)
      setAvatar('')

      // upload
      const { name } = file
      fetch('https://hong97.ltd/oss/upload/genKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: name,
          app: 'sso',
          contentType: 'application/octet-stream',
        })
      }).then(res => res.json())
        .then(res => {
          if (!res?.success) {
            toast.error('出现错误，请稍后再试')
            return
          }
  
          const {
            fileName,
            filePath,
            url,
          } = res?.data || {}

          const fileToBeUploaded = new File([file], fileName, {
            type: file.type,
            lastModified: file.lastModified,
          })
  
          fetch(url.replace('http', 'https'), {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/octet-stream'
            },
            body: fileToBeUploaded,
          }).then(res => {
            if (res.status !== 200) {
              toast.error('上传错误')
            }
            setAvatar(filePath)
          })
        }).finally(() => {
          setUploading(false)
        })
      return

      // upload
      const formData = new FormData()
      formData.append('file', file)

      const token = shajs('sha256').update(`${Math.floor(Date.now() / 600000)}${UPLOAD_SECRET}`).digest('hex')

      fetch(`${APIS.POST_UPLOAD}?token=${token}&fixedWidth=200`, {
        method: 'POST',
        body: formData,
      }).then(v => v.json())
        .then(v => {
          setAvatar(v?.compress?.fixedWidth || '')
        })
        .catch(() => {
          toast.error('文件上传失败')
        })
        .finally(() => {
          setUploading(false)
        })
    }
  }

  function handleRegister() {
    if (!emailPhone || !name || !password) {
      toast.error('请填写所有字段')
      return
    }

    const phone = /^\d{11}$/.test(emailPhone) ? emailPhone : undefined
    const email = /^\S+@\S+.\w$/.test(emailPhone) ? emailPhone : undefined

    if (!phone && !email) {
      toast.error('邮箱 / 电话格式错误')
      return
    }

    const hashedPassword = shajs('sha256').update(password).digest('hex')

    const requester = new Requester<IPostApiRegister>(APIS.POST_REGISTER)

    setPending(true)

    requester.post({
      body: {
        email,
        phone,
        name,
        password: hashedPassword,
        avatar,
      }
    }).then(v => {
      if (v.success) {
        toast.success('注册成功')
        props.onRegistered(v.data)
      } else {
        toast.error(v?.msg || '注册失败')
      }
    }).catch(() => {
      toast.error('注册失败')
    }).finally(() => {
      setPending(false)
    })
  }

  return (
    <div className='flex flex-col justify-between h-full'>
      <div className='flex items-center mb-7'>
        <div
          className='py-2 px-3 flex items-center rounded-md hover:bg-zinc-100 hover:dark:bg-zinc-900 transition-hover duration-100 cursor-pointer mr-2'
          onClick={props.onBack}
        >
          <FontAwesomeIcon width={12} icon={faChevronLeft}/>
        </div>
        <p className='font-medium text-2xl text-zinc-900 dark:text-zinc-200'>注册</p>
      </div>

      <div className='flex flex-col'>
        <Input
          {...bindings}
          label='邮箱 / 电话'
          fullWidth
          status={helper.color}
          color={helper.color}
          autoComplete='new-password'
        />
        <Spacer y={1}/>

        <Input
          value={name}
          clearable
          label="用户名"
          onChange={e => setName(e.target.value)}
          autoComplete='new-password'
        />
        <Spacer y={1}/>

        <Input.Password
          value={password}
          clearable
          label="密码"
          onChange={e => setPassword(e.target.value)}
          autoComplete='new-password'
        />
        <Spacer y={1}/>

        <div className='flex items-center'>
          <div onClick={handleUpload}>
            <Avatar
              icon={!avatar ? <FontAwesomeIcon icon={faUser}/> : undefined}
              src={avatar}
            />
          </div>
          <Spacer x={1}/>
          <div className='px-4 py-2 flex items-center rounded-xl bg-zinc-100 dark:bg-zinc-800 cursor-pointer'
               onClick={handleUpload}>
            <FontAwesomeIcon width={18} icon={faUpload}/>
            <div className='ml-3 text-sm font-medium'>上传头像</div>
          </div>
          {
            uploading &&
            <>
              <Spacer x={1}/>
              <Loading color="currentColor" size='sm'/>
            </>
          }
        </div>
        <Spacer y={2}/>
      </div>

      <Button color='primary' onPress={handleRegister} disabled={uploading || pending} shadow>
        {pending ? <Loading type="points" color="currentColor" size="sm" /> : <span>注册</span>}
      </Button>

      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        className='hidden'
        onChange={handleFileInputChange}
      />
    </div>
  )
}

export default Register
