import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { initial_users } from './data.ts';
import { UseList } from './hooks/List.tsx';
import { useStore } from './hooks/signal.tsx';
import { UseObject } from './hooks/Object.jsx';
import { For } from './custom_components/For.jsx';
import { Show } from './custom_components/Show.jsx';
import { useLocalStorage } from './hooks/localStorage.tsx';
import useSelector from './hooks/Selector.tsx';
import useSync from './hooks/Sync.ts';




function UsersSection() {
  const [users, deleteUser, addNewUser, sortUsers, clearUsers, updateItem, swap] = UseList(initial_users);

  return (
    <div className="UsersSection">
      <div id="users">


      <For each={users}>
        {(user, index) => <User index={index} swap={swap} deleteUser={deleteUser} updateItem={updateItem} key={user.id} user={user}/>}

      </For>
      </div>

      <button onClick={addNewUser}>Add New User</button>
      <button onClick={() => sortUsers('age')}>Sort Users By Age</button>
      <button onClick={clearUsers}>Clear Users</button>
    </div>
  );}


  const countObject = {
    count: 0
  }

function App() {
const [persistentCount, setPersistentCount] = useLocalStorage('count', 0, 10000);
const [theme, nextTheme, prevTheme] = useSelector(['theme', 'light', "dark"]);

  return <>
  <h1>{theme}</h1>
  <button onClick={nextTheme}>next theme</button>
  <button onClick={prevTheme}>prev theme</button>
  <button onClick={() => setPersistentCount((prev) => prev + 1)}>persistentCount: {persistentCount}</button>
  <CountSection2/>
  <CountSection2/>
  <UsersSection/>
  <UsersSection/>
  </>
}



export default App;
function CountSection2() {
  const [_, setCount] = useStore(countObject);
  const [count, setCount_] = useSync("count", 0);
  console.log(`count is ${count}`);

  return <>
  <button onClick={() => {setCount_(count + 1)}}>regular count: {count}</button>
  <button onClick={() => setCount("count", countObject.count + 1)}>Count is {countObject.count}</button>
  <button onClick={() => setCount("double", countObject.count * 2)}>double is {countObject.double}</button>
  <button onClick={() => setCount("double", undefined)}>remove double</button>
  <button onClick={() => console.log(countObject)}>log</button>
  <Show when={countObject.count % 2 === 0}>
    <h1>Count is even</h1>
  </Show>
  </>
}


function User({user, deleteUser, updateItem, swap, index}) {
  return <div key={user.id} className='user'>
    <h1>{user.name}</h1>
    <h3>age: {user.age}</h3>
    <h3>country: {user.country}</h3>
    <h3>city: {user.city}</h3>
    <button onClick={() => deleteUser(user.id)}>Delete User</button>
    <button onClick={() => updateItem(user.id, 'age', (prev) => prev + 1)}>Update User</button>
    <button onClick={() => swap(index - 1, index)}>{"<-"}</button>
    <button onClick={() => swap(index + 1, index)}>{"->"}</button>
  </div>;
}

