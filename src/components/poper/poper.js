import React from "react";
import ReactDOM from "react-dom";
import Popover, { ArrowContainer } from "react-tiny-popover";
import cread from './cread.jpg'
import meter from './meter.jpg'
import dateimg from './date.jpg'

import "./poper.css";

class Poper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: true
    };
  }
  render() {
    const { isPopoverOpen } = this.state;
    return (
      <div className="App">
        

        <Popover
          isOpen={isPopoverOpen}
          position={[]}
          padding={10}
          onClickOutside={() => this.setState({ isPopoverOpen: false })}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={"#eb4d4b"}
              arrowSize={10}
              arrowStyle={{ opacity: 0.7 }}
            >
              <div 
                
                onClick={() => {
                  this.setState({ isPopoverOpen: !isPopoverOpen });
                }}
                id = 'popover'
              >
                <h2 className='poptitle'>
                    How to Use ?
                </h2>
                <div className='popcnt'>
                <ol>
                    <li> Enter the bill reading from your Previous bill  </li>
                    <div className='imgflex'>
                    <img src ={cread} className='popimg'></img>

                    <a  href="/findbill" className='popa'> Don't Have bill ?</a>
                    </div>
                    <li> Enter the Current reading from the Electricity Meter</li>
                    <img src= {meter} className='popimg'></img>
                    <p> Make sure that KWh in Bottom Right </p>
                    <li> Enter the last Bill Date</li>
                    <img src={dateimg} className='popimg'></img>

                </ol>
                <h2 className='popbotom'> Let's Start</h2>

                </div>
                
                 

              </div>
            </ArrowContainer>
          )}
        >
          <div
            style={{ cursor: "pointer" }}
            onLoad={() => this.setState({ isPopoverOpen: true })}
          >
            
          </div>
        </Popover>
      </div>
    );
  }
}


export default Poper