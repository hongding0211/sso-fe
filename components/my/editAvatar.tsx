import React, { useCallback, useEffect, useState } from "react";
import Upload from './uploader'
import { Button, Message, Space } from "@arco-design/web-react";

interface IEditAvatar {
  onUpload: (filePath: string) => void
}

const EditAvatar: React.FC<IEditAvatar> = (props) => {
  const { onUpload } = props

  const [file, setFile] = useState<any>()

  const handleClick = useCallback(() => {
    if (!file) {
      return
    }
    const { name, originFile } = file

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
          Message.error('出现错误，请稍后再试')
          return
        }

        const {
          fileName,
          filePath,
          url,
        } = res?.data || {}

        const file = new File([originFile], fileName, {
          type: originFile.type,
          lastModified: originFile.lastModified,
        })

        fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/octet-stream'
          },
          body: file,
        }).then(res => {
          if (res.status !== 200) {
            Message.error('上传错误')
          }
          onUpload(filePath)
        })
      })

  }, [file, onUpload])

  useEffect(() => {
    setFile(undefined)
  }, [])

  return (
    <Space direction='vertical' size='large'>
      <Upload
        fileList={file ? [file] : []}
        onChange={(_: any, currentFile: any) => {
          setFile({
            ...currentFile,
            url: URL.createObjectURL(currentFile.originFile),
          });
        }}
      />
      <Button type='primary' onClick={handleClick}>确认修改</Button>
    </Space>
  )
}

export default EditAvatar
