import {Fragment} from 'react'
import {Redirect} from 'react-router-dom'

export default (props) => {
  let location = props.location.pathname
  let hasLogin = !!+sessionStorage.getItem('isLogin')
  if (location === '/login') {
    if (hasLogin) {
      return (<Redirect to="/home/dashboard"/>)
    } else {
      return (<Fragment>{props.children}</Fragment>)
    }
  } else {
    let userName = sessionStorage.getItem('userName')
    if (!userName && location !== '/403' && location !== '/404') {
      return (<Redirect to="/login"/>)
    } else {
      return (<Fragment>{props.children}</Fragment>)
    }
  }
  // return (
  //   <Fragment>
  //     {
  //       hasLogin ?
  //         <div>{props.children}</div> :
  //         <Redirect to="/login"/>
  //     }
  //   </Fragment>
  // )
}
