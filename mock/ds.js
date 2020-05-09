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
          },
          salePer: {
            value: [
              {value: 335, name: '家用电器'},
              {value: 310, name: '食用酒水'},
              {value: 234, name: '个护健康'},
              {value: 135, name: '服饰箱包'},
              {value: 1548, name: '母婴产品'}
            ],
            total: 2562
          },
          onlineSearch: {
            table: [
              {
                id: '1',
                rank: 1,
                searchKey: '搜索关键词-1',
                userCount: 221,
                weekGain: 0
              },
              {
                id: '2',
                rank: 2,
                searchKey: '搜索关键词-2',
                userCount: 222,
                weekGain: 1
              },
              {
                id: '3',
                rank: 3,
                searchKey: '搜索关键词-3',
                userCount: 227,
                weekGain: 2
              },
              {
                id: '4',
                rank: 4,
                searchKey: '搜索关键词-4',
                userCount: 222,
                weekGain: 3
              },
              {
                id: '5',
                rank: 5,
                searchKey: '搜索关键词-5',
                userCount: 227,
                weekGain: 4
              }
            ],
            tableTotal: 40,
            user: {
              type: ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23'],
              value: [6, 5, 3, 4, 7, 5, 2]
            },
            per: {
              type: ['2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20', '2020-03-21', '2020-03-22', '2020-03-23'],
              value: [6, 5, 3, 4, 7, 5, 2]
            }
          },
          saleTrend: {
            type: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            value: [549, 500, 680, 700, 420, 450, 600, 450, 320, 400, 430, 300]
          }
        },
        msg: ''
      })
    }
  },
  'GET /api/ds/saleType': (req, res) => {
    res.send({
      code: '200',
      flag: true,
      result: {
        value: [
          {value: 400, name: '家用电器'},
          {value: 300, name: '食用酒水'},
          {value: 512, name: '个护健康'},
          {value: 600, name: '服饰箱包'},
          {value: 424, name: '母婴产品'}
        ],
        total: 2236
      },
      msg: ''
    })
  },
  'GET /api/ds/searchList': (req, res) => {
    res.send({
      code: '200',
      flag: true,
      result: {
        data: [
          {
            id: '1',
            rank: 1,
            searchKey: '搜索关键词-6',
            userCount: 221,
            weekGain: 0
          },
          {
            id: '2',
            rank: 2,
            searchKey: '搜索关键词-7',
            userCount: 222,
            weekGain: 1
          },
          {
            id: '3',
            rank: 3,
            searchKey: '搜索关键词-8',
            userCount: 227,
            weekGain: 2
          },
          {
            id: '4',
            rank: 4,
            searchKey: '搜索关键词-9',
            userCount: 222,
            weekGain: 3
          },
          {
            id: '5',
            rank: 5,
            searchKey: '搜索关键词-10',
            userCount: 227,
            weekGain: 4
          }
        ],
        tableTotal: 40
      },
      msg: ''
    })
  },
  'GET /api/ds/saleTrend': (req, res) => {
    res.send({
      code: '200',
      flag: true,
      result: {
        type: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        value: [600, 500, 680, 700, 420, 450, 600, 450, 320, 400, 430, 200]
      },
      msg: ''
    })
  }
}, 1000)