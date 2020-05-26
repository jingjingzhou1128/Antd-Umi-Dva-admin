import {delay} from 'roadhog-api-doc'

export default delay({
  'POST /api/file/upload': (req, res) => {
    console.log(req.body)
    res.send({
      code: 200,
      flag: true,
      result: {
        fileUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      msg: ''
    })
  }
}, 1000)