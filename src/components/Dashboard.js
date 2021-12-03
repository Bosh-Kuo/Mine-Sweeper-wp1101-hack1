/****************************************************************************
  FileName      [ Dashnoard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Dashboard. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import "./css/Dashboard.css"
let timeIntervalId;

export default function Dashboard({ remainFlagNum, gameOver, win }) {
    let [time, setTime] = useState(0);
    let [sTime, setSTime] = useState(0);

    {/* -- TODO 7 -- */ }
    {/* Useful Hint: Try to understand the difference between time and sTime. */ }


    useEffect(() => {
        if (!gameOver && !win) {
            console.log("Game time!")
            setSTime(0)
            setTime(0)
            var id = setInterval(() => setTime((time) => time + 1), 1000);
            var id2 = setInterval(() => setSTime((sTime) => sTime + 1), 1000);
            
        }else{
            console.log("Over")
        }

        return () => {
            clearInterval(id2)
            clearInterval(id)
        }

    }, [gameOver, win]);

    useEffect(() => {
    }, []);
    

    return (
        <div className="dashBoard" >
            <div id='dashBoard_col1' >
                <div className='dashBoard_col'>
                    <p className='icon'>🚩</p>
                    {remainFlagNum}
                </div>
            </div>
            <div id='dashBoard_col2' >
                <div className='dashBoard_col'>
                    <p className='icon'>⏰</p>
                    {gameOver ? sTime : time}
                </div>
            </div>
        </div>
    );
}
