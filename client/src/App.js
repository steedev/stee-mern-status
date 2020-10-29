import React from 'react'
import styles from './App.module.scss'
import SelectClassList from './components/SelectClassList/SelectClassList'
import SelectClassDate from './components/SelectClassDate/SelectClassDate'
import TablePupils from './components/TablePupils/TablePupils'

class App extends React.Component {
  state = {
    classList: [],
    classPupils: [],
    classPupilsDefault: [],
    selectedClasses: [],
    presentPupils: []
  }

  componentDidMount() {
    this.fetchData()
      .then(res => {
        const classList = []
        res.forEach(item => classList.push(item.class))
        this.setState({ classList })
      })
  }

  fetchData = async () => {
    const res = await fetch('/classList')
    const body = await res.json()
    if (res.status !== 200) throw Error(body.message)
    return body
  }

  fetchClasses = async (target) => {
    const res = await fetch(`/classList/${target}`)
    const body = await res.json()
    if (res.status !== 200) throw Error(body.message)
    return body
  }

  fetchClassPupils = async (target) => {
    const res = await fetch(`/classPupils/${target}`)
    const body = await res.json()
    if (res.status !== 200) throw Error(body.message)
    return body
  }

  fetchPresentPupils = async (target) => {
    const res = await fetch(`/presentPupils/${target}`)
    const body = await res.json()
    if (res.status !== 200) throw Error(body.message)
    return body
  }

  handleClassChange = (e) => {
    let target = e.target.value

    this.fetchClasses(target)
      .then(res => this.setState({ selectedClasses: res }))

    this.fetchClassPupils(target)
      .then(res => {
        this.setState({ classPupils: res[0].pupils })
        this.setState({ classPupilsDefault: res[0].pupils })
      })
  }

  handleClassDate = (e) => {
    let target = e.target.value

    this.fetchPresentPupils(target)
      .then(res => {

        this.setState({ classPupils: this.state.classPupilsDefault })

        const classPupils = [...this.state.classPupils]

        for (let i = 0; i < classPupils.length; i++) {
          for (let j = 0; j < res[0].pupils.length; j++) {
            if (classPupils[i].name === res[0].pupils[j].name) {
              const index = classPupils.indexOf(classPupils[i])
              classPupils[index] = { ...classPupils[i] }
              classPupils[index].status = true
              this.setState({ classPupils })
            }
          }
        }
      })
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>MERN Status</h1>
        <br />
        <h2>Wybierz klasę:</h2>
        <SelectClassList classList={this.state.classList} onClass={this.handleClassChange} />
        <br />
        <br />
        <br />
        <h2>Wybierz datę:</h2>
        <SelectClassDate classDate={this.state.selectedClasses} onDate={this.handleClassDate} />
        <br />
        <br />
        <br />
        <h2>Lista obecności:</h2>
        <TablePupils pupils={this.state.classPupils} />
      </div>
    )
  }
}

export default App