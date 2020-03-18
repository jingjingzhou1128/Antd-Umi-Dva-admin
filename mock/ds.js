import {delay} from 'roadhog-api-doc'

export default delay({
  'GET /api/ds/summary': (req, res) => {
    if (req.query.type === 'week') {
      res.send({
        code: '200',
        flag: true,
        result: {
          sales: {
            total: 126560,
            dayTotal: 12423,
            week: {
              value: 12,
              type: 'asc'
            },
            day: {
              value: 11,
              type: 'desc'
            }
          },
          visit: {
            total: 8846,
            dayTotal: 1234,
            category: ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23'],
            data: [6, 5, 3, 4, 7, 5, 2]
          },
          pay: {
            total: 6560,
            dayTotal: 60,
            category: ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23'],
            data: [6, 5, 3, 4, 7, 5, 2]
          },
          active: {
            total: 78,
            week: {
              value: 12,
              type: 'asc'
            },
            day: {
              value: 11,
              type: 'desc'
            }
          }
        },
        msg: ''
      })
    }
  }
}, 1000)