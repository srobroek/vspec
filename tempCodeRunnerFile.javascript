data = 
{
    "platform": {
        "name": "vsphere",
        "release": "1.1.0"
    },
    "profiles": [
        {
            "name": "vspec-controls-vsphere",
            "version": "0.1.0",
            "sha256": "fee876f0fde60b3726152d1575e8c44613df7a4e462ffc69685ac8d2e4139109",
            "title": "vSpec controls for vsphere",
            "maintainer": "Sjors Robroek",
            "summary": "Profiles to check for various vsphere compliance issues",
            "license": "Apache-2.0",
            "copyright": "Sjors Robroek",
            "copyright_email": "s.robroek@vxsan.com",
            "supports": [
                {
                    "platform-name": "vsphere",
                    "platform-family": "cloud"
                }
            ],
            "attributes": [
                {
                    "name": "config",
                    "options": {
                        "required": true
                    }
                }
            ],
            "depends": [
                {
                    "name": "vspec-resource-vsphere",
                    "git": "https://github.com/srobroek/vspec-resources-vsphere.git",
                    "branch": "master",
                    "status": "loaded"
                }
            ],
            "groups": [
                {
                    "id": "controls/vcsa_appliance.rb",
                    "controls": [
                        "VCSA-001-01",
                        "VCSA-002-01",
                        "VCSA-002-02",
                        "VCSA-002-03",
                        "VCSA-003-01",
                        "VCSA-004-01",
                        "VCSA-006-01",
                        "VCSA-007-01"
                    ],
                    "title": "VCSA appliance checks"
                }
            ],
            "controls": [
                {
                    "id": "VCSA-001-01",
                    "title": "Check VCSA authentication",
                    "desc": "Check for authentication against the VCSA appliance",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check for authentication against the VCSA appliance"
                        }
                    ],
                    "impact": 0.7,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-001-01' do                        # A unique ID for this control  impact 0.7                                # The criticality, if this control fails.  title 'Check VCSA authentication'             # A human-readable title  desc 'Check for authentication against the VCSA appliance'    describe vcsa do    its('api_authentication') { should eq true }  endend",
                    "source_location": {
                        "line": 11,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "vcsa api_authentication should eq true",
                            "run_time": 0.432826,
                            "start_time": "2019-04-18T15:07:27+04:00"
                        }
                    ]
                },
                {
                    "id": "VCSA-002-01",
                    "title": "Check VCSA service status",
                    "desc": "Check for the service status on the vcsa appliance",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check for the service status on the vcsa appliance"
                        }
                    ],
                    "impact": 0.7,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-002-01' do                        # A unique ID for this control  impact 0.7                                # The criticality, if this control fails.  title 'Check VCSA service status'             # A human-readable title  desc 'Check for the service status on the vcsa appliance'  only_if('vcsa did not authenticate succesfully') do    vcsa.api_authentication  end  describe Service status of do    subject {vcsa}    its('ssh') { should eq config['access']['ssh'] }    its('consolecli') { should eq config['access']['consolecli']}    its('dcui') { should eq config['access']['dcui']}    its('shell') {should eq config['access']['shell']}  endend",
                    "source_location": {
                        "line": 21,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "failed",
                            "code_desc": "Service status of ssh should eq false",
                            "run_time": 0.901394,
                            "start_time": "2019-04-18T15:07:28+04:00",
                            "message": "expected: false     got: true(compared using ==)"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Service status of consolecli should eq true",
                            "run_time": 0.559785,
                            "start_time": "2019-04-18T15:07:29+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Service status of dcui should eq true",
                            "run_time": 0.50706,
                            "start_time": "2019-04-18T15:07:29+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Service status of shell should eq false",
                            "run_time": 0.466204,
                            "start_time": "2019-04-18T15:07:30+04:00"
                        }
                    ]
                },
                {
                    "id": "VCSA-002-02",
                    "title": "Check VCSA Health status",
                    "desc": "Check for the health on the vcsa appliance",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check for the health on the vcsa appliance"
                        }
                    ],
                    "impact": 0.5,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-002-02' do                        # A unique ID for this control  impact 0.5                                # The criticality, if this control fails.  title 'Check VCSA Health status'             # A human-readable title  desc 'Check for the health on the vcsa appliance'    only_if('vcsa did not authenticate succesfully') do    vcsa.api_authentication  end  describe Health status of do    subject {vcsa}    its('system') { should eq 'green'}    its('software') { should_not eq 'red'}    its('load') { should eq 'green'}    its('memory') { should eq 'green'}       its('service') {should eq 'green'}    its('database') {should eq 'green'}    its('storage') { should eq 'green'}    its('swap') { should eq 'green' }  endend",
                    "source_location": {
                        "line": 40,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "Health status of system should eq green",
                            "run_time": 0.547799,
                            "start_time": "2019-04-18T15:07:30+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of software should not eq red",
                            "run_time": 0.503076,
                            "start_time": "2019-04-18T15:07:31+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of load should eq green",
                            "run_time": 0.475895,
                            "start_time": "2019-04-18T15:07:31+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of memory should eq green",
                            "run_time": 0.489548,
                            "start_time": "2019-04-18T15:07:32+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of service should eq green",
                            "run_time": 0.436933,
                            "start_time": "2019-04-18T15:07:32+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of database should eq green",
                            "run_time": 0.495132,
                            "start_time": "2019-04-18T15:07:33+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of storage should eq green",
                            "run_time": 0.600595,
                            "start_time": "2019-04-18T15:07:33+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "Health status of swap should eq green",
                            "run_time": 0.508942,
                            "start_time": "2019-04-18T15:07:34+04:00"
                        }
                    ]
                },
                {
                    "id": "VCSA-002-03",
                    "title": "Check SSO settings",
                    "desc": "Check for the SSO settings on the vcsa appliance",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check for the SSO settings on the vcsa appliance"
                        }
                    ],
                    "impact": 0.5,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-002-03' do                        # A unique ID for this control  impact 0.5                                # The criticality, if this control fails.  title 'Check SSO settings'             # A human-readable title  desc 'Check for the SSO settings on the vcsa appliance'    only_if('vcsa did not authenticate succesfully') do    vcsa.api_authentication  end  describe vcsa do    its('psc_address') { should eq config['sso']['psc_address']}    its('sso_domain') { should eq config['sso']['ssodomain']}  endend",
                    "source_location": {
                        "line": 64,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "vcsa psc_address should eq vcsa-01.lab.vxsan.com",
                            "run_time": 0.549959,
                            "start_time": "2019-04-18T15:07:34+04:00"
                        },
                        {
                            "status": "failed",
                            "code_desc": "vcsa sso_domain should eq lab.vxsan.com",
                            "run_time": 0.538325,
                            "start_time": "2019-04-18T15:07:35+04:00",
                            "message": "expected: lab.vxsan.com     got: LAB.VXSAN.COM(compared using ==)"
                        }
                    ]
                },
                {
                    "id": "VCSA-003-01",
                    "title": "Check VCSA Versions",
                    "desc": "Check for the update settings on the vcsa appliance",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check for the update settings on the vcsa appliance"
                        }
                    ],
                    "impact": 0.5,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-003-01' do                        # A unique ID for this control  impact 0.5                                # The criticality, if this control fails.  title 'Check VCSA Versions'             # A human-readable title  desc 'Check for the update settings on the vcsa appliance'    only_if('vcsa did not authenticate succesfully') do    vcsa.api_authentication  end  describe vcsa do    its('version') { should eq config['software']['version']}    its('build') { should eq config['software']['build']}    its('auto_update') { should eq config['software']['autoupdate']}  endend",
                    "source_location": {
                        "line": 81,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "vcsa version should eq 6.7.0.21000",
                            "run_time": 0.470351,
                            "start_time": "2019-04-18T15:07:35+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "vcsa build should eq 11726888",
                            "run_time": 0.454043,
                            "start_time": "2019-04-18T15:07:36+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "vcsa auto_update should eq false",
                            "run_time": 0.686434,
                            "start_time": "2019-04-18T15:07:36+04:00"
                        }
                    ]
                },
                {
                    "id": "VCSA-004-01",
                    "title": "Check web authentication",
                    "desc": "Check for authentication against the vsphere web API",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check for authentication against the vsphere web API"
                        }
                    ],
                    "impact": 0.7,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-004-01' do                        # A unique ID for this control  impact 0.7                                # The criticality, if this control fails.  title 'Check web authentication'             # A human-readable title  desc 'Check for authentication against the vsphere web API'    describe vcsa do    its('web_authentication') { should eq true }  endend",
                    "source_location": {
                        "line": 99,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "vcsa web_authentication should eq true",
                            "run_time": 0.078249,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        }
                    ]
                },
                {
                    "id": "VCSA-006-01",
                    "title": "Check vsphere identity sources",
                    "desc": "Check the identity sources of the vSphere domain",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check the identity sources of the vSphere domain"
                        }
                    ],
                    "impact": 0.5,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-006-01' do                        # A unique ID for this control  impact 0.5                                # The criticality, if this control fails.  title 'Check vsphere identity sources'             # A human-readable title  desc 'Check the identity sources of the vSphere domain'    only_if('vsphere did not authenticate succesfully') do    vcsa.web_authentication  end  describe vcsa do    its('identity_sources') { should eq config['auth']['identity_sources'] }  endend",
                    "source_location": {
                        "line": 109,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "vcsa identity_sources should eq [LAB.VXSAN.COM, VXSAN]",
                            "run_time": 0.054276,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        }
                    ]
                },
                {
                    "id": "VCSA-007-01",
                    "title": "Check the VCSA certificate configuration",
                    "desc": "Check the VCSA certificate configuration",
                    "descriptions": [
                        {
                            "label": "default",
                            "data": "Check the VCSA certificate configuration"
                        }
                    ],
                    "impact": 0.5,
                    "refs": [],
                    "tags": {},
                    "code": "control 'VCSA-007-01' do                        # A unique ID for this control  impact 0.5                                # The criticality, if this control fails.  title 'Check the VCSA certificate configuration'             # A human-readable title  desc 'Check the VCSA certificate configuration'  describe sslcertificate do    it { should exist}    it { should be_trusted }    its('issuer') { should eq config['certificate']['issuer']}    its('subject') { should eq /CN=vcsa-01.lab.vxsan.com/C=US}    its('expiration_days') { should be > 365 }    its('key_size') { should eq 2048}    its('hash_algorithm') { should eq SHA256}    its('key_algorithm') { should eq RSA}  endend",
                    "source_location": {
                        "line": 125,
                        "ref": "./controls/vcsa_appliance.rb"
                    },
                    "results": [
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate should exist",
                            "run_time": 0.002186,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        },
                        {
                            "status": "failed",
                            "code_desc": "sslcertificate should be trusted",
                            "run_time": 0.002639,
                            "start_time": "2019-04-18T15:07:37+04:00",
                            "message": "expected `sslcertificate.trusted?` to return true, got false"
                        },
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate issuer should eq /CN=CA/DC=LAB/DC=VXSAN.COM/C=US/ST=California/O=vcsa-01.lab.vxsan.com/OU=VMware Engineering",
                            "run_time": 0.000172,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate subject should eq /CN=vcsa-01.lab.vxsan.com/C=US",
                            "run_time": 0.000145,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate expiration_days should be > 365",
                            "run_time": 0.000099,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate key_size should eq 2048",
                            "run_time": 0.000149,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate hash_algorithm should eq SHA256",
                            "run_time": 0.000094,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        },
                        {
                            "status": "passed",
                            "code_desc": "sslcertificate key_algorithm should eq RSA",
                            "run_time": 0.000092,
                            "start_time": "2019-04-18T15:07:37+04:00"
                        }
                    ]
                }
            ],
            "status": "loaded"
        }
    ],
    "statistics": {
        "duration": 9.769772
    },
    "version": "3.7.11"
}



function getFailed(profiles) {
    var result = {
        tasks: []
    }

    profiles.forEach(p => {
        p.controls.forEach(c => {
            c.results.forEach(r => {
                if (r.status === 'failed')
                result.tasks.push(r);
            })
        })
    })
    return result

}

function getGood(profiles) {
    var result = {
        tasks: []
    }

    profiles.forEach(p => {
        p.controls.forEach(c => {
            c.results.forEach(r => {
                if (r.status === 'passed')
                result.tasks.push(r);
            })
        })
    })
    return result

}

console.log(getFailed(data.profiles))
console.log(getGood(data.profiles))
  