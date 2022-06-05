import React from 'react';

import "../../assets/css/scoreCard.css"


const scoreCard = (props) => {

    const data = props.location.state.data
    const high_findings = data.high
    const medium_findings = data.warning
    const hotspot_findings = data.hotspot[0]
    console.log(data)
    return ( 
    <body>
        <div class="content-wrapper" >
        <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
            <div class="col-sm-12">
                <div class="sameline">
                    <h1> Security Scorecard - {data.app_name} <i class="fab fa-android"></i></h1>
                    {/* <label class="text-right">  <a class="btn btn-outline-primary"><i class="fas fa-file-pdf"></i></a> </label> */}
                </div>
            </div>
            </div>
        </div>
        </section>
        </div>

        <br/>
        
        <section class="content">
            <div class="row">
                <div className="col-lg-3">
                    <div className="card">
                        <div className="card-header ui-sortable-handle">
                            <h3 className="card-title">
                                <i className="fas fa-star-half-alt"></i> Security Score
                            </h3>
                        </div>
                        <div className="card-body">
                            <div align="center" className="tab-content p-0">
                                <p>
                                    <div style={{display:'inline', width:'200px', height:'200px'}}>
                                        <canvas width="200" height="200"/>
                                        <input type="text" value={data.security_score} class="dial" data-fgcolor= "#ff0018" className='card-body-col1' readonly="readOnly" />
                                    </div>                            
                                </p>
                                <h5>Security Score {data.security_score}/100</h5><p></p>
                            </div>
                        </div>
                    </div>                    
                </div>

                

                <div class="col-lg-3">
                
                    <div class="card">
                        <div class="card-header ui-sortable-handle">
                            <h3 class="card-title">
                                <i class="fas fa-user-secret"></i>
                                Privacy Risk
                            </h3>
                        </div>
                        <div class="card-body">
                            <div align="center" class="tab-content p-0">
                                <p>
                                    <span class="privacy" style={{background:"#303238"}}> {data.trackers} </span>
                                
                                </p><h5> User/Device Trackers </h5><p></p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </section>
        <br/>
            <div class="row">
                <div class="col-12" id="accordion">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header ui-sortable-handle">
                                <h3 class="card-title">
                                    <i class="fas fa-file-alt"></i> Findings
                                </h3>
                            </div>
                            <div class="card-body">                            
                                <div class="row">                                    
                                    <div class="col-md-3 col-sm-6 col-12">
                                        <div class="info-box">
                                            <span class="info-box-icon bg-danger"><i class="fas fa-bug"></i></span>
                            
                                        <div class="info-box-content">
                                            <span class="info-box-text">High</span>
                                            <span class="info-box-number">{data.high.length}</span>
                                        </div>                                        
                                      </div>                                       
                                    </div>
                                    <div class="col-md-3 col-sm-6 col-12">
                                        <div class="info-box">
                                        <span class="info-box-icon bg-warning"><i class="fas fa-exclamation-triangle"></i></span>
                            
                                        <div class="info-box-content">
                                            <span class="info-box-text">Medium</span>
                                            <span class="info-box-number">{data.warning.length}</span>
                                        </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-2 col-sm-6 col-12">
                                    <div class="info-box">
                                        <span class="info-box-icon bg-info"><i class="fas fa-info"></i></span>
                        
                                        <div class="info-box-content">
                                        <span class="info-box-text">Info</span>
                                        <span class="info-box-number">{data.info.length}</span>
                                        </div>
                                    </div>
                                    </div>
                                    <div class="col-md-2 col-sm-6 col-12">
                                        <div class="info-box">
                                        <span class="info-box-icon bg-success"><i class="fas fa-check"></i></span>
                            
                                        <div class="info-box-content">
                                            <span class="info-box-text">Secure</span>
                                            <span class="info-box-number">{data.secure.length}</span>
                                        </div>
                                        </div>
                                    </div>
                                    

                                <div class="col-md-2 col-sm-6 col-12">
                                    <div class="info-box">
                                    <span class="info-box-icon bg-secondary"><i class="fa-brands fa-searchengin"></i></span>
                        
                                    <div class="info-box-content">
                                        <span class="info-box-text"> Hotspot </span>
                                        <span class="info-box-number">{data.hotspot.length}</span>
                                    </div>
                                    </div>
                                </div>
                                
                            </div>
                                <br/>

        <div>
            {high_findings.map((value, index) => {
                return (<div class="card card-danger card-outline">
                        <a class="d-block w-100 " data-toggle="collapse" href= "#high-1">
                        <div class="sameline">
                            <div class="card-header">
                                <h4 class="card-title w-100">
                                    <span class="badge bg-danger">high</span> {value.title} 
                                </h4>
                            </div>
                        <label style={{"text-transform": "uppercase"}}> {value.section} </label>
                        </div>
                        </a>
                        <div id= "#high-1" class="collapse show" data-parent="#accordion">
                            <div class="card-body">
                                <pre>{value.description}</pre>
                            </div>
                        </div>
                    </div>)
                    })}
        </div>    


        <div>
            {medium_findings.map((value, index) => {
            return(<div class="card card-warning card-outline">
                    <a class="d-block w-100" data-toggle="collapse" href= '#warning-1'>
                    <div class="sameline">
                        <div class="card-header">
                            <h4 class="card-title w-100">
                                <span class="badge bg-warning"> medium </span> {value.title}
                            </h4>
                        </div>
                        <label style={{"text-transform": "uppercase"}}> {value.section} </label>
                    </div>
                    </a>
                    <div class="collapse show" data-parent="#accordion">
                          
                            <div class="card-body">
                                <pre>{value.description}</pre> 
                            </div>
                        
                    </div>
                </div>)
            })}
        </div>

        <div class="card card-secondary card-outline">
            <a class="d-block w-100" data-toggle="collapse" href="#secondary-1" aria-expanded="true">
                <div class="sameline">
                    <div class="card-header">
                        <h4 class="card-title w-100">
                            <span class="badge bg-secondary"> hotspot </span> {hotspot_findings.title}
                        </h4>
                    </div>
                    <label class="text-right" style={{"text-transform": "uppercase"}}> {hotspot_findings.section} </label>
                </div>
            </a>
            
            <div id="secondary-1" class="collapse show" data-parent="#accordion">
                <div class="card-body">
                <pre>{hotspot_findings.description} </pre>
                </div>
            </div>
        </div>

                    </div>
            </div>  </div>
        </div>
                
                </div> 
                </body>
                )
       
}
export default scoreCard