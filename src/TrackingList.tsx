import React, {useState, useEffect} from "react";
import axios from 'axios';
import List from "./List";

const TrackingList = () => {
  const [listData, setListData] = useState<{ userId: number, id: number, title: string, completed: boolean } | undefined>();

  useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos/2').then((response:{data:{ userId: number, id: number, title: string, completed: boolean }, status:number}) => {
        if (response.status === 200) {
          setListData(response.data);
        }
      });
  }, []);

  return(
    <>
      <h1>Tracking List</h1>
      <List listData={listData}/>
    </>

  )
}

export default TrackingList;
