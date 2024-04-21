
export const technicians = [
  {
    id: '73ba7015-e308-4ab6-bd1d-6d6fb695f37b',
    fullName: 'Juan Perez',
    avatar: '/avatarTechnician1.png',
    address: 'Calle 123 # 123-123',
    phone: '1234567890',
    password: '123456',
    email: 'admin@mail.com'
  },
  {
    id: 'f29bc350-9711-4837-9c86-d6d6418b4d7b',
    fullName: 'Maria Lopez',
    avatar: '/avatarTechnician2.png',
    address: 'Calle 123 # 123-123',
    phone: '1234567890',
    password: '123456',
    email: 'admin@mail.com'
  },
  {
    id: 'p09bc350-9700-4837-9c86-d6d6418b4d7b',
    fullName: 'Pedro Rodriguez',
    avatar: '/avatarTechnician3.png',
    address: 'Calle 123 # 123-123',
    phone: '1234567890',
    password: '123456',
    email: 'admin@mail.com'
  }
]

export const orders = [
  {
    id: 1,
    date: new Date('2021-09-01'),
    description: 'reparación de lavadora',
    technician: 'Juan Perez',
    status: 'opened',
    product: [
      {
        id: 1,
        name: 'lavadora',
        brand: 'LG',
        model: '1234',
        serial: '1234567890',
        date: new Date('2021-09-05'),
        status: 'pending'
      },
      {
        id: 2,
        name: 'secadora',
        brand: 'Samsung',
        model: '1234',
        serial: '1234567890',
        date: new Date('2021-09-05'),
        status: 'delivered'
      },
      {
        id: 3,
        name: 'refrigerador',
        brand: 'Mabe',
        model: '1234',
        serial: '1234567890',
        date: new Date('2021-09-05'),
        status: 'returned'
      }
    ],
    client: [
      {
        id: 1,
        fullName: 'Juan Perez',
      }
    ]
  },
  {
    id: 2,
    date: new Date('2021-09-02'),
    description: 'reparación de refrigerador',
    technician: 'Maria Lopez',
    status: 'closed',
    product: [
      {
        id: 1,
        name: 'lavadora',
        brand: 'LG',
        model: '1234',
        serial: '1234567890',
        date: new Date('2021-09-05'),
        status: 'waiting'
      },
      {
        id: 2,
        name: 'secadora',
        brand: 'Samsung',
        model: '1234',
        serial: '1234567890',
        date: new Date('2021-09-05'),
        status: 'repaired'
      }
    ],
    client: [
      {
        id: 1,
        fullName: 'Pedro Rodriguez',
      }
    ]
  },
]
