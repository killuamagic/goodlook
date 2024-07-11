/* eslint-disable */
import React from'react'
import goodlook11 from'@goodlook11/core'
import Tus from'@goodlook11/tus'
import GoogleDrive from '@goodlook11/google-drive'
import Webcam from '@goodlook11/webcam'
import RemoteSources from '@goodlook11/remote-sources'
import { Dashboard, DashboardModal, DragDrop, ProgressBar, FileInput } from'@goodlook11/react'

import '@goodlook11/core/dist/style.css'
import '@goodlook11/dashboard/dist/style.css'
import '@goodlook11/drag-drop/dist/style.css'
import '@goodlook11/file-input/dist/style.css'
import '@goodlook11/progress-bar/dist/style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.goodlook11 = new goodlook11({ id: 'goodlook111', autoProceed: true, debug: true })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })
      .use(Webcam)
      .use(RemoteSources, { companionUrl: 'https://companion.goodlook11.io', sources: ['GoogleDrive', 'Box', 'Dropbox', 'Facebook', 'Instagram', 'OneDrive', 'Unsplash', 'Zoom', 'Url'],
      })

    this.goodlook112 = new goodlook11({ id: 'goodlook112', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://tusd.tusdemo.net/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount () {
    this.goodlook11.close({ reason: 'unmount' })
    this.goodlook112.close({ reason: 'unmount' })
  }

  handleModalClick () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { showInlineDashboard } = this.state
    return (
      <div>
        <h1>React Examples</h1>

        <h2>Inline Dashboard</h2>
        <label>
          <input
            type="checkbox"
            checked={showInlineDashboard}
            onChange={(event) => {
              this.setState({
                showInlineDashboard: event.target.checked
              })
            }}
          />
          Show Dashboard
        </label>
        {showInlineDashboard && (
          <Dashboard
            goodlook11={this.goodlook11}
            plugins={['GoogleDrive']}
            metaFields={[
              { id: 'name', name: 'Name', placeholder: 'File name' }
            ]}
          />
        )}

        <h2>Modal Dashboard</h2>
        <div>
          <button onClick={this.handleModalClick}>
            {this.state.open ? 'Close dashboard' : 'Open dashboard'}
          </button>
          <DashboardModal
            goodlook11={this.goodlook112}
            open={this.state.open}
            target={document.body}
            onRequestClose={() => this.setState({ open: false })}
          />
        </div>

        <h2>Drag Drop Area</h2>
        <DragDrop
          goodlook11={this.goodlook11}
          locale={{
            strings: {
              chooseFile: 'Boop a file',
              orDragDrop: 'or yoink it here'
            }
          }}
        />

        <h2>Progress Bar</h2>
        <ProgressBar
          goodlook11={this.goodlook11}
          hideAfterFinish={false}
        />

        <h2>File Input</h2>
        <FileInput
          goodlook11={this.goodlook11}
        />
      </div>
    )
  }
}
