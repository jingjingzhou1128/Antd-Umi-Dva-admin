import {delay} from 'roadhog-api-doc'

export default delay({
  'GET /api/table/list': (req, res) => {
    res.send({
      code: 200,
      flag: true,
      result: {
        data: [
          {
            id: '1',
            name: '胡彦斌',
            age: 31,
            address: '西湖区湖底公园1号'
          },
          {
            id: '2',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
          },
          {
            id: '3',
            name: '胡彦斌',
            age: 33,
            address: '西湖区湖底公园1号'
          },
          {
            id: '4',
            name: '胡彦斌',
            age: 34,
            address: '西湖区湖底公园1号'
          },
          {
            id: '5',
            name: '胡彦斌',
            age: 35,
            address: '西湖区湖底公园1号'
          },
          {
            id: '6',
            name: '胡彦斌',
            age: 36,
            address: '西湖区湖底公园1号'
          },
          {
            id: '7',
            name: '胡彦斌',
            age: 37,
            address: '西湖区湖底公园1号'
          },
          {
            id: '8',
            name: '胡彦斌',
            age: 38,
            address: '西湖区湖底公园1号'
          },
          {
            id: '9',
            name: '胡彦斌',
            age: 39,
            address: '西湖区湖底公园1号'
          }
        ],
        total: 20
      },
      msg: ''
    })
  }
}, 1000)