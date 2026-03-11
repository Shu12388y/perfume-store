export class ShippingModule {
  url: string
  constructor(url: string) {
    this.url = url
  }
  public async signin({ email, password }: { email: string; password: string }) {
    try {
      const response = await fetch(`${this.url}/external/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        redirect: 'follow',
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(String(error))
    }
  }

  public async signout({ token }: { token: string }) {
    try {
      const response = await fetch(`${this.url}/external/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(String(error))
    }
  }

  public async createOrder({ token,obj }: { token: string,obj:any }) {
    try {
      const raw = JSON.stringify({
        order_id: obj.order_id,
        order_date: obj.order_date,
        pickup_location: 'Jammu',
        comment: 'Reseller: M/s Goku',
        billing_customer_name: 'Naruto',
        billing_last_name: 'Uzumaki',
        billing_address: 'House 221B, Leaf Village',
        billing_address_2: 'Near Hokage House',
        billing_city: 'New Delhi',
        billing_pincode: 110002,
        billing_state: 'Delhi',
        billing_country: 'India',
        billing_email: 'naruto@uzumaki.com',
        billing_phone: 9876543210,
        shipping_is_billing: true,
        shipping_customer_name: '',
        shipping_last_name: '',
        shipping_address: '',
        shipping_address_2: '',
        shipping_city: '',
        shipping_pincode: '',
        shipping_country: '',
        shipping_state: '',
        shipping_email: '',
        shipping_phone: '',
        order_items: [
          {
            name: 'Kunai',
            sku: 'chakra123',
            units: 10,
            selling_price: 900,
            discount: '',
            tax: '',
            hsn: 441122,
          },
        ],
        payment_method: 'Prepaid',
        shipping_charges: 0,
        giftwrap_charges: 0,
        transaction_charges: 0,
        total_discount: 0,
        sub_total: 9000,
        length: 10,
        breadth: 15,
        height: 20,
        weight: 2.5,
      })

      const response = await fetch(`${this.url}/external/orders/create/adhoc`, {
        method: 'POST',
        body: raw,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        redirect: 'follow',
      })
      const data = await response.json()
      return data
    } catch (error) {
      throw new Error(String(error))
    }
  }
}
