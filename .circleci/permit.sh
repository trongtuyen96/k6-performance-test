#!/bin/bash
#
# Sets up temporary access to port 443 in security group for IP of machine
# that this script is run on. Used to setup AWS access from CircleCI
# builds when running load tests.
# 
###########################################################################

# Exit on error
set -ex

if [ -z "$AWS_SECURITY_GROUP_ID" ];
then
    printf 'AWS_SECURITY_GROUP_ID must be set.\n' >&2
    exit 1
fi

public_ip_address=$(curl -q http://checkip.amazonaws.com)
echo "This computers public ip address is $public_ip_address"

# Grant access to public IP of this machine
/root/bin/aws ec2 authorize-security-group-ingress --group-id $AWS_SECURITY_GROUP_ID --ip-permissions "[{\"IpProtocol\": \"tcp\", \"FromPort\": 443, \"ToPort\": 443, \"IpRanges\": [{\"CidrIp\": \"${public_ip_address}/32\"}]}]"
