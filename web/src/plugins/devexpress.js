import 'devextreme/dist/css/dx.common.css'
// import 'devextreme/dist/css/dx.ios7.default.css'
// import 'devextreme/dist/css/dx.light.compact.css'
import 'devextreme/dist/css/dx.light.css'
// import 'devextreme/dist/css/dx.softblue.compact.css'
// import 'devextreme/dist/css/dx.greenmist.css'
// import 'devextreme/dist/css/dx.material.blue.light.compact.css'
// import 'devextreme/dist/css/dx.dark.compact.css'

import 'devextreme-intl'
import 'devextreme/dist/js/localization/dx.messages.pt'
import ptMessage from 'devextreme/localization/messages/pt'
import { locale, loadMessages } from 'devextreme/localization'

loadMessages(ptMessage)
locale('pt')
