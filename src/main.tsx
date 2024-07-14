import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { storeBooking } from './common/store/booking/store.ts'

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={storeBooking}>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </Provider>
  // </React.StrictMode>,
)
