import React, { useEffect, useState } from 'react'


const Table = () => {

    const [data, setData] = useState({});

    useEffect(()=>{
        fetch(`http://3.77.237.29:3000/users/1`)
        .then((response) => response.json())
        .then((item) => setData(item))
        .catch((error) => {
          console.error('Error:', error);
        });

        },[])
        console.log(data,"data")

  return (
    <div className='bg-[#f4f4f8]'>
        {/*--------------------------------------------  !!!!!!!!!!! table filter !!!!!!!!!!! ------------------- */}
        <div className=''>

        </div>
    </div>
  )
}

export default Table
