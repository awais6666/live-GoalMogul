import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import styles from "./Subscribers.module.css"
import { Helmet } from "react-helmet"
import { getSubscribersList } from "../../api/index"
import ReactHTMLTableToExcel from "react-html-table-to-excel"
import ReactToPdf from "react-to-pdf"
import { any } from "joi"

/**
 * Shows subscribers list
 */
export default class Subscribers extends React.Component {
  constructor(props) {
    super(props)
    this.pdfButton = React.createRef()
  }

  state = {
    subscribersList: [],
    showList: false,
    error: {},
  }

  fetchList = async () => {
    try {
      const result = await getSubscribersList()
      this.setState({ ...this.state, subscribersList: result, showList: true })
    } catch (error) {
      this.setState({ ...this.state, error })
    }
  }

  componentDidMount() {
    this.fetchList()
  }

  render() {
    return (
      <main className={styles.main}>
        <div className='container-fluid'>
          <Helmet>
            <title>GoalMogul Subscriber List</title>
          </Helmet>
          <div className={styles.btnConatiner}>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className={`btn ${styles.export}`}
              table='table-to-xls'
              filename='SubscribersList'
              sheet='Subscribers'
              buttonText='Export to Excel'
            />
            <ReactToPdf
              targetRef={this.pdfButton}
              filename='SubscribersList'
              options={{
                orientation: "landscape",
              }}
            >
              {({ toPdf }) => (
                <button className={`btn ${styles.export}`} onClick={toPdf}>
                  Export to PDF
                </button>
              )}
            </ReactToPdf>
          </div>
          {this.state.showList ? (
            this.state.subscribersList.length > 0 ? (
              <div ref={this.pdfButton} className={styles.list}>
                <table id='table-to-xls' className={`table table-striped`}>
                  <thead>
                    <tr>
                      <th>
                        <h5>#</h5>
                      </th>
                      <th>
                        <h5>Email</h5>
                      </th>
                      <th>
                        <h5>Subscription Date</h5>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.subscribersList.map((sub, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{sub.email}</td>
                        <td>{sub.date_time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className={styles.emptyList}>
                <h2>Subscribers list is empty</h2>
              </div>
            )
          ) : (
            <> </>
          )}
        </div>
      </main>
    )
  }
}
