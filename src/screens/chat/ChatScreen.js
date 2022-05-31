import { Header } from '../../components/header/Header';
import Main from '../../components/main/mainContent/Main';

import './chatScreen.css';


export const ChatScreen = () => {

  return (
    <div className="ChatApp">
      <Header/>
      <Main />
    </div>
  );
}