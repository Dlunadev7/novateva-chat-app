import TopBar from '../../components/Topbar/TopBar';
import Main from '../../components/Main/Main/Main';

import './chatScreen.css';


export const ChatScreen = () => {

  return (
    <div className="ChatApp">
      <TopBar/>
      <Main />
    </div>
  );
}