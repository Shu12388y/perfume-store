import { ShippingModule } from '@/modules/shipping.module'

interface Info {
  email: string
  password: string
}
const URL = 'https://apiv2.shiprocket.in/v1'

const shipping_instance = new ShippingModule(URL)

export const signin_service = async (info: Info) => {
  try {
    const response = await shipping_instance.signin({
      email: info.email,
      password: info.password,
    })
    const data = await response
    return data
  } catch (error) {
    return error
  }
}

export const signout_service = async (token: string) => {
  try {
    const response = await shipping_instance.signout({ token })
    const data = await response
    return data
  } catch (error) {
    return error
  }
}
