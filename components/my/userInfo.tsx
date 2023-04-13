import React, {useState} from 'react'
import {Avatar, Button, Descriptions, Divider, Image, Link, Modal, Skeleton, Space} from "@arco-design/web-react";
import {IconEdit} from "@arco-design/web-react/icon";
import {UserInfo} from '../../hooks/user'
import EditAvatar from "./editAvatar";
import ModifyPassword from "./modifyPassword";
import {useRouter} from "next/router";

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
  const [showAvatarPreview, setShowAvatarPreview] = useState(false)

  const router = useRouter()

  function handleEditAvatar() {
    setShowEditAvatarModal(true)
  }

  function handleModifyPassword() {
    setShowModifyPasswordModal(true)
  }

  function handleConfirmEditAvatar() {
    // TODO
    setShowEditAvatarModal(false)
    props.onUpdate()
  }

  function handleConfirmModifyPassword() {
    // TODO
    setShowModifyPasswordModal(false)
  }

  function handleSuccessModifyPassword() {
    setShowModifyPasswordModal(false)
    localStorage.removeItem('auth-token')
    router.push('/login').then()
  }

  return (
    <>
      <div className='m-6'>
        <Skeleton loading={!userInfo}>
          <div className='flex flex-col gap-y-12 sm:flex-row sm:gap-x-12'>
            <Space direction='vertical' align='center' size='medium'>
              <Avatar size={96} onClick={() => setShowAvatarPreview(true)} className='cursor-pointer'>
                <img src={userInfo?.avatar} alt='avatar' className='object-cover'/>
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

          <Link onClick={handleModifyPassword}>修改密码</Link>
        </Skeleton>
      </div>

      <Modal
        title='编辑头像'
        visible={showEditAvatarModal}
        onCancel={() => setShowEditAvatarModal(false)}
        onOk={handleConfirmEditAvatar}
        style={{maxWidth: '80vw'}}
        footer={null}
      >
        <EditAvatar />
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
