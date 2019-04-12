# vspec
vSpec is a set of inspec profiles specifically aimed at vsphere and VMware related products. This is the meta repo, it does not actually contain any resources. 

The child repos can be found at the following locations:
- https://github.com/srobroek/vspec-profiles
- https://github.com/srobroek/vspec-resources

# how to run
- Install inspec (https://inspec.io)
- clone the vspec-profiles repo
- create a config file in each of the profiles (samples are provided)
- run `inspec --exec psc --attrs path/to/your/config`

# Notes

The only OS this has been tested and found working on is Linux and the Linux subsystem for windows. It probably also works on OSX. Windows native is out because inspec doesn't support http on windows. If you want to run this on windows, install it as if you were installing it on linux using the linux subsystem. 

# Warning

*DO NOT USE IN PRODUCTION. THIS PRODUCT WILL CAUSE YOUR DATACENTER TO CATCH ON FIRE, EAT YOUR CAT AND STEAL YOUR CAR. IF FLAMING DATACENTERS PERSIST CONSULT A DOCTOR.*