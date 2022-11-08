import React, {useState} from 'react'
import {Avatar, Button, Descriptions, Divider, Link, Modal, Skeleton, Space} from "@arco-design/web-react";
import {IconEdit} from "@arco-design/web-react/icon";
import {UserInfo} from '../../hooks/user'
import EditAvatar from "./editAvatar";
import ModifyPassword from "./modifyPassword";

interface IUserInfo {
  userInfo?: UserInfo
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

  return (
    <>
      <div className='m-6'>
        <Skeleton loading={!userInfo}>
          <Space size={64} align='start'>
            <Space direction='vertical' align='center' size='medium'>
              <Avatar size={96}>
                <img src={userInfo?.avatar} alt='avatar'/>
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
                style={{marginBottom: 20}}
                labelStyle={{paddingRight: 36}}
              />
            }
          </Space>

          <Divider/>

          <Link onClick={handleModifyPassword}>修改密码</Link>
        </Skeleton>
      </div>

      <Modal
        title='编辑头像'
        visible={showEditAvatarModal}
        onCancel={() => setShowEditAvatarModal(false)}
        onOk={handleConfirmEditAvatar}
      >
        <EditAvatar />
      </Modal>

      <Modal
        title='修改密码'
        visible={showModifyPasswordModal}
        onCancel={() => setShowModifyPasswordModal(false)}
        onOk={handleConfirmModifyPassword}
      >
        <ModifyPassword />
      </Modal>
    </>
  )
}

export default UserInfo
