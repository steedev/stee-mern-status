import React from 'react'

class App extends React.Component {
  state = {
    res: []
  }

  componentDidMount() {
    this.fetchData()
      .then(res => this.setState({ res }))
  }

  fetchData = async () => {
    const res = await fetch('/classList')
    const body = await res.json()
    if (res.status !== 200) throw Error(body.message)
    return body
  }

  render() {
    return (
      <div>
        <h1>{this.state.res.class}</h1>
      </div>
    )
  }
}

export default App