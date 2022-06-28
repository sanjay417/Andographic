import React from 'react';

import "../../assets/css/dynamic-analyzer.css"

const dynamicAnalyzer = (props) => {

    const data = props.location.state.data
    console.log(data)
    return (
        
        <body class="sidebar-mini layout-fixed layout-navbar-fixed" data-new-gr-c-s-check-loaded="14.1058.0" data-gr-ext-installed="" style= {{height: "auto"}} cz-shortcut-listen="true">
            <div class="wrapper">
            <div class="content-wrapper" >
                <section class="content-header">
                <div class="container-fluid">
                    <div class="row mb-2">
                    <div class="col-sm-12">
                        <div class="sameline">
                            <h1> {data.title} - {data.package} <i class="fab fa-android"></i></h1>
                            {/* <label class="text-right">  <a class="btn btn-outline-primary"><i class="fas fa-file-pdf"></i></a> </label> */}
                        </div>
                    </div>
                    </div>
                </div>
                </section>
                </div>
                <br/>
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-lg-12">
                            <div class="card">
                            <div class="card-body">
                                <p>
                                    <strong><i class="fas fa-lock"></i> TLS/SSL Security Tester</strong>
                                </p>
                                <div class="table-responsive">
                                <div id="DataTables_Table_7_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <table class="table table-bordered table-hover table-striped dataTable no-footer" id="DataTables_Table_7" role="grid" aria-describedby="DataTables_Table_7_info">
                                            <thead>
                                                <tr role="row"><th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_7" rowspan="1" colspan="1" aria-sort="ascending" aria-label="TESTS: activate to sort column descending" style= {{width: "1200.64px"}}>TESTS</th><th class="sorting" tabindex="0" aria-controls="DataTables_Table_7" rowspan="1" colspan="1" aria-label="RESULT: activate to sort column ascending" style={{width: "294.359px"}}>RESULT</th></tr>
                                            </thead>
                                            <tbody>                                                                                                
                                            
                                        <tr role="row" class="odd">
                                                <td class="sorting_1">Cleartext Traffic Test</td>
                                                {data.tls_tests["has_cleartext"] === "false"? <td>❌</td> : <td>✅</td>}

                                            </tr><tr role="row" class="even">
                                                <td class="sorting_1">TLS Misconfiguration Test</td>
                                                {data.tls_tests["tls_misconfigured"] === 'false'? <td>❌</td> : <td>✅</td>}

                                            </tr><tr role="row" class="odd">
                                                <td class="sorting_1">TLS Pinning/Certificate Transparency Bypass Test</td>
                                                {data.tls_tests["pin_or_transparency_bypassed"] === 'false'? <td>❌</td> : <td>✅</td>}
                                                
                                            </tr><tr role="row" class="even">
                                                <td class="sorting_1">TLS Pinning/Certificate Transparency Test</td>
                                                {data.tls_tests["no_tls_pin_or_transparency"] === 'false'? <td>❌</td> : <td>✅</td>}
                                                
                                        </tr></tbody></table></div></div></div>
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
                                    <strong><i class="fas fa-lock"></i> DOMAIN MALWARE CHECK </strong>
                                </p>
                                <div class="table-responsive">
                                <div id="table_malware_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                    <div class="row">
                                        <div class="col-sm-12">
                                        <table id="table_malware" class="table table-bordered table-hover table-striped dataTable no-footer" role="grid" aria-describedby="table_malware_info">
                                        <thead>
                                            <tr role="row">
                                                <th class="sorting_asc" tabindex="0" aria-controls="table_malware" rowspan="1" colspan="1" aria-sort="ascending" aria-label="DOMAIN: activate to sort column descending" style={{width: "593.484px"}}>DOMAIN</th>
                                                <th class="sorting" tabindex="0" aria-controls="table_malware" rowspan="1" colspan="1" aria-label="STATUS: activate to sort column ascending" style={{width: "216.859px"}}>STATUS</th>
                                                <th class="sorting" tabindex="0" aria-controls="table_malware" rowspan="1" colspan="1" aria-label="GEOLOCATION: activate to sort column ascending" style={{width: "641.656px"}}>GEOLOCATION</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>                                                                                                                        
                                            <tr role="row" class="odd"><td class="sorting_1">connectivitycheck.android.com</td>
                                            <td>                                 
                                                <span class="badge bg-success">good</span><br/>                                        
                                            </td>
                                            <td>
                                                
                                                <strong>IP: </strong>142.251.40.46  <br/>
                                                <strong>Country: </strong>United States of America <br/>
                                                <strong>Region: </strong>California <br/>
                                                <strong>City: </strong>Mountain View <br/>
                                                <strong>Latitude: </strong>37.405991 <br/>
                                                <strong>Longitude: </strong>-122.078514 <br/>
                                                <strong>View: <a target="_blank" href="http://maps.google.com/maps?q=37.405991,-122.078514" rel="noreferrer">Google Map</a>                                              
                                            </strong>
                                            </td>
                                            </tr>
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
                                        <strong><i class="fas fa-globe"></i> URLS </strong>
                                    </p>

                                    <div class="list-group">
                        
                                        {Object.keys(data.urls).map((key) => (
                                           
                                           <p>
                                                {data.urls[key]}
                                                <br/>
                                            </p>

                                        )
                                    )}
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
                                                <strong><i class="fas fa-envelope"></i> EMAILS</strong>
                                            </p>
                                                
                                                <div class="list-group">    

                                                {Object.keys(data.emails).map((key) => (
                                           
                                                <p>
                                                    {data.emails[key]}
                                                    <br/>
                                                </p>

                                            )
                                        )}                                              
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
                                    <strong><i class="fa fa-language"></i> ACTIVITY TESTER</strong>
                                    </p><p>
                                    </p><div class="table-responsive">
                                        <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table class="table table-bordered table-hover table-striped dataTable no-footer" id="DataTables_Table_2" role="grid" aria-describedby="DataTables_Table_2_info">
                                                        <thead>
                                                            <tr role="row">
                                                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_2" rowspan="1" colspan="1" aria-sort="ascending" aria-label="SCREENSHOT: activate to sort column descending" style={{width: "451.703px"}}>SCREENSHOT</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_2" rowspan="1" colspan="1" aria-label="ACTIVITY: activate to sort column ascending" style={{width: "1043.3px"}}>ACTIVITY</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(data.activity_tester).map((key) => (

                                                                    <tr role="row" class="odd">
                                                                        <td class="sorting_1"><img alt="com.android.insecurebankv2.LoginActivity" class="img-thumbnail" height="300" width="175"/></td>
                                                                        <td>{data.activity_tester[key]}</td>                                                               
                                                                    </tr>                                                               
                                                                )
                                                            )}                                                      
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
                                    <strong><i class="fas fa-shapes"></i> EXPORTED ACTIVITY TESTER </strong>
                                    </p><p>
                                    </p><div class="table-responsive">
                                        <div id="DataTables_Table_2_wrapper" class="dataTables_wrapper dt-bootstrap4 no-footer">
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <table class="table table-bordered table-hover table-striped dataTable no-footer" id="DataTables_Table_2" role="grid" aria-describedby="DataTables_Table_2_info">
                                                        <thead>
                                                            <tr role="row">
                                                                <th class="sorting_asc" tabindex="0" aria-controls="DataTables_Table_2" rowspan="1" colspan="1" aria-sort="ascending" aria-label="SCREENSHOT: activate to sort column descending" style={{width: "451.703px"}}>SCREENSHOT</th>
                                                                <th class="sorting" tabindex="0" aria-controls="DataTables_Table_2" rowspan="1" colspan="1" aria-label="ACTIVITY: activate to sort column ascending" style={{width: "1043.3px"}}>EXPORTED ACTIVITY</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Object.keys(data.exported_activity_tester).map((key) => (

                                                                    <tr role="row" class="odd">
                                                                        <td class="sorting_1"><img alt="com.android.insecurebankv2.LoginActivity" class="img-thumbnail" height="300" width="175"/></td>
                                                                        <td>{data.exported_activity_tester[key]}</td>                                                               
                                                                    </tr>                                                               
                                                                )
                                                            )}                                                      
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
                </div>
            </body>
    )}

export default dynamicAnalyzer