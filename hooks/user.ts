import Requester from "../services/requester"
import {IGetApiUserInfo} from "../services/types"
import {APIS} from "../services/config"
import {useEffect, useState} from "react"

export interface UserInfo {
  name?: string
  email?: string
  phone?: string
  avatar?: string
}

export function useUserInfo(): [UserInfo | undefined | null, () => void] {
  const [user, setUser] = useState<UserInfo | undefined | null>(undefined)

  function fetch() {
    const authToken = localStorage.getItem('auth-token')

    if (authToken) {
      const requester = new Requester<IGetApiUserInfo>(APIS.GET_USR_INFO)

      requester.get({
        params: {
          authToken,
        },
      }).then(v => {
        if (v?.success === true && v?.data) {
          setUser(v.data)
          return
        }
        return Promise.reject()
      }).catch(() => {
        setUser(null)
      })
    } else {
      setUser(null)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  return [user, fetch]
}
