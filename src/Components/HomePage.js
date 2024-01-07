import React from 'react'
import Banner from './Banner'
import CoinsTable from './CoinsTable'
import { Typography } from '@material-ui/core'

const HomePage = () => {
  return (
    <>
      <div>
        <Banner />
        <CoinsTable />
        <Typography variant='h7' style={{textAlign:'right', marginTop:20, marginRight:5}}>
                <a href="https://www.freepik.com/free-vector/gradient-technology-background-with-lights_18981336.htm#page=5&query=website%20background&position=49&from_view=keyword&track=ais&uuid=b2e1f670-cccf-480c-a92b-92331ae8fd5b">
                    Image by pikisuperstar 
                </a>
                &nbsp;
                on Freepik
            </Typography>
      </div>
    </>
  )
}

export default HomePage
