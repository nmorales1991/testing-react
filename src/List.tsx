import React from 'react';

interface ListProps {
  listData: {userId: number, id: number, title: string, completed: boolean } | undefined
}
const List = ({listData}: ListProps) => {
  return(
    <h1 role="heading">{listData ? listData.title : null}</h1>
  )
}

export default List;
