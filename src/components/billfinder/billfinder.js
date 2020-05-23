import React from 'react'
import './billfinder.css'

export default function billfinder() {
    return (
        <div className='row billfinder justify-content-md-center'>
            <div className='col-12 col-xl-5 billcol1'>
                <h3 className='billtitle'>
                        <a className='kseblink' href='http://kseb.in/index.php?option=com_wrapper&view=wrapper&Itemid=813&lang=en' className='ksebtitle'>
                <p className = 'billtext1'>   Find Previous bill by Consumer No</p>

                    </a>
                </h3>
            </div>
            <div className='col-12 col-xl-5 billcol2'>
                <h3 className='billtitle'>
                    <a className='kseblink' href='https://wss.kseb.in/selfservices/quickpay' className='ksebtitle'>                                                                       
                <p className = 'billtext1'>   Don't know Consumer No ?, Find consumer no by You'r Registerd Mobile No</p>
                    </a>
                </h3>
            </div>
            
        </div>
    )
}
