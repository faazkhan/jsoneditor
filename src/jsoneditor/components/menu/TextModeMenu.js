import { createElement as h, PureComponent } from 'react'
import DropDown from './DropDown'
import PropTypes from 'prop-types'

import fontawesome from '@fortawesome/fontawesome'
import faScrewdriver from '@fortawesome/fontawesome-free-solid/faScrewdriver'

import './Menu.css'

const faCompact = {
  prefix: 'fa',
  iconName: 'compact',
  icon: [
    16, 16,
    [],
    null,
    'm 0,2 0,2 16,0 0,-2 m -16,4 0,2 16,0 0,-2 m -16,4 0,2 9,0 0,-2'
  ]
}

const faFormat = {
  prefix: 'fa',
  iconName: 'format',
  icon: [
    16, 16,
    [],
    null,
    'm 0,2 0,2 12,0 0,-2 m -6,4 0,2 10,0 0,-2 m -10,4 0,2 9,0 0,-2 m -15,4 0,2 10,0 0,-2'
  ]
}

fontawesome.library.add(faCompact, faFormat, faScrewdriver)

export default class TreeModeMenu extends PureComponent {

  static propTypes = {
    mode: PropTypes.string.isRequired,
    modes: PropTypes.arrayOf(PropTypes.string),
    onChangeMode: PropTypes.func.isRequired,

    onFormat: PropTypes.func.isRequired,
    onCompact: PropTypes.func.isRequired,
    onRepair: PropTypes.func.isRequired
  }

  render () {
    let items = []

    // mode
    if (this.props.modes ) {
      items = items.concat([
        h('div', {className: 'jsoneditor-menu-group', key: 'mode'}, [
          h(DropDown, {
            key: 'mode',
            title: 'Switch mode',
            options: this.props.modes.map(mode => ({
              value: mode,
              text: mode,
              title: `Switch to ${mode} mode`
            })),
            value: this.props.mode,
            onChange: this.props.onChangeMode,
            onError: this.props.onError
          })
        ])
      ])
    }

    // format / compact / repair
    items = items.concat([
      h('div', {className: 'jsoneditor-menu-group', key: 'format-compact-repair'}, [
        h('button', {
          key: 'format',
          className: 'jsoneditor-format',
          title: 'Format the JSON document',
          onClick: this.props.onFormat
        }, h('i', {className: 'fa fa-format'})),
        h('button', {
          key: 'compact',
          className: 'jsoneditor-compact',
          title: 'Compact the JSON document',
          onClick: this.props.onCompact
        }, h('i', {className: 'fa fa-compact'})),
        h('button', {
          key: 'repair',
          className: 'jsoneditor-repair',
          title: 'Repair the JSON document',
          onClick: this.props.onRepair
        }, h('i', {className: 'fa fa-screwdriver'})),
      ])
    ])

    return h('div', {key: 'menu', className: 'jsoneditor-menu'}, items)
  }
}