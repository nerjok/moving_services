import React from 'react';

class Index  extends React.Component  {
  
  static getInitialProps ({ query}) {
    return { query}
  }
  
 render() {
  console.log('props', this.props.query)
  return (
  <div>
    <p>Hello Next.js, this is your friend Brian from logrocket {this.props.query.id}</p>
  </div>
  )
 }
}


export default Index