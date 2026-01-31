export interface CheckoutFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  comment?: string
}

export interface OrderItem {
  productId: string
  size: number
  quantity: number
  price: number
}

export interface CreateOrderRequest {
  customer: CheckoutFormData
  items: OrderItem[]
  subtotal: number
  discount: number
  discountCode?: string
  deliveryCost: number
  total: number
}

export interface CreateOrderResponse {
  orderId: string
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
  createdAt: string
  total: number
}
