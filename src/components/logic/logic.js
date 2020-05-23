import React, { Component } from 'react'
import './logic.css'
import {Pie, Line} from 'react-chartjs-2';







class Bill extends Component {
    function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
      }
	constructor(props) {
		super(props)

		this.state = {
			'lastBillReading': 0,
			'currentReading': 0,
			'billingDate':0,
			'display':false
			
			
		}
	}
	Calculation = (res) => {
		
		var d = new Date();
		let date_diff = Math.trunc( (d-this.state.billingDate)/ (1000 * 3600 * 24) )
		
		let current_usage = this.state.currentReading - this.state.lastBillReading
		let monthly_usage = current_usage/2
		let predicted_bill = (current_usage/date_diff)*30
		let slab = Math.trunc(predicted_bill/50)
		let remaining = (predicted_bill) -50*slab
		let total_cost = 0
		let cum_cost = [0,157.5,342.5,582.5,902.5,1282.5,]
		let slab_rate = [3.15,3.70,4.80,6.40,7.60,5.8,6.6,6.9,7.1,7.9]
		let fixed_1_phase =[70, 90, 110,140,160,200,220,240,260,300]
		let fixed_3_phase = [180,180,200,200,200,220,220,240,260,300]
		
		if(slab<5){
				total_cost = cum_cost[slab]+remaining*slab_rate[slab]
			}
		else{
				total_cost = predicted_bill*slab_rate[slab]
			}
			var bill_amt = {
				'fixed_charge':fixed_1_phase[slab],
				'energy_charge':total_cost*2,
				'fuel_surcharge' : predicted_bill/5,
				'electricity_duty' : total_cost*.2,
                'total': fixed_1_phase[slab]+( total_cost*2 )+ ( predicted_bill/5)+(total_cost*.2)+14.28,
                'current_usage' : current_usage,
                'avg_daily_usage':current_usage /date_diff,
                'e_bi_mont':predicted_bill,
                'c_usage':(total_cost/30)*date_diff,
                'avg_daily_cost':(total_cost)/ 30,
                'e_bi_mont_cost':total_cost*2
			}


		console.log(total_cost)


			
				
			
		
				

		return(
			bill_amt
		)
		
		
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.valueAsNumber })
	}

	submitHandler = e => {
		e.preventDefault()
		console.log(this.state)
		this.Calculation()
		
		
	}

	mainform = ()=> {
		return(
		
			<div className="bill ">


				<div className="container">
					<div className="row">
					<div className="formclass   ">
						<form onSubmit={this.submitHandler} className="form1">
						<div className="form-group">
						<br></br>
						<div className="textbox">
							last bill reading
							enter<input className="txt1"
								type="number"
								name="lastBillReading"
								
								onChange={this.changeHandler}
								className='form-control txtBox'
								placeholder="Enter The Last Bill Reading "
							/>
							<br></br>
							<div className="txt2">
								current reading<input
									type="number"
									name="currentReading"
									step="0.01"
									onChange={this.changeHandler}
									className='form-control txtBox '
									placeholder="Enter The Current Reading "
								/>
							</div>
							<br></br>
						</div>
						<div>
							Select date 
							<input
								type="date"
								name="billingDate"
								onChange={this.changeHandler}
								className='form-control txtBox'
							/>
						</div>
						<br></br>
						<button type="submit"  className="formbtn">Submit</button>
						</div>
					</form>
				</div>

			</div>
				</div>
			</div>
		)
		
	}

	




	
	

	render() {
		return (
			<>
			<div className='row '>
				<div className='col-10 col-md-3 box1 col-xl-2 calc'>
					{this.mainform()}

				</div>
				<div className='col-10 col-md-3 box2 col-xl-2 calc'>
					<div className='tabhead1'>
						<h2 className='head1'>
							Current Usage
						</h2>
						<h1 className='mainval'>
							{this.Calculation().current_usage}
						</h1>
						<p className='units'>
							KWh
						</p>
					</div>
				</div>
				<div className='col-10 col-md-3 box3 col-xl-2 calc'>
					<div className='tabhead2'>
						<h2 className='head2'>
							Bi-monthly usage
						</h2>
						<h1 className='mainval'>
							{Math.round( this.Calculation().e_bi_mont*2)}
						</h1>
						<p className='units'>
							KWh
						</p>
					</div>
				</div>
				<div className='col-10 col-md-3 box4 col-xl-2 calc'>
					<div className='tabhead3'>
						<h2 className='head3'>
							Expected Total bill
						</h2>
						<h1 className='mainval'>
							{Math.round( this.Calculation().total)}
						</h1>
						<p className='units'>
						₹
						</p>
					</div>
				</div>

			</div>
			<div className='row grphrow'>
				<div className='col-12 col-xl-5 graphcol' >
					<Line
					data={{
						labels: ['Billing date', '', 'Today',
								 ' ', 'Expected bill'],
						datasets: [
						  {
							label: 'Expected Usage Cost',
							backgroundColor: 'rgba(0, 168, 255,0.8)',
							borderColor: 'rgba(0,0,0,1)',
							borderWidth: 2,
							data: [0, 6, Math.round( this.Calculation().c_usage), Math.round( this.Calculation().total/2.5), Math.round( this.Calculation().total)],
							borderColor: 'rgba(25, 42, 86,1.0)',
							borderWidth: 3
							
								 
						  }
						]
					  }}
					options={{
						title:{
						display:true,
						text:'Average Rainfall per month',
						fontSize:20
						},
						legend:{
						display:false
						}
					}}
					height={300}
					options={{ maintainAspectRatio: false }}
					
					/>
				</div>



				<div className='col-12 col-xl-5 graphcol graphpi' >
					<Pie
					data={{
						labels: ['Fixed Charges', 'Energy Charges', 'Other Charges',
								 'GST'],
						datasets: [
						  {
							label: 'Expected Usage Cost',
							backgroundColor: [
								"#00a8ff",
								"#e84118",
								"#fbc531",
								"#5f27cd",
								"#f1c40f"
							  ],
							borderColor: 'rgba(0,0,0,1)',
							borderWidth: 2,
							data: [this.Calculation().fixed_charge, (this.Calculation().energy_charge +this.Calculation().fuel_surcharge), this.Calculation().electricity_duty+14.28, 2.16],
							borderColor: 'rgba(25, 42, 86,1.0)',
							borderWidth: 0
							
								 
						  }
						]
					  }}
					options={{
						title:{
						display:true,
						text:'Average Rainfall per month',
						fontSize:20
						},
						legend:{
						display:false
						}
					}}
					height={200}
					options={{ maintainAspectRatio: false }}
					
					/>
				</div>



			</div>
			

			<div className='row tablerow'>
				<h2 className='tableh2'>
					Your Expected Bill
				</h2>
			<table className="table">
					<thead>
						<tr>
						<th scope="col">#</th>
						<th scope="col">Details</th>
						<th scope="col">Amount</th>
						
						</tr>
					</thead>
					<tbody>
						<tr>
						<th scope="row">1</th>
						<td>Fixed Charges</td>
						<td>₹ {this.Calculation().fixed_charge}</td>
						</tr>
						<tr>
						<th scope="row">2</th>
						<td>Energy Charges</td>
						<td>₹ { this.Calculation().energy_charge }</td>
						</tr>
						<tr>
						<th scope="row">3</th>
						<td>Fuel Surcharge</td>
						<td>₹ { this.Calculation().fuel_surcharge }</td>
						</tr>
						<tr>
						<th scope="row">4</th>
						<td>Electricity Duty</td>
						<td>₹ {Math.round( this.Calculation().electricity_duty) }</td>
						</tr>
						<tr>
						<th scope="row">5</th>
						<td>Meter Rent</td>
						<td>₹ 12</td>
						</tr>
						<tr>
						<th scope="row">6</th>
						<td>Flood Cess</td>
						<td>₹ 0.12</td>
						</tr>
						<tr>
						<th scope="row">7</th>
						<td>State GST</td>
						<td>₹ 1.08</td>
						</tr>
						<tr>
						<th scope="row">8</th>
						<td>Central GST</td>
						<td>₹ 1.08</td>
						</tr>
						<tr>
						<th scope="row">9</th>
						<td>Total Bill Amount</td>
						<td>₹ { this.Calculation().total }</td>
						</tr>
					</tbody>
				</table>


			</div>



			



</>

		)
	}
}

export default Bill 
