import React, {useCallback, useState} from 'react'
import {Avatar, Button, Descriptions, Divider, Image, Link, Message, Modal, Skeleton, Space} from "@arco-design/web-react";
import {IconEdit} from "@arco-design/web-react/icon";
import {UserInfo} from '../../hooks/user'
import EditAvatar from "./editAvatar";
import ModifyPassword from "./modifyPassword";
import {useRouter} from "next/router";
import Requester from '../../services/requester';
import { IPatchApiUserInfo } from '../../services/types'
import { APIS } from '../../services/config';
import ModifyName from './modifyName';

interface IUserInfo {
  userInfo?: UserInfo | null
  onUpdate: () => void
}

const UserInfo: React.FC<IUserInfo> = props => {
  const {userInfo} = props

  const descriptionsData = [
    {
      label: '用户名',
      value: userInfo?.name || '-'
    },
    {
      label: '邮箱',
      value: userInfo?.email || '-'
    },
    {
      label: '电话',
      value: userInfo?.phone || '-'
    },
  ]

  const [showEditAvatarModal, setShowEditAvatarModal] = useState(false)
  const [showModifyPasswordModal, setShowModifyPasswordModal] = useState(false)
  const [showModifyNameModal, setShowModifyNameModal] = useState(false)
  const [showAvatarPreview, setShowAvatarPreview] = useState(false)

  const router = useRouter()

  function handleEditAvatar() {
    setShowEditAvatarModal(true)
  }

  function handleModifyPassword() {
    setShowModifyPasswordModal(true)
  }

  function handleModifyName() {
    setShowModifyNameModal(true)
  }

  function handleConfirmModifyPassword() {
    // TODO
    setShowModifyPasswordModal(false)
  }

  function handleConfirmModifyName() {
    setShowModifyNameModal(false)
  }

  function handleSuccessModifyPassword() {
    setShowModifyPasswordModal(false)
    localStorage.removeItem('auth-token')
    router.push('/login').then()
  }

  const handleSuccessModifyName = useCallback(() => {
    setShowModifyNameModal(false)
    props.onUpdate() 
  }, [])

  const handleUpload = useCallback((filePath: string) => {
    const requester = new Requester<IPatchApiUserInfo>(APIS.PATCH_USER_INFO)
    requester.patch({
      params: {
        authToken: localStorage.getItem('auth-token') || '',
      },
      body: {
        avatar: filePath, 
      }
    }).then(res => {
      if (!res?.success) {
        Message.error('修改失败')
        return
      }
      Message.success('修改成功')
      setShowEditAvatarModal(false)
      props.onUpdate()
    })
  }, [props])

  return (
    <>
      <div className='m-6'>
        <Skeleton loading={!userInfo}>
          <div className='flex flex-col gap-y-12 sm:flex-row sm:gap-x-12'>
            <Space direction='vertical' align='center' size='medium'>
              <Avatar size={96} onClick={() => setShowAvatarPreview(true)} className='cursor-pointer'>
                <img src={`${userInfo?.avatar || ''}?x-oss-process=image/resize,w_288`} alt='avatar' className='object-cover'/>
              </Avatar>
              <Button
                size='mini'
                icon={<IconEdit/>}
                type='outline'
                onClick={handleEditAvatar}
              >编辑头像</Button>
            </Space>

            {
              userInfo &&
              <Descriptions
                column={1}
                title='用户信息'
                data={descriptionsData}
                style={{marginBottom: 16}}
                labelStyle={{paddingRight: 24}}
              />
            }
          </div>

          <Divider/>

          <Link onClick={handleModifyName}>修改用户名</Link>
          <Link onClick={handleModifyPassword}>修改密码</Link>
        </Skeleton>
      </div>

      <Modal
        title='编辑头像'
        visible={showEditAvatarModal}
        onCancel={() => setShowEditAvatarModal(false)}
        style={{maxWidth: '50vw'}}
        footer={null}
      >
        <EditAvatar onUpload={handleUpload}/>
      </Modal>

      <Modal
        title='修改用户名'
        visible={showModifyNameModal}
        onCancel={() => setShowModifyNameModal(false)}
        onOk={handleConfirmModifyName}
        style={{maxWidth: '80vw'}}
        footer={null}
      >
        <ModifyName 
          name={userInfo?.name || ''}
          onSuccess={handleSuccessModifyName}
        />
      </Modal>

      <Modal
        title='修改密码'
        visible={showModifyPasswordModal}
        onCancel={() => setShowModifyPasswordModal(false)}
        onOk={handleConfirmModifyPassword}
        style={{maxWidth: '80vw'}}
        footer={null}
      >
        <ModifyPassword
          onSuccess={handleSuccessModifyPassword}
        />
      </Modal>

      <Image.Preview
        src={userInfo?.avatar?.replace(/fixedWidth_\d+/, '100') || userInfo?.avatar || ''}
        visible={showAvatarPreview}
        onVisibleChange={setShowAvatarPreview}
      />
    </>
  )
}

export default UserInfo
