import React, {useState} from 'react';
import Head from 'next/head'
import {Avatar, Breadcrumb, Dropdown, Layout, Menu, PageHeader} from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css"
import Image from "next/image";
import logo from '../../public/logo2.png'
import {IconUser} from "@arco-design/web-react/icon";
import {useRouter} from "next/router";
import {useUserInfo} from "../../hooks/user";
import UserInfo from "../../components/my/userInfo";

const MenuItem = Menu.Item;
const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

const menu = [
  {
    key: 'userInfo',
    icon: IconUser,
    title: '我的信息',
  }
]

export default function My() {
  const [currentMenuItem, setCurrentMenuItem] = useState(menu[0])

  const router = useRouter()
  const [userInfo, fetchUserInfo] = useUserInfo()

  function handleClickMenuItem(key: string) {
    const i = menu.find(e => e.key === key)
    i && setCurrentMenuItem(i)
  }

  function handleLogout() {
    localStorage.removeItem('auth-token')
    router.push('/').then()
  }

  return (
    <>
      <Head>
        <title>{currentMenuItem.title}</title>
      </Head>
      <Layout className='h-screen'>
        <Sider
          collapsed={true}
        >
          <div className='flex items-center justify-center w-full h-[48px] w-full p-1'>
            <Image src={logo} height={36} width={36} alt='logo'/>
          </div>
          <Menu
            selectedKeys={[currentMenuItem.key]}
            defaultSelectedKeys={[menu[0].key]}
            onClickMenuItem={handleClickMenuItem}
            style={{ width: '100%' }}
          >
            {
              menu.map(m => (
                <MenuItem key={m.key}>
                  {React.createElement(m.icon)}
                  {m.title}
                </MenuItem>
              ))
            }
          </Menu>
        </Sider>
        <Layout className='bg-zinc-200'>
          <Header className='bg-white'>
            <PageHeader
              title='Single Sign On'
              subTitle={currentMenuItem.title}
              extra={
                <Dropdown
                  position='br'
                  droplist={
                    <Menu>
                      <Menu.Item key='log_out' onClick={handleLogout}>登出</Menu.Item>
                    </Menu>
                  }
                >
                  <Avatar size={32} className='cursor-pointer'>
                    {
                      userInfo?.avatar ?
                        <img src={userInfo.avatar} alt='avatar'/> :
                        <IconUser />
                    }
                  </Avatar>
                </Dropdown>
              }
            />
          </Header>
          <Layout style={{ padding: '0 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>管理</Breadcrumb.Item>
              <Breadcrumb.Item>{currentMenuItem.title}</Breadcrumb.Item>
            </Breadcrumb>
            <Content className='bg-white p-4 text-zinc-900'>
              <UserInfo userInfo={userInfo} onUpdate={() => fetchUserInfo()} />
            </Content>
            <Footer className='py-4 w-full text-center text-zinc-600 text-sm'>
              <span>Copyright © {`${new Date(Date.now()).getFullYear()}`} </span>
              <a target='_blank' href='https://hong97.ltd' rel="noreferrer">hong97.ltd</a>
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}
