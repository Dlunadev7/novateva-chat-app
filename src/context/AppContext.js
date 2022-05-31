import React, { useMemo, useState } from "react";
 
export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [ user, setUser ] = useState({})
  const [ userList, setUserList ] = useState({});
  const [ token, setToken ] = useState({});
  const [ chats, setChats ] = useState([]);
  const [ messages, setMessages ] = useState({});
  const [ redirect, setRedirect ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const [ logOut, setLogOut ] = useState(false);
  const [ newChat, setNewChat ] = useState(false);
  const [ unReadNum, setUnReadNum ] = useState([]);
  const [ url, setUrl ] = useState('');

  const MemoizedData = useMemo(() => ({
      user,
      setUser,
      token,
      setToken,
      chats, 
      setChats, 
      messages, 
      setMessages, 
      userList, 
      setUserList, 
      redirect, 
      setRedirect, 
      loading, 
      setLoading, 
      logOut, 
      setLogOut, 
      newChat, 
      setNewChat, 
      unReadNum, 
      setUnReadNum, 
      url, 
      setUrl,
  }), [
    user,
    userList,
    token,
    chats,
    messages,
    redirect,
    loading,
    logOut,
    newChat,
    unReadNum,
    url,
  ])

  return (
    <AppContext.Provider value={MemoizedData}>
      {children}
    </AppContext.Provider>
  );
}