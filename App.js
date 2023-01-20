import store from './src/app/store'
import { Provider } from 'react-redux'
import Main from './src/features/main/Main'

export default function App() {

  return (
    <Provider store={store}>
      < Main />
    </Provider>
  );
}
