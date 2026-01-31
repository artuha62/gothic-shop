import type {
  CreateOrderRequest,
  CreateOrderResponse,
} from '@/entities/order/model/types.ts'

export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 1500))

  //FIXME убрать симуляцию ошибки
  if (Math.random() < 0.1) {
    throw new Error('Ошибка при создании заказа. Попробуйте еще раз.')
  }

  const mockResponse: CreateOrderResponse = {
    orderId: `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
    total: orderData.total,
  }

  console.log('Создан заказ:', {
    ...mockResponse,
    orderData,
  })

  return mockResponse
}

//FIXME: доделать бек и подключить все
/*
export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Ошибка при создании заказа')
  }

  return response.json()
}
*/
