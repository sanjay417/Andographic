import React,{useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {saveAs} from 'file-saver'
// import * from '../'

import "../../assets/css/static-analyzer.css"

const StaticAnalyzer = (props) => {
   
   const data = props.location.state.data
   const hash = data.hash
   const [red, setRed] = useState(null);
   console.log(data)
  //  const [file, setFile] = useState('');

   const downloadPdf = async e => {
    e.preventDefault();
    try {
      console.log("hash", hash)
      await axios.post('/api2/downloadPdf', {
        scan_hash: hash,
        responseType: "blob"      
      }).then(res => {
        console.log(res.data)
        window.location.href("http://localhost:3000/AndrographicML-main/bae9b38fa76781e60179aad49d9c5380_report.pdf")
      })    
  }        

  catch (err) {
    if (err.response.status === 500) {
      console.log('There was a problem with the server');
    } else {
      console.log(err.response.data.msg);
    }
  }
}
   
   const scoreClick = async e => {
    e.preventDefault();
    try {
      await axios.get('/api2/scoreCard', {
        params:{
        scan_hash: hash
        }
      }).then(res => {
        console.log("scorecard:",res.data);
        setRed(<Redirect to={{
          pathname: '/scoreCard',
          state: { data: res.data }
      }}/>)
    })    
  }        

  catch (err) {
    if (err.response.status === 500) {
      console.log('There was a problem with the server');
    } else {
      console.log(err.response.data.msg);
    }
  }
}

   const dynamicClick = async e => {
    e.preventDefault();
    try {
      await axios.get('/api2/dynamicAnalysis', {
        params:{
        scan_hash: hash
        }
      }).then(res => {
        console.log(res.data);
        setRed(<Redirect to={{ 
          pathname: '/dynamicAnalyzer',   
          state: { data: res.data }
        }}/>)
    })
  }                    
    catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  };


  return (
    
    <div class="content-wrapper" style={{'min-height': "390px"}}>
      {red}
      <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                  <div class="row"><br/><br/><br/><br/>
                    <div class="col-3">
                      <button className="btn btn-success" onClick = {dynamicClick}> 
                        <i className="fa fa-play-circle">  Start Dynamic Analysis </i> <br/>                                        
                      </button>
                        &emsp;&emsp;&emsp;
                        <button className="btn btn-outline-primary btn-sm" onClick={scoreClick} >
                          <i className="fas fa-user-shield"> Scorecard </i> 
                        </button>  
                        &emsp;&emsp;&emsp;
                        <button className="btn btn-outline-primary btn-sm" onClick={downloadPdf}>                          
                          <a className="nav-icon fas fa-file-pdf" target="_blank" rel="noreferrer">
                               &nbsp; Download Pdf
                            </a> 
                        </button>               
                        {/* <div>
                          <a href={pdf} target="_blank" rel="noreferrer">
                            Download Pdf
                          </a>
                        </div> */}
                        &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;                              
                    </div>

                    <br/> <br/> <br/> <br/>
                    
                      <div class="col-2" style={{ flex: '0 0 16.666667%', 'max-width': '16.666667%'}}>
                        <p><strong><i class="fas fa-check-double"></i> APP SCORES</strong></p>                        
                        <br/>
                        <p>
                          <span class="badge bg-danger">Security Score</span><strong> {data.appsec.security_score} / 100</strong><br/>
                          <span class="badge bg-warning">Trackers Detection</span><strong> {data.appsec.trackers} / {data.appsec.total_trackers}</strong><br/>
                        </p>
                      </div>  
                      <div class="col-6" style={{ flex: '0 0 50%', 'max-width': '50%'}}>
                        <p><strong><i class="fas fa-box-open"></i> FILE INFORMATION </strong></p>
                        <span class="badge bg-primary">File Name</span> {data.file_name}<br/>
                        <span class="badge bg-primary">Size</span> {data.size}<br/>
                        <span class="badge bg-primary">MD5</span> {data.md5}<br/>
                        <span class="badge bg-primary">SHA1</span> {data.sha1}<br/>
                        <span class="badge bg-primary">SHA256</span> {data.sha256}<br/>  
                      </div>
                      <div class="col-4">
                        <p><strong><i class="fas fa-info"></i> APP INFORMATION </strong></p>
                        <span class="badge bg-primary">App Name</span> {data.app_name} <br/>
                        <span class="badge bg-primary">Package Name</span> {data.package_name} <br/>                
                        <span class="badge bg-primary">Main Activity</span> {data.main_activity} <br/>                  
                        <span class="badge bg-primary">Target SDK</span> {data.target_sdk} &nbsp;
                        <span class="badge bg-primary">Min SDK</span> {data.min_sdk}   &nbsp;              
                        <span class="badge bg-primary">Max SDK</span> {data.max_sdk} <br/>
                        <span class="badge bg-primary">Android Version Name</span> {data.version_name} &nbsp; 
                        <span class="badge bg-primary">Android Version Code</span> {data.version_code} &nbsp; 
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      </section>

      <section class="content">
      <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                  <p>
                    <strong><i class="fa fa-certificate"></i> SIGNER CERTIFICATE</strong>
                </p>
                
                  <pre><code>{data.certificate_analysis.certificate_info}</code></pre>                                                       
              </div>
            </div>
            </div>        
            </div>
        </div>
      </section>

      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <p>
                    <strong><i class="fa fa-list"></i> APPLICATION PERMISSIONS</strong>
                  </p>
                  <div class="table-responsive">
                    <div id="table_permissions_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div class="row">
                        <div class="col-sm-12">
                        <table id="table_permissions" class="table table-bordered table-hover table-striped">
                            <thead>
                                <tr role="row">
                                    <th class="sorting_asc" tabindex="0" aria-controls="table_permissions" rowspan="1" colspan="1" aria-sort="ascending" aria-label="PERMISSION: activate to sort column descending" style= {{width: "307.438px"}}> PERMISSION </th>
                                    <th class="sorting" tabindex="0" aria-controls="table_permissions" rowspan="1" colspan="1" aria-sort="ascending" aria-label="STATUS: activate to sort column ascending" style= {{width: "53.1094px"}}>STATUS</th>
                                    <th class="sorting" tabindex="0" aria-controls="table_permissions" rowspan="1" colspan="1" aria-sort="ascending" aria-label="INFO: activate to sort column ascending" style= {{width: "220.312px"}}>INFO </th>
                                    <th class="sorting" tabindex="0" aria-controls="table_permissions" rowspan="1" colspan="1" aria-sort="ascending" aria-label="DESCRIPTION: activate to sort column ascending" style= {{width: "828.141px"}}>DESCRIPTION</th>
                                </tr>
                            </thead>

                            <tbody> 
                                {Object.keys(data.permissions).map((key) => (
                                    <tr>                                    
                                      <td>{key}</td>
                                      <td> 
                                        {console.log(data.permissions[key])}
                                        {data.permissions[key].status === 'dangerous'? <span class =  "badge bg-danger">dangerous</span> : null}
                                        {data.permissions[key].status === 'normal'? <span class =  "badge bg-info">normal</span> : null}
                                        {data.permissions[key].status === 'SignatureOrSystem'? <span class ="badge bg-warning">SignatureOrSystem</span> : null}
                                        {data.permissions[key].status === 'signature'? <span class =  "badge bg-success">signature</span> : null}
                                        {data.permissions[key].status === 'unknown'? <span class =  "badge bg-secondary">unknown</span> : null}                                     
                                      </td>
                                      <td>{data.permissions[key].info}</td>
                                      <td>{data.permissions[key].description}</td>
                                    </tr>
                                ))}                                                                                  
                            </tbody>
                        </table>
                        </div>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>          
      </section>

      <section class="content">
      <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
            <div class="card">
              <div class="card-body">
                <p>
                <strong><i class="fas fa-search"></i> MANIFEST ANALYSIS</strong>
                </p>
                  <div class="table-responsive">
                    <div id="table_manifest_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                      <div class="row">
                        <div class="col-sm-12">
                          <table id="table_manifest" class="table table-bordered table-hover table-striped dataTable no-footer" role="grid" aria-describedby='tabel_manifest_info'>
                              <thead>
                                <tr role="row">
                                  <th>NO</th>
                                  <th>ISSUE</th>
                                  <th>SEVERITY</th>
                                  <th>DESCRIPTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                              
                            {Object.keys(data.manifest_analysis).map((key, values) => (
                              <tr>
                                <td>{key}</td>                
                                <td dangerouslySetInnerHTML= {{__html:data.manifest_analysis[key].title }}></td>
                                <td>
                                  {data.manifest_analysis[key].stat === 'high'? <span class =  "badge bg-danger">high</span> : null}
                                  {data.manifest_analysis[key].stat === 'normal'? <span class =  "badge bg-info">normal</span> : null}
                                  {data.manifest_analysis[key].stat === 'warning'? <span class ="badge bg-warning">warning</span> : null}                            
                                </td>
                                <td>{data.manifest_analysis[key].desc}</td>
                              </tr>
                            ))}
                            </tbody>
                          </table>
                      </div>
                      </div>
                      </div>
                      </div>
              </div>
            </div>
            </div>
            </div>
        </div>
        </section>

    <section class="content">
    <div class="container-fluid">
      <div class="row">
          <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <p>
               <strong><i class="fa fa-quora"></i> QUARK ANALYSIS</strong>
              </p>
               <div class="table-responsive">
                <div id="table_file_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">                  
                <div class="row">
                  <div class="col-sm-12">
                    <table id="table_file" class="table table-bordered table-hover table-striped dataTable no-footer" role="grid" aria-describedby="table_file_info">
                    <thead>
                      <tr role="row">
                        <th class="sorting_asc" tabindex="0" aria-controls="table_file" rowspan="1" colspan="1" aria-sort="ascending" aria-label="POTENTIAL MALICIOUS BEHAVIOUR: activate to sort column descending" style={{width: "86.8438px"}}>POTENTIAL MALICIOUS BEHAVIOUR</th>
                        <th class="sorting" tabindex="0" aria-controls="table_file" rowspan="1" colspan="1" aria-label="EVIDENCE: activate to sort column ascending" style= {{width: "  1866.67px"}}>EVIDENCE</th></tr>
                    </thead>
                    <tbody>
                      {Object.keys(data.quark).map((key1) => (
                                <tr role="row">
                                  <td class="sorting_1">{data.quark[key1]["crime"]}</td>
                                  <td>
                                    {Object.keys(data.quark[key1]["register"]).map((key2) => (
                                      <p>
                                          {data.quark[key1]["register"][key2].file} 
                                          <span style={{width : "30px", display: "inline-block"}}>&#8594;</span>
                                          {data.quark[key1]["register"][key2].method}                                                                                
                                          <br/>
                                      </p>
                                      
                                    ))}
                                  </td>
                                </tr>                                
                              ))}
                      </tbody>                                      
                      </table></div></div>
                      </div>
                    </div>
                  </div>
                  </div>         
                  </div>
                  </div>
              </div>
          </section>                                        
      </div>              
)};

export default StaticAnalyzer