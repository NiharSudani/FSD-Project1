# WhatsApp Web Clone Components

This directory contains React components for a WhatsApp Web clone UI built with Tailwind CSS.

## Components

### Sidebar

The `Sidebar` component includes:
- Contact avatars
- Contact names
- Last message preview
- Online/offline indicator
- Search bar to filter contacts
- Scrollable contact list

### ChatWindow

The `ChatWindow` component includes:
- Messages with sender/receiver style bubbles
- Timestamps for each message
- Automatic scroll to latest message
- Different colors for sent and received messages
- Message input with send button

### WhatsAppClone

The `WhatsAppClone` component combines the Sidebar and ChatWindow components into a complete UI.

## Usage

```jsx
import { WhatsAppClone } from './components';

function App() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <WhatsAppClone />
    </div>
  );
}
```

## Viewing the Demo

Open the `whatsapp-clone.html` file in a web browser to see the WhatsApp Web clone in action.