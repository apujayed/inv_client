import React from 'react'

const Dashboard = () => {
    return (
        <>
       
          <section className="content-header">
  <h1 className="marquee">
    <marquee behavior="scroll" direction="left" scrollamount={5}>
      <p align="center" style={{fontSize: 20, color: 'yellow'}}>  M/S AKHI AND APU TRADERS..PROP-Alhaj Md Mojaffor Hossain..THIS WEB BASED APPLICATION WAS DESIGN AND DEVELOPED BY IT TECH POINT BD TEAM CONTACT- +8801303242844</p>
    </marquee>
  </h1>
</section>

     <section className="content">
  {/* Small boxes (Stat box) */}
  <div className="row">
    <div className="col-lg-12 col-xs-12">
      {/* small box */}
      <div className="small-box bg-aqua">
        <div className="inner maina">
          <h3 style={{color: 'Chartreuse', fontSize: '3vw'}} align="center">M/S AKHI AND APU TRADERS </h3>
          <p align="center">BHAJANPUR TETULIA PANCHAGARH</p>
          <p align="center">01713749704</p>
        </div>
      </div>
    </div>
    {/* ./col */}
    <div className="col-md-3 col-sm-6 col-xs-12">
      <div className="info-box">
        <span className="info-box-icon bg-aqua"><i className="ion ion-bag" /></span>
        <div className="info-box-content">
          <span className="text-bold text-uppercase">Total Sell Amount</span>
          <span className="info-box-number">৳ {/*?php echo $SellT;?*/}</span>
        </div>
        {/* /.info-box-content */}
      </div>
      {/* /.info-box */}
    </div>
    <div className="col-md-3 col-sm-6 col-xs-12">
      <div className="info-box">
        <span className="info-box-icon bg-red"><i className="ion ion-bag" /></span>
        <div className="info-box-content">
          <span className="text-bold text-uppercase">Total Credit Sell</span>
          <span className="info-box-number">৳ {/*?php echo $csellT;?*/}</span>
        </div>
        {/* /.info-box-content */}
      </div>
      {/* /.info-box */}
    </div>
    <div className="col-md-3 col-sm-6 col-xs-12">
      <div className="info-box">
        <span className="info-box-icon bg-green"><i className="fa fa-group " /></span>
        <div className="info-box-content">
          <span className="text-bold text-uppercase">Customer Collection</span>
          <span className="info-box-number">৳ {/*?php echo $custot;?*/}</span>
        </div>
        {/* /.info-box-content */}
      </div>
      {/* /.info-box */}
    </div>
    <div className="col-md-3 col-sm-6 col-xs-12">
      <div className="info-box">
        <span className="info-box-icon bg-red"><i className="fa fa-minus-square-o" /></span>
        <div className="info-box-content">
          <span className="text-bold text-uppercase">Total Expense</span>
          <span className="info-box-number">৳ {/*?php echo $exp;?*/}</span>
        </div>
        {/* /.info-box-content */}
      </div>
      {/* /.info-box */}
    </div>
  </div>
  {/* /.row (main row) */}
</section>  
        </>
    )
}

export default Dashboard
